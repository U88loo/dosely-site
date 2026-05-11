import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useLang } from "./LanguageContext.jsx";

export default function ScrollReveal() {
  const { t } = useLang();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef, offset: ["start end", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 0.55], [25, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55], isMobile ? [0.75, 1] : [0.85, 1]);
  const translate = useTransform(scrollYProgress, [0, 0.55], [0, -80]);

  return (
    <section className="scroll-reveal-section" ref={containerRef}>
      <div className="scroll-reveal-stage">
        <motion.div className="scroll-reveal-header" style={{ y: translate }}>
          <div className="eyebrow">{t("scroll_eyebrow")}</div>
          <h2>{t("scroll_title_1")} <br/><span className="grad">{t("scroll_title_2")}</span></h2>
          <p className="scroll-reveal-sub">{t("scroll_sub")}</p>
        </motion.div>

        <motion.div className="scroll-reveal-phone-wrap" style={{ rotateX: rotate, scale }}>
          <div className="scroll-phone">
            <div className="scroll-phone-notch"></div>
            <div className="scroll-phone-screen">
              <div className="scroll-phone-placeholder">
                <img src="/logo-icon.png" alt="Dosely" />
                <div className="scroll-phone-placeholder-text">{t("scroll_placeholder")}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}