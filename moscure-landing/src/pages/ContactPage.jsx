import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  CheckCircle2,
  User,
  Smartphone,
  MessageSquare,
  ArrowRight,
  Shield,
  Headphones,
  Trophy,
  FileText,
} from "lucide-react";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerWords = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemFade = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Static Data ──────────────────────────────────────────────────────────────

const CONTACT_INFO = [
  {
    id: "email",
    icon: Mail,
    label: "EMAIL US",
    value: "operations@moscure.com",
    sub: "We'll respond within 24 hours",
    color: "#00F5D4",
    href: "mailto:operations@moscure.com",
  },
  {
    id: "phone",
    icon: Phone,
    label: "CALL US",
    value: "+91-8010111177",
    sub: "Mon–Sat, 9 AM – 6 PM IST",
    color: "#FFD60A",
    href: "tel:+918010111177",
  },
  {
    id: "location",
    icon: MapPin,
    label: "VISIT US",
    value: "Gurugram, Haryana",
    sub: "India",
    color: "#FF4D6D",
    href: null,
  },
  {
    id: "hours",
    icon: Clock,
    label: "BUSINESS HOURS",
    value: "Mon–Fri: 9 AM – 6 PM",
    sub: "Sat: 10 AM – 4 PM  ·  Sun: Closed",
    color: "#00F5D4",
    href: null,
  },
];

const SUBJECT_OPTIONS = [
  "Product Enquiry",
  "Order & Delivery",
  "Installation Help",
  "Warranty & Returns",
  "Bulk / B2B Orders",
  "Partnership",
  "Other",
];

const FAQ_DATA = [
  {
    q: "Is there a warranty on the product?",
    a: "Every Moscure device comes with a comprehensive 2-year manufacturer's warranty covering manufacturing defects and performance issues.",
    accent: "#FFD60A",
  },
  {
    q: "How do I install Moscure?",
    a: "Installation takes less than 5 minutes. Simply place it in the desired location, plug it in, and it begins working immediately. No wires, no chemicals, no setup hassle.",
    accent: "#FF4D6D",
  },
  {
    q: "Can I return the product if not satisfied?",
    a: "We offer a 30-day money-back guarantee, no questions asked. Simply contact us and we'll arrange a hassle-free pickup.",
    accent: "#00F5D4",
  },
  {
    q: "Is Moscure safe for children and pets?",
    a: "100%. Moscure uses only MLID and Phototaxis light to attract insects — zero chemicals, zero smoke, zero toxins. Specifically designed for homes with babies, toddlers, and pets.",
    accent: "#FFD60A",
  },
  {
    q: "Can I use Moscure outdoors?",
    a: "Yes. The Moscure IPO model is IP-rated for outdoor use and covers up to 3500 sq ft, making it perfect for gardens, terraces, and open spaces.",
    accent: "#FF4D6D",
  },
  {
    q: "Does Moscure kill mosquitoes or just repel them?",
    a: "Moscure primarily repels mosquitoes, but some variants may also help reduce mosquito presence over time through continuous MLID and Phototaxis trapping.",
    accent: "#00F5D4",
  },
  {
    q: "Does it work against all types of mosquitoes?",
    a: "Yes, Moscure is designed to be effective against common mosquito species, including those that cause dengue and malaria.",
    accent: "#FFD60A",
  },
  {
    q: "What makes Moscure different from other repellents?",
    a: "Moscure focuses on a balance of safety, effectiveness, and user comfort. With zero chemicals, 24/7 passive protection, and up to 3500 sq ft coverage, it is designed for everyday use — safe for kids, pets, and the whole family.",
    accent: "#FF4D6D",
  },
];

const HERO_STATS = [
  { value: "< 24h", label: "Response Time", color: "#00F5D4" },
  { value: "6 Days", label: "Support Available", color: "#FFD60A" },
  { value: "2 Yrs", label: "Product Warranty", color: "#FF4D6D" },
];

const TRUST_ITEMS = [
  { icon: Shield, label: "Chemical-Free Product", color: "#00F5D4" },
  { icon: Headphones, label: "Dedicated Customer Support", color: "#FFD60A" },
  { icon: Trophy, label: "30-Day Money-Back Guarantee", color: "#FF4D6D" },
];

// ─── FormField ────────────────────────────────────────────────────────────────

function FormField({ icon: Icon, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-white/70">
        {Icon && <Icon size={11} className="opacity-80" />}
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="font-body text-xs text-gradientpink"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── FaqItem ──────────────────────────────────────────────────────────────────

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={itemFade}
      custom={index * 0.06}
      className="border border-borderDefault rounded-2xl overflow-hidden bg-surface"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group hover:bg-surfaceHover transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0 mt-0.5"
            style={{
              backgroundColor: item.accent,
              boxShadow: `0 0 6px ${item.accent}80`,
            }}
          />
          <span className="font-body text-[15px] text-textPrimary font-medium group-hover:text-white transition-colors">
            {item.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 ml-4"
        >
          <ChevronDown size={16} className="text-textMuted" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pb-5">
              <div
                className="border-l-2 pl-4 ml-4"
                style={{ borderColor: item.accent }}
              >
                <p className="font-body text-sm text-textMuted leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── BottomCtaSection ─────────────────────────────────────────────────────────

function BottomCtaSection({ onNavigate }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact-cta"
      className="py-24 relative overflow-hidden noise-overlay"
    >
      {/* Background glow blend */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,245,212,0.05) 0%, rgba(255,77,109,0.03) 50%, transparent 80%)",
        }}
      />
      {/* Large decorative question mark */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 font-display select-none pointer-events-none leading-none"
        style={{ fontSize: "18rem", color: "rgba(255,255,255,0.018)" }}
      >
        ?
      </div>

      <div
        ref={ref}
        className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gradientpink/40 bg-gradientpink/10 text-gradientpink font-mono text-xs uppercase tracking-widest">
            🤝 Still Need Help?
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.div
            variants={staggerWords}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {["CAN'T FIND", "YOUR ANSWER?"].map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.span
                  variants={wordVariants}
                  className={`block font-display leading-none tracking-tight text-5xl md:text-7xl ${
                    i === 1 ? "gradient-text-cyan-pink" : "text-textPrimary"
                  }`}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.4}
          className="mt-6 font-body text-base text-textMuted max-w-lg mx-auto leading-relaxed"
        >
          Our team personally handles every inquiry.{" "}
          <br className="hidden md:block" />
          No bots. No scripts. Just people who care about your family&apos;s
          safety.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <motion.button
            variants={itemFade}
            type="button"
            onClick={() =>
              document
                .getElementById("contact-main")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-mono text-sm uppercase tracking-widest text-background font-bold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #00F5D4, #FFD60A)",
              boxShadow: "0 0 30px rgba(0,245,212,0.3)",
            }}
          >
            <Mail size={16} />
            Send Us a Message
          </motion.button>

          <motion.button
            variants={itemFade}
            type="button"
            onClick={() => onNavigate?.("product")}
            whileHover={{
              scale: 1.04,
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-mono text-sm uppercase tracking-widest text-white border border-white/20 bg-transparent transition-all duration-300"
          >
            View Products
            <ArrowRight size={14} />
          </motion.button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.6}
          className="mt-8"
        >
          <a
            href="tel:+918010111177"
            className="inline-flex items-center gap-2 font-mono text-xs text-textMuted hover:text-gradientcyan transition-colors duration-200 uppercase tracking-wider"
          >
            <Phone size={12} />
            Or call +91-8010111177 · Mon–Sat, 9 AM – 6 PM IST
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── ContactPage ──────────────────────────────────────────────────────────────

export default function ContactPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });

  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-80px" });

  const infoRef = useRef(null);
  const infoInView = useInView(infoRef, { once: true, margin: "-80px" });

  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });

  // ── Scroll-sync: right column rises gently to meet the left ─────────────
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end end"],
  });
  const rawInfoY = useTransform(scrollYProgress, [0, 0.35], [48, 0]);
  const infoY = useSpring(rawInfoY, {
    stiffness: 60,
    damping: 18,
    restDelta: 0.001,
  });

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      e.email = "Valid email address required";
    }
    if (!formData.subject) e.subject = "Please select a subject";
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      e.message = "Message must be at least 10 characters";
    }
    return e;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSending(true);

    try {
      const formattedMessage = `🚀 NEW MOSCURE INQUIRY

━━━━━━━━━━━━━━━━━━━━━━
📅 Received: ${new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "medium",
  timeStyle: "short"
})}
━━━━━━━━━━━━━━━━━━━━━━

👤 CUSTOMER DETAILS

• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone || "Not provided"}
• City: ${formData.city || "Not provided"}

━━━━━━━━━━━━━━━━━━━━━━
📌 INQUIRY DETAILS

• Subject: ${formData.subject}
━━━━━━━━━━━━━━━━━━━━━━
📝 MESSAGE

${formData.message}

━━━━━━━━━━━━━━━━━━━━━━
⚡ ACTION REQUIRED
Follow up with this lead as soon as possible.

━━━━━━━━━━━━━━━━━━━━━━
Source: Moscure Website Contact Form
      `;
      const res = await fetch("https://formspree.io/f/mqegrprd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message: formattedMessage,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setErrors({});
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-[#1C1C1C] border rounded-xl px-4 py-3.5 font-body text-sm text-white placeholder:text-white/30 focus:outline-none transition-all duration-200 contact-input ${
      errors[field]
        ? "border-gradientpink/70 focus:border-gradientpink focus:ring-2 focus:ring-gradientpink/15"
        : "border-white/10 hover:border-white/20 focus:border-gradientcyan/70 focus:ring-2 focus:ring-gradientcyan/10"
    }`;

  return (
    <div className="bg-background text-textPrimary min-h-screen">
      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — HERO                                                    */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-hero"
        ref={heroRef}
        className="relative pt-36 pb-24 overflow-hidden"
      >
        {/* Top radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,245,212,0.07) 0%, transparent 70%)",
          }}
        />
        {/* Diagonal hatching */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.012) 30px, rgba(255,255,255,0.012) 31px)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gradientcyan/40 bg-gradientcyan/10 text-gradientcyan font-mono text-xs uppercase tracking-widest">
              <Mail size={12} />
              Contact Us
            </span>
          </motion.div>

          {/* Heading */}
          <div className="text-center overflow-hidden">
            <motion.div
              variants={staggerWords}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            >
              {["LET'S", "CONNECT"].map((word, i) => (
                <div key={word} className="overflow-hidden leading-none">
                  <motion.span
                    variants={wordVariants}
                    className={`block font-display text-8xl md:text-[10rem] lg:text-[11rem] tracking-tight ${
                      i === 1 ? "gradient-text-yellow-cyan" : "text-textPrimary"
                    }`}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Sub-copy */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            custom={0.4}
            className="mt-6 text-center font-body text-base md:text-lg text-textMuted max-w-xl mx-auto leading-relaxed"
          >
            Have a question about Moscure? Need help choosing the right product?
            Our team responds within 24 hours — every time.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            {HERO_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={itemFade}
                custom={i * 0.1}
                whileHover={{ scale: 1.04, y: -3 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center px-8 py-5 rounded-2xl bg-surface/60 border border-borderDefault min-w-[140px]"
              >
                <span
                  className="font-display text-4xl leading-none"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
                <span className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-textMuted text-center">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — FORM + INFO                                             */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section id="contact-main" ref={sectionRef} className="py-20 relative">
        {/* Ambient side glows */}
        <div
          className="absolute left-0 top-1/3 w-80 h-80 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,245,212,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-0 bottom-1/3 w-80 h-80 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,77,109,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-14 items-start">
            {/* ── FORM — sticky so it stays pinned while right column scrolls ── */}
            <motion.div
              ref={formRef}
              variants={fadeUp}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              custom={0}
              className="lg:sticky lg:top-28"
            >
              <div className="animated-border">
                <div className="bg-[#141414] rounded-2xl p-8 md:p-10">
                  {/* Form header */}
                  <div className="mb-8">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gradientcyan">
                      📋 Send a Message
                    </span>
                    <h2 className="mt-2 font-display text-4xl md:text-5xl text-white leading-none">
                      WRITE TO{" "}
                      <span className="gradient-text-cyan-pink">US</span>
                    </h2>
                    <p className="mt-2 font-body text-sm text-textMuted">
                      Fill in your details and we&apos;ll get back to you within
                      24 hours.
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    {submitted ? (
                      /* ── SUCCESS STATE ─────────────────────────────────── */
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center text-center py-14 gap-4"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 180,
                            damping: 14,
                            delay: 0.1,
                          }}
                          className="w-20 h-20 rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(0,245,212,0.12)",
                            border: "2px solid rgba(0,245,212,0.4)",
                            boxShadow: "0 0 40px rgba(0,245,212,0.2)",
                          }}
                        >
                          <CheckCircle2
                            size={36}
                            className="text-gradientcyan"
                          />
                        </motion.div>

                        <h3 className="font-display text-3xl text-white mt-2">
                          MESSAGE SENT!
                        </h3>
                        <p className="font-body text-sm text-textMuted max-w-sm leading-relaxed">
                          Thank you for reaching out. Our team will be in touch
                          within 24 hours.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false);
                            setFormData({
                              name: "",
                              email: "",
                              phone: "",
                              city: "",
                              subject: "",
                              message: "",
                            });
                          }}
                          className="mt-4 font-mono text-xs uppercase tracking-widest text-textMuted hover:text-white border border-borderDefault hover:border-white/30 rounded-full px-6 py-2.5 transition-colors duration-200"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      /* ── FORM FIELDS ──────────────────────────────────── */
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        noValidate
                        className="flex flex-col gap-5"
                      >
                        {/* Row 1: Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            icon={User}
                            label="Full Name *"
                            error={errors.name}
                          >
                            <input
                              type="text"
                              placeholder="Your full name"
                              value={formData.name}
                              onChange={(e) =>
                                handleChange("name", e.target.value)
                              }
                              className={inputClass("name")}
                            />
                          </FormField>

                          <FormField
                            icon={Mail}
                            label="Email Address *"
                            error={errors.email}
                          >
                            <input
                              type="email"
                              placeholder="you@example.com"
                              value={formData.email}
                              onChange={(e) =>
                                handleChange("email", e.target.value)
                              }
                              className={inputClass("email")}
                            />
                          </FormField>
                        </div>

                        {/* Row 2: Phone + City */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            icon={Smartphone}
                            label="Phone Number"
                            error={errors.phone}
                          >
                            <input
                              type="tel"
                              placeholder="+91 XXXXX XXXXX"
                              value={formData.phone}
                              onChange={(e) =>
                                handleChange("phone", e.target.value)
                              }
                              className={inputClass("phone")}
                            />
                          </FormField>

                          <FormField
                            icon={MapPin}
                            label="City"
                            error={errors.city}
                          >
                            <input
                              type="text"
                              placeholder="Your city"
                              value={formData.city}
                              onChange={(e) =>
                                handleChange("city", e.target.value)
                              }
                              className={inputClass("city")}
                            />
                          </FormField>
                        </div>

                        {/* Subject */}
                        <FormField
                          icon={FileText}
                          label="Subject *"
                          error={errors.subject}
                        >
                          <div className="relative">
                            <select
                              value={formData.subject}
                              onChange={(e) =>
                                handleChange("subject", e.target.value)
                              }
                              className={`${inputClass("subject")} appearance-none pr-10 contact-select`}
                            >
                              <option value="" disabled>
                                Select a subject...
                              </option>
                              {SUBJECT_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              size={16}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none"
                            />
                          </div>
                        </FormField>

                        {/* Message */}
                        <FormField
                          icon={MessageSquare}
                          label="Message *"
                          error={errors.message}
                        >
                          <textarea
                            rows={5}
                            placeholder="Tell us how we can help you..."
                            value={formData.message}
                            onChange={(e) =>
                              handleChange("message", e.target.value)
                            }
                            className={`${inputClass("message")} resize-none`}
                          />
                          <p className="text-right font-mono text-[10px] text-white/30 -mt-1">
                            {formData.message.length} chars
                          </p>
                        </FormField>

                        {/* Submit button */}
                        <motion.button
                          type="submit"
                          disabled={sending}
                          whileHover={!sending ? { scale: 1.02 } : {}}
                          whileTap={!sending ? { scale: 0.98 } : {}}
                          className="mt-2 w-full flex items-center justify-center gap-3 py-4 rounded-full font-mono text-sm uppercase tracking-widest text-background font-bold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                          style={{
                            background: sending
                              ? "rgba(0,245,212,0.35)"
                              : "linear-gradient(135deg, #00F5D4, #FFD60A)",
                            boxShadow: sending
                              ? "none"
                              : "0 0 30px rgba(0,245,212,0.3)",
                          }}
                        >
                          {sending ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 0.8,
                                  ease: "linear",
                                }}
                                className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full"
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send size={16} />
                              Send Message
                              <ArrowRight size={14} />
                            </>
                          )}
                        </motion.button>

                        <p className="text-center font-mono text-[10px] text-white/25 uppercase tracking-wider">
                          Your details are kept private and never shared.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* ── INFO — scroll-linked, rises to sync with form bottom ───── */}
            <motion.div
              ref={infoRef}
              style={{ y: infoY }}
              className="flex flex-col gap-5"
            >
              {/* Section heading */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={infoInView ? "visible" : "hidden"}
                custom={0}
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-gradientcyan">
                  📍 Our Details
                </span>
                <h2 className="mt-2 font-display text-4xl md:text-5xl text-white leading-none">
                  FIND US{" "}
                  <span className="gradient-text-pink-yellow">HERE</span>
                </h2>
                <p className="mt-2 font-body text-sm text-textMuted">
                  Multiple ways to reach us — pick what works best for you.
                </p>
              </motion.div>

              {/* Contact info cards — always single column */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={infoInView ? "visible" : "hidden"}
                className="flex flex-col gap-3"
              >
                {CONTACT_INFO.map((item, i) => {
                  const Icon = item.icon;
                  const inner = (
                    <motion.div
                      key={item.id}
                      variants={itemFade}
                      custom={i * 0.08}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="bg-surface border border-borderDefault rounded-2xl p-4 flex items-center gap-4 group hover:border-white/15 transition-colors duration-200"
                      style={{ cursor: item.href ? "pointer" : "default" }}
                    >
                      {/* Icon badge */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                        style={{
                          background: `${item.color}12`,
                          border: `1.5px solid ${item.color}35`,
                          boxShadow: `0 0 14px ${item.color}18`,
                        }}
                      >
                        <Icon size={18} style={{ color: item.color }} />
                      </div>

                      {/* Text — min-w-0 prevents flex overflow */}
                      <div className="min-w-0 flex-1">
                        <p
                          className="font-mono text-[9px] uppercase tracking-widest mb-0.5"
                          style={{ color: item.color, opacity: 0.75 }}
                        >
                          {item.label}
                        </p>
                        <p className="font-body text-[13px] font-semibold text-white leading-tight break-words">
                          {item.value}
                        </p>
                        <p className="font-body text-[11px] text-textMuted mt-0.5 leading-snug">
                          {item.sub}
                        </p>
                      </div>

                      {/* Arrow on hover for clickable items */}
                      {item.href && (
                        <ArrowRight
                          size={14}
                          className="shrink-0 text-textMuted opacity-0 group-hover:opacity-60 translate-x-0 group-hover:translate-x-1 transition-all duration-200"
                        />
                      )}
                    </motion.div>
                  );

                  return item.href ? (
                    <a key={item.id} href={item.href} className="block">
                      {inner}
                    </a>
                  ) : (
                    <div key={item.id}>{inner}</div>
                  );
                })}
              </motion.div>

              {/* Trust / Why Moscure card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={infoInView ? "visible" : "hidden"}
                custom={0.5}
                className="animated-border"
              >
                <div className="bg-[#141414] rounded-2xl p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 mb-4">
                    Why Choose Moscure
                  </p>
                  <div className="flex flex-col gap-3">
                    {TRUST_ITEMS.map((trust, i) => {
                      const Icon = trust.icon;
                      return (
                        <div
                          key={trust.label}
                          className="flex items-center gap-3 group"
                        >
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                            style={{
                              background: `${trust.color}15`,
                              border: `1.5px solid ${trust.color}35`,
                            }}
                          >
                            <Icon size={15} style={{ color: trust.color }} />
                          </div>
                          <span className="font-body text-[13px] text-white/75 group-hover:text-white transition-colors duration-200 leading-snug">
                            {trust.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — FAQ                                                     */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section id="contact-faq" className="py-20 relative overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,214,10,0.04) 0%, transparent 70%)",
          }}
        />

        <div
          className="max-w-4xl mx-auto px-6 md:px-12 relative z-10"
          ref={faqRef}
        >
          {/* Section heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={faqInView ? "visible" : "hidden"}
            custom={0}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gradientyellow/40 bg-gradientyellow/10 text-gradientyellow font-mono text-xs uppercase tracking-widest mb-6">
              💬 Common Questions
            </span>

            <div className="overflow-hidden">
              <motion.div
                variants={staggerWords}
                initial="hidden"
                animate={faqInView ? "visible" : "hidden"}
              >
                {["FREQUENTLY", "ASKED"].map((word, i) => (
                  <div key={word} className="overflow-hidden">
                    <motion.span
                      variants={wordVariants}
                      className={`block font-display leading-none tracking-tight text-6xl md:text-8xl ${
                        i === 1
                          ? "gradient-text-pink-yellow"
                          : "text-textPrimary"
                      }`}
                    >
                      {word}
                    </motion.span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={faqInView ? "visible" : "hidden"}
              custom={0.3}
              className="mt-4 font-body text-sm text-textMuted max-w-md mx-auto leading-relaxed"
            >
              Everything you need to know about Moscure, delivery, and support.
            </motion.p>
          </motion.div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {FAQ_DATA.map((item, i) => (
              <FaqItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — BOTTOM CTA                                              */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <BottomCtaSection onNavigate={onNavigate} />
    </div>
  );
}
