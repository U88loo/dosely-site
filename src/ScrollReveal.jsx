import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ScrollReveal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
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
          <div className="eyebrow">See it in action</div>
          <h2>
            Watch Dosely <br/>
            <span className="grad">work its magic.</span>
          </h2>
          <p className="scroll-reveal-sub">
            From scanning a label to getting your safety check — see how Dosely turns a moment of doubt into a moment of confidence.
          </p>
        </motion.div>

        <motion.div
          className="scroll-reveal-phone-wrap"
          style={{ rotateX: rotate, scale }}
        >
          <div className="scroll-phone">
            <div className="scroll-phone-notch"></div>
            <div className="scroll-phone-screen">
              {/* 
                When your video is ready, replace this <div> with:
                <video src="/dosely-demo.mp4" autoPlay loop muted playsInline />
              */}
              <div className="scroll-phone-placeholder">
                <img src="/logo-icon.png" alt="Dosely" />
                <div className="scroll-phone-placeholder-text">Demo video coming soon</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}