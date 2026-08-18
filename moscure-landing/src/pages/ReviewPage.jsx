import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function ReviewPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: 'Moscure IPI (Indoor)',
    rating: 0,
    title: '',
    comment: '',
  });

  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (ratingValue) => {
    setFormData((prev) => ({ ...prev, rating: ratingValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert('Please select a star rating.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      setIsSubmitted(true);
      // Reset form (optional)
      setFormData({
        name: '',
        email: '',
        product: 'Moscure IPI (Indoor)',
        rating: 0,
        comment: '',
      });
      setHoveredStar(0);
    } catch (error) {
      console.error(error);
      alert('There was an error submitting your review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-textPrimary min-h-screen pt-36 pb-24 relative overflow-hidden">
      <Helmet>
        <title>Customer Reviews | Moscure</title>
        <meta name="description" content="Share your experience with Moscure products. Read customer reviews and submit your own feedback." />
      </Helmet>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gradientcyan/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-[20%] w-[60%] aspect-square rounded-full bg-gradientcyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-[10%] w-[50%] aspect-square rounded-full bg-gradientpink/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gradientcyan/40 bg-gradientcyan/10 text-gradientcyan font-mono text-xs uppercase tracking-widest mb-6">
              Customer Feedback
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              YOUR <span className="gradient-text-cyan-pink">EXPERIENCE</span> MATTERS
            </h1>
            <p className="text-textMuted text-lg md:text-xl">
              We're constantly striving to improve our products. Share your thoughts on Moscure mosquito traps and help others make an informed decision.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface/50 border border-borderDefault rounded-3xl p-8 md:p-10 backdrop-blur-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-3xl pointer-events-none" />
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradientcyan/20 rounded-full flex items-center justify-center mx-auto mb-6 text-gradientcyan border border-gradientcyan/40">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl text-white font-display mb-4">Thank You!</h3>
                <p className="text-textMuted">
                  Your review has been submitted successfully. We appreciate your feedback!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-6 py-3 bg-surface border border-borderDefault rounded-xl text-white hover:bg-borderDefault transition-colors"
                >
                  Submit Another Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <h2 className="text-2xl text-white font-display mb-8">Write a Review</h2>

                <div className="space-y-2">
                  <label className="text-sm text-textMuted font-medium block">Product *</label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className="w-full bg-[#1C1C1C] border border-borderDefault rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gradientcyan transition-colors contact-select cursor-pointer"
                  >
                    <option value="Moscure IPI (Indoor)">Moscure IPI (Indoor Mosquito Trap)</option>
                    <option value="Moscure IPO (Outdoor)">Moscure IPO (Outdoor Mosquito Trap)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-textMuted font-medium block mb-2">Overall Rating *</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <svg
                          className={`w-8 h-8 transition-colors ${
                            star <= (hoveredStar || formData.rating)
                              ? 'text-[#FFD60A] fill-[#FFD60A]'
                              : 'text-textMuted/40 fill-transparent'
                          }`}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </button>
                    ))}
                    <span className="ml-3 text-sm text-textMuted font-medium">
                      {formData.rating > 0 ? `${formData.rating} out of 5` : 'Select a rating'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-textMuted font-medium block">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C1C1C] border border-borderDefault rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gradientcyan transition-colors contact-input"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-textMuted font-medium block">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C1C1C] border border-borderDefault rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gradientcyan transition-colors contact-input"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-textMuted font-medium block">Your Review</label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full bg-[#1C1C1C] border border-borderDefault rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gradientcyan transition-colors contact-input resize-none"
                    placeholder="Tell us what you liked or what could be improved..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-medium tracking-wide transition-all ${
                    isSubmitting
                      ? 'bg-borderDefault text-textMuted cursor-not-allowed'
                      : formData.rating > 0
                      ? 'bg-gradientcyan text-black border-none hover:opacity-90 submit-glow'
                      : 'bg-[#1C1C1C] text-textMuted border border-borderDefault hover:border-textMuted/50'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Review'
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sample Reviews Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="mb-10">
              <h2 className="text-2xl text-white font-display mb-4">What Our Customers Say</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-[#FFD60A]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <div className="text-textMuted font-medium">
                  <span className="text-white text-xl">4.8</span> out of 5 based on <span className="text-white">1,200+</span> reviews
                </div>
              </div>
            </div>

            {/* Sample Review 1 */}
            <div className="bg-surface border border-borderDefault rounded-2xl p-6 hover:border-gradientcyan/40 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-white font-medium mb-1">Indoors mein kya mast result hai!</h4>
                  <div className="flex text-[#FFD60A] w-4 h-4 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-textMuted font-mono">1 WEEK AGO</span>
              </div>
              <p className="text-textMuted text-sm leading-relaxed mb-4">
                "Moscure IPI ko main apne living room ke liye liya tha, aur result sach mein badiya hai. Ekdum silent chalta hai, blue light nightlight ki tarah achi lagti hai, aur sabse important baat—ab koi machhar nahi katte!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f5d4]/20 to-[#ff4d6d]/20 flex items-center justify-center text-xs text-white font-bold">
                  SR
                </div>
                <div className="text-sm">
                  <div className="text-white/80 font-medium">Sanjay R.</div>
                  <div className="text-textMuted/60 text-xs">Verified Buyer • Moscure IPI</div>
                </div>
              </div>
            </div>

            {/* Sample Review 2 */}
            <div className="bg-surface border border-borderDefault rounded-2xl p-6 hover:border-gradientcyan/40 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-white font-medium mb-1">Patio ki shaam ke liye perfect</h4>
                  <div className="flex text-[#FFD60A] w-4 h-4 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-textMuted font-mono">1 MONTH AGO</span>
              </div>
              <p className="text-textMuted text-sm leading-relaxed mb-4">
                "Outdoor trap (IPO) ekdum badhiya kaam karta hai jaisa bataya gaya tha. Aakhir kaar humne bina machhar ke kaate ek badhiya barbecue host kiya. Iska coverage area kaafi bada aur impressive hai."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffd60a]/20 to-[#00f5d4]/20 flex items-center justify-center text-xs text-white font-bold">
                  MJ
                </div>
                <div className="text-sm">
                  <div className="text-white/80 font-medium">Mohit J.</div>
                  <div className="text-textMuted/60 text-xs">Verified Buyer • Moscure IPO</div>
                </div>
              </div>
            </div>

            {/* Sample Review 3 */}
            <div className="bg-surface border border-borderDefault rounded-2xl p-6 hover:border-gradientcyan/40 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-white font-medium mb-1">Safe aur bina kisi chemical ke</h4>
                  <div className="flex text-[#FFD60A] w-4 h-4 gap-1">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <svg className="fill-transparent stroke-current w-4 h-4" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>
                <span className="text-xs text-textMuted font-mono">3 MONTHS AGO</span>
              </div>
              <p className="text-textMuted text-sm leading-relaxed mb-4">
                "Maine isko mainly isliye liya kyunki main nahi chahti thi ki mere bachche aur coil ka dhuaan saans mein lein. Ye bahut safe hai. Bas ek choti si dikkat hai ki trap ko regular saaf karna padta hai, par iska matlab hai ki ye kaam kar raha hai!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff4d6d]/20 to-[#ffd60a]/20 flex items-center justify-center text-xs text-white font-bold">
                  AK
                </div>
                <div className="text-sm">
                  <div className="text-white/80 font-medium">Anita K.</div>
                  <div className="text-textMuted/60 text-xs">Verified Buyer • Moscure IPI</div>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
