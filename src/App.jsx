import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Pill, ScanLine, Upload, Search, MessageCircle, Calendar,
  ShieldCheck, Clock, Check, ArrowRight, Play, Globe,
  Sparkles, Lock, Bell, Camera, Code2, Database, Cloud,
  Languages, User, Apple, PlaySquare, Bot
} from "lucide-react";
import "./App.css";
import ScrollReveal from "./ScrollReveal.jsx";

/* ---------- Reusable scroll-reveal wrapper ---------- */
function Reveal({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={scrolled ? "nav scrolled" : "nav"}>
      <div className="container nav-inner">
        <a className="logo" href="#">
  <img src="/logo-icon.png" alt="Dosely" className="logo-img" />
  Dosely
</a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pillo">Pillo</a>
          <a href="#stack">Tech</a>
          <a href="#team">Team</a>
        </div>
        <a href="#download" className="nav-cta">Get the app</a>
      </div>
    </nav>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const phoneRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: phoneRef, offset: ["start end", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const phoneRot = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }
  });

  return (
    <header className="hero">
      <div className="container hero-grid">
        <div>
          <motion.div className="badge" {...fade(0)}>
            <span className="badge-dot"><Check size={12} strokeWidth={3} /></span>
            AI-powered medication safety
          </motion.div>
          <motion.h1 className="hero-title display" {...fade(0.1)}>
            Smarter, safer<br/>medication —<br/>
            <span className="grad">one scan at a time.</span>
          </motion.h1>
          <motion.p className="hero-sub" {...fade(0.2)}>
            Dosely scans your medicines, analyzes your health history, and uses AI to prevent harmful interactions and overdose. Schedule doses, get reminders, and chat with Pillo — your personal medication assistant.
          </motion.p>
          <motion.div className="hero-cta" {...fade(0.3)}>
            <a href="#download" className="btn btn-primary">
              Download the app <ArrowRight size={18} />
            </a>
            <a href="#how" className="btn btn-ghost">
              <Play size={18} /> See how it works
            </a>
          </motion.div>
          <motion.div className="hero-stats" {...fade(0.4)}>
            <div><div className="stat-num">5</div><div className="stat-lbl">Languages supported</div></div>
            <div><div className="stat-num">AI</div><div className="stat-lbl">Powered by Gemini</div></div>
            <div><div className="stat-num">24/7</div><div className="stat-lbl">Smart reminders</div></div>
          </motion.div>
        </div>

        <motion.div
          ref={phoneRef}
          className="phone-stage"
          style={{ y: phoneY }}
        >
          <motion.div
            className="float-card fc1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.6 },
              x: { duration: 0.8, delay: 0.6 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="fc-ic green"><Check size={16} strokeWidth={2.5} /></div>
            <div><div className="fc-t">Safe to take</div><div className="fc-s">No interactions found</div></div>
          </motion.div>

          <motion.div
            className="float-card fc2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.8 },
              x: { duration: 0.8, delay: 0.8 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
            }}
          >
            <div className="fc-ic purple"><Clock size={16} /></div>
            <div><div className="fc-t">Reminder set</div><div className="fc-s">Tonight at 9:00 PM</div></div>
          </motion.div>

          <motion.div
            className="phone"
            style={{ rotate: phoneRot }}
            initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            whileHover={{ rotate: 0, y: -8, transition: { duration: 0.5 } }}
          >
            <PhoneScreen />
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}

function PhoneScreen() {
  return (
    <div className="phone-screen">
      <div className="notch"></div>
      <div className="status-bar"><span>16:21</span><span>5G ●●●</span></div>

      <div className="greeting-card">
        <div className="avatar"><User size={20} /></div>
        <div style={{ flex: 1 }}>
          <div className="greet-small">Good afternoon</div>
          <div className="greet-name">lillie</div>
          <div className="greet-q">How can Dosely help you today?</div>
        </div>
      </div>

      <div className="qa-title">Quick Actions</div>
      <div className="qa-grid">
        {[
          { icon: ScanLine, name: "Scan" },
          { icon: Upload, name: "Upload" },
          { icon: Search, name: "Search" },
          { icon: MessageCircle, name: "Chat", purple: true }
        ].map((q, i) => (
          <motion.div
            key={q.name}
            className={q.purple ? "qa-card purple" : "qa-card"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
          >
            <div className="qa-circle"></div>
            <div className="qa-icon"><q.icon size={16} /></div>
            <div>
              <div className="qa-name">{q.name}</div>
              <div className="qa-open">Open →</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="reminder-card">
        <div className="rem-head">
          <div className="rem-left">
            <div className="rem-icon"><Calendar size={15} /></div>
            <div>
              <div className="rem-title">Medicine Reminders</div>
              <div className="rem-date">Friday, 8 May</div>
            </div>
          </div>
          <div className="view-all">View all →</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- FEATURES ---------- */
function Features() {
  const features = [
  { icon: ScanLine, title: "Smart Scan", desc: "Point your camera at any prescription label. Google ML Kit reads the text instantly and Gemini AI checks safety against your profile." },
  { icon: Upload, title: "Upload a Photo", desc: "Got a label saved in your gallery? Upload any image of a medicine — Dosely processes it the same way as a live scan." },
  { icon: Search, title: "Search Any Medicine", desc: "Type a name to instantly look up any medication in our database — get details, warnings, and check it against your profile in seconds." },
  { icon: ShieldCheck, title: "Interaction Shield", desc: "Gemini AI cross-checks every new medication against your existing ones — flagging dangerous combinations before they happen." },
  { icon: Calendar, title: "Schedule & Remind", desc: "Add medicines, set custom schedules, and get timezone-aware push notifications — so you never miss a dose." },
  { icon: MessageCircle, title: "Chat with Pillo", desc: "Ask Pillo about side effects, timing, or missed doses. Get clear, friendly answers personalized to your medications." },
  { icon: Sparkles, title: "Health Profile", desc: "Your conditions, allergies, and history — securely stored in Firebase and used by AI to deliver advice that's truly yours." },
  { icon: Globe, title: "5 Languages", desc: "Available in English, Arabic, French, Spanish, and Urdu — making safe medication accessible to more people worldwide." }
];
  return (
    <section id="features">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow">Features</div>
            <h2>Everything you need for <span className="grad">medication safety</span>.</h2>
            <p className="section-sub">From OCR-powered scanning to AI safety analysis — Dosely brings every part of your medication routine into one beautifully simple app.</p>
          </div>
        </Reveal>
        <div className="features-grid">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <motion.div className="feature" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                <div className="feat-icon"><f.icon size={24} /></div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function How() {
  const steps = [
    { n: "1", title: "Build your profile", desc: "Tell Dosely about your conditions, allergies, and current medicines." },
    { n: "2", title: "Scan, upload, or search", desc: "Use your camera, upload a photo from your gallery, or search any medicine by name — whichever works for you." },
    { n: "3", title: "Get instant AI checks", desc: "Gemini reviews interactions, dosage, and risks — tailored to your health." },
    { n: "4", title: "Schedule & track", desc: "Set reminders, tick off doses, and stay consistent with confidence." }
  ];
  return (
    <section id="how" className="how">
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <div className="eyebrow">How it works</div>
            <h2>Safe medication in <span className="grad">four simple steps</span>.</h2>
          </div>
        </Reveal>
        <div className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <motion.div className="step" whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PILLO ---------- */
function Pillo() {
  const messages = [
    { me: true, text: "Can I take my ibuprofen with the new antibiotic?" },
    { me: false, text: "Yes — based on your profile and current meds, that combination is safe. Take ibuprofen with food to protect your stomach 🌿" },
    { me: true, text: "What if I missed last night's dose?" },
    { me: false, typing: true }
  ];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="pillo" style={{ padding: "60px 0" }}>
      <Reveal>
        <div className="pillo-section">
          <div className="container pillo-grid">
            <div>
              <div className="eyebrow">Meet Pillo</div>
              <h2>Your AI companion for <br/>everyday medication questions.</h2>
              <p>Pillo is the friendly assistant inside Dosely, powered by Google's Gemini AI. Ask about side effects, timing, or interactions — and get clear, personalized answers in seconds.</p>
              <a href="#download" className="btn btn-primary" style={{ marginTop: 30 }}>
                Talk to Pillo <ArrowRight size={18} />
              </a>
            </div>
            <div className="pillo-chat" ref={ref}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={m.me ? "chat-row me" : "chat-row bot"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.5 }}
                >
                  {!m.me && (
                    <div className="pillo-avatar"><Bot size={20} /></div>
                  )}
                  {m.typing ? (
                    <div className="typing"><span></span><span></span><span></span></div>
                  ) : (
                    <div className="chat-bubble">{m.text}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- TECH STACK ---------- */
function Stack() {
  const cards = [
    { icon: Code2, title: "Framework", tags: ["Flutter", "Dart 3.10", "Provider", "Cupertino"] },
    { icon: Sparkles, title: "AI / ML", tags: ["Gemini AI", "Google ML Kit", "OCR"] },
    { icon: Database, title: "Backend", tags: ["Firebase Auth", "Firestore", "Cloud Functions", "App Check", "Node.js 24"] },
    { icon: Camera, title: "Camera & Image", tags: ["camera", "image_picker", "image"] },
    { icon: Bell, title: "Notifications", tags: ["Local Notifications", "Timezone"] },
    { icon: Languages, title: "Localization", tags: ["easy_localization", "intl", "country_picker"] },
    { icon: Cloud, title: "Networking", tags: ["http", "url_launcher", "email_sender"] },
    { icon: Lock, title: "Storage & Security", tags: ["shared_preferences", "permission_handler", "App Check"] }
  ];
  const langs = [
    { flag: "🇬🇧", name: "English" },
    { flag: "🇸🇦", name: "العربية" },
    { flag: "🇫🇷", name: "Français" },
    { flag: "🇪🇸", name: "Español" },
    { flag: "🇵🇰", name: "اردو" }
  ];
  return (
    <section id="stack" className="stack">
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <div className="eyebrow">Built with</div>
            <h2>A modern <span className="grad">tech stack</span>.</h2>
            <p className="section-sub">Dosely is built with industry-standard tools to deliver a fast, secure, cross-platform experience.</p>
          </div>
        </Reveal>
        <div className="stack-grid">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <motion.div className="stack-card" whileHover={{ y: -4 }}>
                <div className="stack-head">
                  <div className="stack-icon"><c.icon size={20} /></div>
                  <div className="stack-title">{c.title}</div>
                </div>
                <div className="stack-tags">
                  {c.tags.map(t => <span key={t} className="stack-tag">{t}</span>)}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div className="lang-row">
            {langs.map(l => (
              <span key={l.name} className="lang-pill">
                <span className="flag">{l.flag}</span> {l.name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- TEAM ---------- */
function Team() {
  const team = [
    { initials: "EA", name: "Eman Al-Asaadi", role: "Senior Project Team" },
    { initials: "NM", name: "Nooralhuda Mansoor", role: "Senior Project Team" },
    { initials: "LH", name: "Laila Haji", role: "Senior Project Team" }
  ];
  return (
    <section id="team">
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <div className="eyebrow">The team</div>
            <h2>Built by three students, <span className="grad">for everyone</span>.</h2>
            <p className="section-sub">Dosely is a senior project crafted with care — combining design, AI, and a passion for safer healthcare.</p>
          </div>
        </Reveal>
        <div className="team-grid">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <motion.div className="member" whileHover={{ y: -6 }}>
                <div className="member-pic">{m.initials}</div>
                <div className="member-name">{m.name}</div>
                <div className="member-role">{m.role}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section id="download" className="cta-final">
      <div className="container">
        <Reveal>
          <h2>Take control of your medication, <span className="grad">starting today.</span></h2>
          <p>Download Dosely and let AI keep your medicines safe — one scan at a time.</p>
          <div className="hero-cta" style={{ justifyContent: "center", marginTop: 36 }}>
            <a href="#" className="btn btn-primary"><Apple size={18} /> App Store</a>
            <a href="#" className="btn btn-ghost"><PlaySquare size={18} /> Google Play</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
  <img src="/logo-icon.png" alt="Dosely" className="logo-img-footer" />
  Dosely
</div>
            <div className="foot-tag">Ensuring medication safety through AI. A senior project building a smarter, safer way to manage your health.</div>
          </div>
          <div>
            <div className="foot-h">Product</div>
            <ul className="foot-list">
              <li><a href="#features">Features</a></li>
              <li><a href="#how">How it works</a></li>
              <li><a href="#pillo">Meet Pillo</a></li>
              <li><a href="#stack">Tech Stack</a></li>
            </ul>
          </div>
          <div>
            <div className="foot-h">Team</div>
            <ul className="foot-list">
              <li><a href="#team">Eman Al-Asaadi</a></li>
              <li><a href="#team">Nooralhuda Mansoor</a></li>
              <li><a href="#team">Laila Haji</a></li>
            </ul>
          </div>
          <div>
            <div className="foot-h">Contact</div>
            <ul className="foot-list">
              <li><a href="mailto:info@doselybh.com">info@doselybh.com</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2026 Dosely · Senior Project</div>
          <div>Made with care · For safer medication</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- APP ---------- */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <ScrollReveal />
      <Features />
      <How />
      <Pillo />
      <Stack />
      <Team />
      <CTA />
      <Footer />
    </>
  );
}