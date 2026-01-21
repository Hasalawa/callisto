import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { ArrowUpRight, Shield, Activity, ChevronDown } from 'lucide-react';

// --- Particle Background ---
export const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    handleResize();

    const particlesArray = [];
    const shootingStars = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
      }
      draw() {
        ctx.fillStyle = 'rgba(220, 38, 38, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class ShootingStar {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height * 0.5;
          this.length = Math.random() * 80 + 10;
          this.speed = Math.random() * 10 + 5;
          this.angle = Math.PI / 4; 
          this.opacity = 0;
          this.active = false;
          this.timer = Math.random() * 200;
        }
        update() {
          if (!this.active) {
            this.timer--;
            if (this.timer <= 0) {
              this.active = true;
              this.x = Math.random() * canvas.width * 0.5; 
              this.y = Math.random() * canvas.height * 0.5;
              this.opacity = 1;
            }
          } else {
            this.x += this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);
            this.opacity -= 0.02;
            if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
              this.active = false;
              this.timer = Math.random() * 300 + 100; 
            }
          }
        }
        draw() {
          if (!this.active) return;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.lineWidth = 2;
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x - this.length * Math.cos(this.angle), this.y - this.length * Math.sin(this.angle));
          ctx.stroke();
        }
      }

    for (let i = 0; i < 70; i++) particlesArray.push(new Particle());
    for (let i = 0; i < 3; i++) shootingStars.push(new ShootingStar());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => { p.update(); p.draw(); });
      shootingStars.forEach(s => { s.update(); s.draw(); });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <motion.div style={{ y }} className="fixed inset-0 z-0 pointer-events-none opacity-40"><canvas ref={canvasRef} className="w-full h-full" /></motion.div>;
};

// --- Reveal On Scroll ---
export const RevealOnScroll = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }} transition={{ duration: 0.6, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
};

// --- Hacker Text ---
export const HackerText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((l, i) => i < iterations ? text[i] : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&"[Math.floor(Math.random() * 26)]).join(""));
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return <span className={className}>{displayText}</span>;
};

// --- Spotlight Card ---
export const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  return (
    <div ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={() => setOpacity(1)} onMouseLeave={() => setOpacity(0)} className={`relative rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300" style={{ opacity, background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(220, 38, 38, 0.4), transparent 40%)` }} />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- Hero Graphic ---
export const HeroGraphic = () => (
  <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] hidden md:flex items-center justify-center pointer-events-none select-none">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute w-full h-full rounded-full border border-red-600/20 border-dashed" />
    <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[80%] h-[80%] rounded-full border-2 border-orange-600/30 border-dotted" />
    <div className="absolute w-32 h-32 bg-gradient-to-br from-red-600 to-orange-600 rounded-full blur-[60px] opacity-40 animate-pulse" />
    <div className="relative z-10 flex flex-col items-center justify-center"><Shield size={100} className="text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" /><Activity size={30} className="text-orange-400 mt-4 animate-pulse" /></div>
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute w-[60%] h-[60%] rounded-full"><div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full blur-[2px]"></div></motion.div>
  </div>
);

// --- Accordion FAQ ---
export const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b border-white/10">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex justify-between items-center text-left hover:text-red-500 transition-colors">
          <span className="text-lg font-bold">{question}</span>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown /></motion.span>
        </button>
        <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} className="overflow-hidden">
          <p className="pb-6 text-gray-400 leading-relaxed">{answer}</p>
        </motion.div>
      </div>
    );
  };