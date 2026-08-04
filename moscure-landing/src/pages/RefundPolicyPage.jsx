import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function RefundPolicyPage() {
  return (
    <div className="bg-background text-textPrimary min-h-screen pt-36 pb-24">
      <Helmet>
        <title>Refund & Replacement Policy | Moscure</title>
        <meta name="description" content="Moscure 3-day damage replacement policy." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gradientcyan/40 bg-gradientcyan/10 text-gradientcyan font-mono text-xs uppercase tracking-widest mb-6">
            Policies
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-12">
            REFUND & <span className="gradient-text-cyan-pink">REPLACEMENT</span> POLICY
          </h1>

          <div className="prose prose-invert max-w-none prose-p:text-textMuted prose-p:leading-relaxed prose-headings:text-white prose-headings:font-display">
            <div className="bg-surface border border-borderDefault rounded-2xl p-8 md:p-10 mb-8">
              <h2 className="text-2xl mb-4">3-Day Damage Replacement Policy</h2>
              <p>
                At Moscure, we ensure our products are thoroughly inspected before shipping. However, we understand that damage can occasionally happen during transit. 
                We offer a strictly enforced <strong>3-day replacement policy</strong> exclusively for products that are delivered in a damaged condition.
              </p>
              
              <h3 className="text-xl mt-8 mb-4">Eligibility for Replacement</h3>
              <ul className="list-disc pl-5 space-y-2 text-textMuted">
                <li>You must request a replacement within <strong>3 days</strong> of the delivery date.</li>
                <li>Replacements are ONLY issued if the product was <strong>already damaged before delivery</strong> (e.g., transit damage).</li>
                <li>We do not offer refunds or returns for "change of mind" or dissatisfaction. The policy applies to damage replacements only.</li>
              </ul>

              <h3 className="text-xl mt-8 mb-4">Validation Process</h3>
              <p>
                To validate your damage claim, we require verifiable proof. You must provide:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-textMuted mb-6">
                <li>A clear <strong>video</strong> showing the unboxing or the exact damage to the product.</li>
                <li>Clear <strong>photographs</strong> highlighting the damaged areas and the original packaging.</li>
              </ul>
              <p>
                Please email these files along with your order number to <a href="mailto:operations@moscure.com" className="text-gradientcyan hover:underline">operations@moscure.com</a>. Our team will review the proof and, if validated, arrange for a replacement unit to be sent to you.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
