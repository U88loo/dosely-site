import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Pill, ScanLine, Upload, Search, MessageCircle, Calendar,
  ShieldCheck, Clock, Check, ArrowRight, ArrowLeft, Play, Globe,
  Sparkles, Lock, Bell, Camera, Code2, Database, Cloud,
  Languages, User, Smartphone, Download, Bot
} from "lucide-react";
import "./App.css";
import ScrollReveal from "./ScrollReveal.jsx";
import { useLang } from "./LanguageContext.jsx";

function Reveal({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

/* Arrow that flips for RTL */
function DirArrow({ size = 18 }) {
  const { lang } = useLang();
  return lang === "ar" ? <ArrowLeft size={size} /> : <ArrowRight size={size} />;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggle, t } = useLang();
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
          <a href="#features">{t("nav_features")}</a>
          <a href="#how">{t("nav_how")}</a>
          <a href="#pillo">{t("nav_pillo")}</a>
          <a href="#stack">{t("nav_tech")}</a>
          <a href="#team">{t("nav_team")}</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="lang-toggle" onClick={toggle} aria-label="Switch language">
            <Globe size={14} />
            {lang === "en" ? "العربية" : "English"}
          </button>
          <a href="#download" className="nav-cta">{t("nav_cta")}</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const { t } = useLang();
  const phoneRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: phoneRef, offset: ["start end", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const phoneRot = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }
  });

  return (
    <header className="hero">
      <div className="container hero-grid">
        <div>
          <motion.div className="badge" {...fade(0)}>
            <span className="badge-dot"><Check size={12} strokeWidth={3} /></span>
            {t("hero_badge")}
          </motion.div>
          <motion.h1 className="hero-title display" {...fade(0.1)}>
            {t("hero_title_1")}<br/>{t("hero_title_2")}<br/>
            <span className="grad">{t("hero_title_3")}</span>
          </motion.h1>
          <motion.p className="hero-sub" {...fade(0.2)}>{t("hero_sub")}</motion.p>
          <motion.div className="hero-cta" {...fade(0.3)}>
            <a href="#download" className="btn btn-primary">{t("hero_btn_primary")} <DirArrow /></a>
            <a href="#how" className="btn btn-ghost"><Play size={18} /> {t("hero_btn_ghost")}</a>
          </motion.div>
          <motion.div className="hero-stats" {...fade(0.4)}>
            <div><div className="stat-num">2</div><div className="stat-lbl">{t("hero_stat_langs")}</div></div>
            <div><div className="stat-num">AI</div><div className="stat-lbl">{t("hero_stat_ai")}</div></div>
            <div><div className="stat-num">24/7</div><div className="stat-lbl">{t("hero_stat_24")}</div></div>
          </motion.div>
        </div>

        <motion.div ref={phoneRef} className="phone-stage" style={{ y: phoneY }}>
          <motion.div className="float-card fc1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.6 },
              x: { duration: 0.8, delay: 0.6 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}>
            <div className="fc-ic green"><Check size={16} strokeWidth={2.5} /></div>
            <div><div className="fc-t">{t("float_safe_t")}</div><div className="fc-s">{t("float_safe_s")}</div></div>
          </motion.div>

          <motion.div className="float-card fc2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.8 },
              x: { duration: 0.8, delay: 0.8 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
            }}>
            <div className="fc-ic purple"><Clock size={16} /></div>
            <div><div className="fc-t">{t("float_remind_t")}</div><div className="fc-s">{t("float_remind_s")}</div></div>
          </motion.div>

          <motion.div className="phone" style={{ rotate: phoneRot }}
            initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            whileHover={{ rotate: 0, y: -8, transition: { duration: 0.5 } }}>
            <PhoneScreen />
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}

function PhoneScreen() {
  const { t } = useLang();
  return (
    <div className="phone-screen">
      <div className="notch"></div>
      <div className="status-bar"><span>16:21</span><span>5G ●●●</span></div>

      <div className="greeting-card">
        <div className="avatar"><User size={20} /></div>
        <div style={{ flex: 1 }}>
          <div className="greet-small">{t("phone_greeting")}</div>
          <div className="greet-name">lillie</div>
          <div className="greet-q">{t("phone_greet_q")}</div>
        </div>
      </div>

      <div className="qa-title">{t("phone_qa_title")}</div>
      <div className="qa-grid">
        {[
          { icon: ScanLine, name: t("phone_qa_scan") },
          { icon: Upload, name: t("phone_qa_upload") },
          { icon: Search, name: t("phone_qa_search") },
          { icon: MessageCircle, name: t("phone_qa_chat"), purple: true }
        ].map((q, i) => (
          <motion.div key={i} className={q.purple ? "qa-card purple" : "qa-card"}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}>
            <div className="qa-circle"></div>
            <div className="qa-icon"><q.icon size={16} /></div>
            <div><div className="qa-name">{q.name}</div><div className="qa-open">{t("phone_qa_open")}</div></div>
          </motion.div>
        ))}
      </div>

      <div className="reminder-card">
        <div className="rem-head">
          <div className="rem-left">
            <div className="rem-icon"><Calendar size={15} /></div>
            <div>
              <div className="rem-title">{t("phone_reminder_title")}</div>
              <div className="rem-date">{t("phone_reminder_date")}</div>
            </div>
          </div>
          <div className="view-all">{t("phone_view_all")}</div>
        </div>
      </div>
    </div>
  );
}

function Features() {
  const { t } = useLang();
  const features = [
    { icon: ScanLine, title: t("feat_scan_t"), desc: t("feat_scan_d") },
    { icon: Upload, title: t("feat_upload_t"), desc: t("feat_upload_d") },
    { icon: Search, title: t("feat_search_t"), desc: t("feat_search_d") },
    { icon: ShieldCheck, title: t("feat_shield_t"), desc: t("feat_shield_d") },
    { icon: Calendar, title: t("feat_schedule_t"), desc: t("feat_schedule_d") },
    { icon: MessageCircle, title: t("feat_chat_t"), desc: t("feat_chat_d") },
    { icon: Sparkles, title: t("feat_profile_t"), desc: t("feat_profile_d") },
    { icon: Globe, title: t("feat_lang_t"), desc: t("feat_lang_d") }
  ];
  return (
    <section id="features">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow">{t("feat_eyebrow")}</div>
            <h2>{t("feat_title_1")} <span className="grad">{t("feat_title_2")}</span>{t("feat_title_3")}</h2>
            <p className="section-sub">{t("feat_sub")}</p>
          </div>
        </Reveal>
        <div className="features-grid">
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 0.08}>
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

function How() {
  const { t } = useLang();
  const steps = [
    { n: "1", title: t("how_s1_t"), desc: t("how_s1_d") },
    { n: "2", title: t("how_s2_t"), desc: t("how_s2_d") },
    { n: "3", title: t("how_s3_t"), desc: t("how_s3_d") },
    { n: "4", title: t("how_s4_t"), desc: t("how_s4_d") }
  ];
  return (
    <section id="how" className="how">
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <div className="eyebrow">{t("how_eyebrow")}</div>
            <h2>{t("how_title_1")} <span className="grad">{t("how_title_2")}</span>{t("how_title_3")}</h2>
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

function Pillo() {
  const { t } = useLang();
  const messages = [
    { me: true, text: t("pillo_msg_1") },
    { me: false, text: t("pillo_msg_2") },
    { me: true, text: t("pillo_msg_3") },
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
              <div className="eyebrow">{t("pillo_eyebrow")}</div>
              <h2>{t("pillo_title_1")} <br/>{t("pillo_title_2")}</h2>
              <p>{t("pillo_sub")}</p>
              <a href="#download" className="btn btn-primary" style={{ marginTop: 30 }}>
                {t("pillo_btn")} <DirArrow />
              </a>
            </div>
            <div className="pillo-chat" ref={ref}>
              {messages.map((m, i) => (
                <motion.div key={i} className={m.me ? "chat-row me" : "chat-row bot"}
                  initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.5 }}>
                  {!m.me && <div className="pillo-avatar"><Bot size={20} /></div>}
                  {m.typing
                    ? <div className="typing"><span></span><span></span><span></span></div>
                    : <div className="chat-bubble">{m.text}</div>}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Stack() {
  const { t } = useLang();
  const cards = [
    { icon: Code2, title: t("stack_framework"), tags: ["Flutter", "Dart 3.10", "Provider", "Cupertino"] },
    { icon: Sparkles, title: t("stack_ai"), tags: ["Gemini AI", "Google ML Kit", "OCR"] },
    { icon: Database, title: t("stack_backend"), tags: ["Firebase Auth", "Firestore", "Cloud Functions", "App Check", "Node.js 24"] },
    { icon: Camera, title: t("stack_camera"), tags: ["camera", "image_picker", "image"] },
    { icon: Bell, title: t("stack_notif"), tags: ["Local Notifications", "Timezone"] },
    { icon: Languages, title: t("stack_loc"), tags: ["easy_localization", "intl", "country_picker"] },
    { icon: Cloud, title: t("stack_net"), tags: ["http", "url_launcher", "email_sender"] },
    { icon: Lock, title: t("stack_storage"), tags: ["shared_preferences", "permission_handler", "App Check"] }
  ];
  const langs = [
    { flag: "🇬🇧", name: t("lang_en") }, { flag: "🇸🇦", name: t("lang_ar") }
  ];
  return (
    <section id="stack" className="stack">
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <div className="eyebrow">{t("stack_eyebrow")}</div>
            <h2>{t("stack_title_1")} <span className="grad">{t("stack_title_2")}</span>{t("stack_title_3")}</h2>
            <p className="section-sub">{t("stack_sub")}</p>
          </div>
        </Reveal>
        <div className="stack-grid">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.06}>
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
            {langs.map(l => <span key={l.name} className="lang-pill"><span className="flag">{l.flag}</span> {l.name}</span>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Team() {
  const { t } = useLang();
  const team = [
    { initials: "EA", name: "Eman Al-Asaadi" },
    { initials: "NM", name: "Nooralhuda Mansoor" },
    { initials: "LH", name: "Laila Haji" }
  ];
  return (
    <section id="team">
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <div className="eyebrow">{t("team_eyebrow")}</div>
            <h2>{t("team_title_1")} <span className="grad">{t("team_title_2")}</span>{t("team_title_3")}</h2>
            <p className="section-sub">{t("team_sub")}</p>
          </div>
        </Reveal>
        <div className="team-grid">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <motion.div className="member" whileHover={{ y: -6 }}>
                <div className="member-pic">{m.initials}</div>
                <div className="member-name">{m.name}</div>
                <div className="member-role">{t("team_role")}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { t } = useLang();
  return (
    <section id="download" className="cta-final">
      <div className="container">
        <Reveal>
          <h2>{t("cta_title_1")} <span className="grad">{t("cta_title_2")}</span></h2>
          <p>{t("cta_sub")}</p>
          <div className="hero-cta" style={{ justifyContent: "center", marginTop: 36 }}>
            <a href="#" className="btn btn-primary"><Smartphone size={18} /> {t("cta_appstore")}</a>
            <a href="#" className="btn btn-ghost"><Download size={18} /> {t("cta_playstore")}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <img src="/logo-icon.png" alt="Dosely" className="logo-img-footer" />
              Dosely
            </div>
            <div className="foot-tag">{t("foot_tag")}</div>
          </div>
          <div>
            <div className="foot-h">{t("foot_h_product")}</div>
            <ul className="foot-list">
              <li><a href="#features">{t("nav_features")}</a></li>
              <li><a href="#how">{t("nav_how")}</a></li>
              <li><a href="#pillo">{t("nav_pillo")}</a></li>
              <li><a href="#stack">{t("nav_tech")}</a></li>
            </ul>
          </div>
          <div>
            <div className="foot-h">{t("foot_h_team")}</div>
            <ul className="foot-list">
              <li><a href="#team">Eman Al-Asaadi</a></li>
              <li><a href="#team">Nooralhuda Mansoor</a></li>
              <li><a href="#team">Laila Haji</a></li>
            </ul>
          </div>
          <div>
            <div className="foot-h">{t("foot_h_contact")}</div>
            <ul className="foot-list">
              <li><a href="mailto:info@doselybh.com">info@doselybh.com</a></li>
              <li><a href="#">{t("foot_privacy")}</a></li>
              <li><a href="#">{t("foot_terms")}</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>{t("foot_copy")}</div>
          <div>{t("foot_made")}</div>
        </div>
      </div>
    </footer>
  );
}

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