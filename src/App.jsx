import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Shield, Server, Globe, Database, Smartphone, Code, ChevronDown, Cpu, Lock, Zap, Layers, Menu, X, ChevronLeft, ChevronRight, Linkedin, Github, Twitter, Mail } from 'lucide-react';

// --- COMPONENT 1: ENHANCED PARTICLE BACKGROUND ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
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

    for (let i = 0; i < 70; i++) {
      particlesArray.push(new Particle());
    }
    for (let i = 0; i < 3; i++) {
      shootingStars.push(new ShootingStar());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.15 - distance/700})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
      for (let i = 0; i < shootingStars.length; i++) {
        shootingStars[i].update();
        shootingStars[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div style={{ y }} className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
};

// --- COMPONENT 2: CONTINUOUS REVEAL ON SCROLL ---
const RevealOnScroll = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" }); 

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// --- COMPONENT 3: HACKER TEXT EFFECT ---
const HackerText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  
  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(text
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return text[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("")
      );
      
      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 1/3; 
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

// --- COMPONENT 4: SPOTLIGHT CARD ---
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(220, 38, 38, 0.4), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- COMPONENT 5: 3D CAROUSEL ---
const ThreeDCarousel = () => {
  const [active, setActive] = useState(1);
  const cards = [
    { id: 1, title: "FinTech Core", category: "Banking System", desc: "Secure banking portal with 256-bit encryption & AI fraud detection." },
    { id: 2, title: "AeroNav AI", category: "Drone Tech", desc: "Autonomous navigation system for commercial drones using Computer Vision." },
    { id: 3, title: "MediSync", category: "Healthcare", desc: "Hospital management system with AI diagnostics and Cloud Sync." },
    { id: 4, title: "CyberShield", category: "Security", desc: "Enterprise-grade firewall and threat detection dashboard." },
    { id: 5, title: "ShopNext", category: "E-Commerce", desc: "Next-gen headless e-commerce platform with AR product preview." }
  ];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const getCardStyles = (index) => {
    const diff = (index - active + cards.length) % cards.length;
    const center = Math.floor(cards.length / 2);
    let dist = diff;
    if (diff > center) dist = diff - cards.length;
    
    const isActive = dist === 0;
    const xOffset = dist * 150;
    const scale = 1 - Math.abs(dist) * 0.2;
    const opacity = 1 - Math.abs(dist) * 0.3;
    const zIndex = 10 - Math.abs(dist);
    const rotateY = dist * -25;

    return {
      x: xOffset,
      scale,
      opacity: Math.abs(dist) > 2 ? 0 : opacity,
      zIndex,
      rotateY,
      filter: isActive ? 'blur(0px)' : 'blur(4px)',
      pointerEvents: isActive ? 'auto' : 'none'
    };
  };

  return (
    <div className="relative h-[500px] w-full flex items-center justify-center perspective-1000">
       <div className="relative w-full max-w-3xl h-full flex items-center justify-center">
          {cards.map((card, index) => {
             const styles = getCardStyles(index);
             return (
                <motion.div
                   key={card.id}
                   animate={styles}
                   transition={{ type: "spring", stiffness: 150, damping: 20 }}
                   className="absolute w-[350px] md:w-[400px] h-[450px] bg-neutral-900 border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-black/80"
                   style={{ transformStyle: 'preserve-3d' }}
                >
                   <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent pointer-events-none rounded-3xl"></div>
                   <div>
                      <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-red-600/20">
                         <Code size={24} />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">{card.title}</h3>
                      <p className="text-red-500 font-mono text-sm tracking-wider uppercase">{card.category}</p>
                   </div>
                   <div className="space-y-4">
                      <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                      <button className="flex items-center gap-2 text-white font-bold text-sm hover:text-red-500 transition-colors">
                        VIEW PROJECT <ArrowUpRight size={16} />
                      </button>
                   </div>
                </motion.div>
             );
          })}
       </div>

       <div className="absolute bottom-[-40px] flex gap-4 z-20">
          <button onClick={handlePrev} className="p-3 rounded-full bg-neutral-800 border border-white/10 hover:bg-red-600 hover:text-white transition-all">
             <ChevronLeft size={24} />
          </button>
          <button onClick={handleNext} className="p-3 rounded-full bg-neutral-800 border border-white/10 hover:bg-red-600 hover:text-white transition-all">
             <ChevronRight size={24} />
          </button>
       </div>
    </div>
  );
};

// --- COMPONENT 6: INFINITE SCROLL LOGOS ---
function InfiniteLogos() {
    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <motion.div 
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
            >
                {[...Array(2)].map((_, i) => (
                    <ul key={i} className="flex items-center justify-center md:justify-start [&_li]:mx-12 [&_li]:text-gray-500 font-bold text-2xl">
                        <li className="flex items-center gap-2"><Globe/> REACT</li>
                        <li className="flex items-center gap-2"><Server/> AWS CLOUD</li>
                        <li className="flex items-center gap-2"><Database/> MONGODB</li>
                        <li className="flex items-center gap-2"><Smartphone/> FLUTTER</li>
                        <li className="flex items-center gap-2"><Cpu/> AI/ML</li>
                        <li className="flex items-center gap-2"><Lock/> CYBERSEC</li>
                        <li className="flex items-center gap-2"><Zap/> NEXT.JS</li>
                    </ul>
                ))}
            </motion.div>
        </div>
    )
}

// --- COMPONENT 7: FAQ ---
const AccordionItem = ({ question, answer }) => {
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

// --- COMPONENT 8: PROCESS TIMELINE ---
const ProcessStep = ({ number, title, desc }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" }); 

  return (
    <div ref={ref} className="relative pl-12 pb-12 border-l border-white/10 last:border-0">
      <motion.div 
        initial={{ scale: 0 }} 
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]" 
      />
      <motion.div 
        initial={{ opacity: 0, x: 20 }} 
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }} 
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="text-red-500 font-mono text-sm mb-2 block">STEP 0{number}</span>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{desc}</p>
      </motion.div>
    </div>
  );
};

// --- COMPONENT 9: TEAM MEMBER CARD (UPDATED: AUTO SCROLL EFFECT ON MOBILE) ---
const TeamMember = ({ name, role, img }) => {
  const ref = useRef(null);
  // Detects if the card is in view (approx middle of screen) for mobile animation
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

  return (
    <div ref={ref} className="group relative bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden hover:border-red-600/50 transition-colors duration-500">
       <div className="h-[350px] w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"/>
          <img 
            src={img} 
            alt={name} 
            // Logic: On Mobile/Scroll (isInView), force color & scale. On Desktop (md), use group-hover.
            className={`w-full h-full object-cover transition-all duration-700 
              ${isInView ? 'grayscale-0 scale-110' : 'grayscale scale-100'} 
              md:grayscale md:scale-100 md:group-hover:grayscale-0 md:group-hover:scale-110`}
          />
       </div>

       <div className={`absolute bottom-0 left-0 w-full p-6 z-20 transition-transform duration-500
            ${isInView ? 'translate-y-0' : 'translate-y-4'}
            md:translate-y-4 md:group-hover:translate-y-0`}>
          
          <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
          <p className="text-red-500 font-mono text-sm tracking-widest uppercase mb-4">{role}</p>
          
          {/* Socials - Reveal on Scroll (Mobile) or Hover (Desktop) */}
          <div className={`flex gap-4 transition-opacity duration-500 delay-100
               ${isInView ? 'opacity-100' : 'opacity-0'}
               md:opacity-0 md:group-hover:opacity-100`}>
             <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-red-600 hover:text-white transition-colors"><Linkedin size={18}/></a>
             <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-red-600 hover:text-white transition-colors"><Twitter size={18}/></a>
             <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-red-600 hover:text-white transition-colors"><Mail size={18}/></a>
          </div>
       </div>
    </div>
  )
}

// --- MAIN APP ---
const App = () => {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500); // 2.5s Loading
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // --- PRELOADER WITH LOGO ---
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black z-[999] flex items-center justify-center flex-col text-center">
         <div className="relative flex items-center justify-center mb-6">
            <div className="absolute w-28 h-28 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
            <img src="/logo.png" alt="Loading" className="w-16 h-auto animate-pulse" />
         </div>
         <h2 className="text-white font-black text-2xl tracking-widest uppercase">CALLISTO</h2>
         <p className="text-red-500 font-mono text-xs mt-2 tracking-[0.2em] animate-pulse">SYSTEM INITIALIZING...</p>
      </div>
    );
  }

  const navLinks = ['Services', 'Process', 'Projects', 'Team', 'FAQ'];

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-red-600 selection:text-white cursor-none overflow-x-hidden relative">
      
      <ParticleBackground />
      <div className="fixed top-0 left-0 w-6 h-6 bg-red-600 rounded-full pointer-events-none z-[100] hidden md:block mix-blend-screen blur-[2px]" style={{ left: mousePosition.x - 12, top: mousePosition.y - 12, transform: isHovering ? 'scale(3)' : 'scale(1)', transition: 'transform 0.1s' }} />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-orange-600 origin-left z-50" style={{ scaleX }} />
      <motion.div className="fixed top-0 left-0 bottom-0 w-1 bg-red-600 origin-top z-50 shadow-[0_0_15px_rgba(220,38,38,0.8)] hidden md:block" style={{ scaleY }} />

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
        <div className="flex items-center gap-3 cursor-pointer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
           <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
           <div className="hidden md:block">
             <h1 className="font-bold text-lg tracking-tight leading-none text-white">CALLISTO</h1>
             <p className="text-[9px] text-gray-400 tracking-[0.2em]">SOFTWARE SOLUTION (PVT) LTD</p>
           </div>
        </div>

        <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors relative group">
                   {item}
                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
            ))}
            <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all transform hover:scale-105">
                Book a Call
            </button>
        </div>

        <div className="md:hidden text-white cursor-pointer hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
           {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
          >
             {navLinks.map((item) => (
               <a 
                 key={item} 
                 href={`#${item.toLowerCase()}`} 
                 onClick={() => setIsMenuOpen(false)}
                 className="text-3xl font-black text-white hover:text-red-600 transition-colors tracking-tighter"
               >
                 {item}
               </a>
             ))}
             <button className="mt-8 px-8 py-4 bg-red-600 text-white font-bold rounded-full text-xl shadow-lg shadow-red-600/30">
                Start a Project
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-20 relative">
        <div className="max-w-7xl mx-auto w-full z-10">
          <RevealOnScroll>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-xs font-mono text-gray-300">SYSTEM ONLINE</span>
              </div>
              <h1 className="text-5xl md:text-9xl font-black tracking-tighter leading-none text-white mb-6">
                <HackerText text="DIGITAL" className="block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                  <HackerText text="EVOLUTION." className="" />
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mt-6 border-l-4 border-red-600 pl-6">
                 <strong className="text-white">Callisto Software Solution (Pvt) Ltd</strong> transforms businesses with AI-driven software and military-grade cybersecurity.
              </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* --- INFINITE TECH STRIP --- */}
      <div className="py-12 bg-neutral-900 border-y border-white/10 overflow-hidden">
          <InfiniteLogos />
      </div>

      {/* --- SERVICES --- */}
      <section id="services" className="py-32 px-6">
         <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
                <div className="mb-20">
                    <span className="text-red-500 font-mono text-sm tracking-widest uppercase">/// What We Do</span>
                    <h2 className="text-4xl md:text-6xl font-bold mt-4">CORE SERVICES</h2>
                </div>
            </RevealOnScroll>
            
            <div className="grid md:grid-cols-3 gap-6">
               {[
                   { icon: Shield, title: "Cyber Security", desc: "Vulnerability assessment & penetration testing." },
                   { icon: Cpu, title: "AI Solutions", desc: "Machine learning models & intelligent automation." },
                   { icon: Globe, title: "Web Systems", desc: "Enterprise scalable web applications." },
                   { icon: Smartphone, title: "Mobile Apps", desc: "Native iOS & Android development." },
                   { icon: Database, title: "Cloud Infra", desc: "AWS/Azure architecture & DevOps." },
                   { icon: Layers, title: "UI/UX Design", desc: "User-centric interface design systems." }
               ].map((service, idx) => (
                   <RevealOnScroll key={idx} delay={idx * 0.1}>
                       <SpotlightCard className="p-8 h-full min-h-[250px] group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                           <div className="relative z-10 flex flex-col h-full">
                               <service.icon size={40} className="text-red-600 mb-6 group-hover:scale-110 transition-transform duration-300" />
                               <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                               <p className="text-gray-400">{service.desc}</p>
                           </div>
                       </SpotlightCard>
                   </RevealOnScroll>
               ))}
            </div>
         </div>
      </section>

      {/* --- PROCESS TIMELINE --- */}
      <section id="process" className="py-32 px-6 bg-neutral-900/30">
        <div className="max-w-4xl mx-auto">
           <RevealOnScroll>
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">HOW WE WORK</h2>
                  <p className="text-gray-400">Our proven methodology for success.</p>
               </div>
           </RevealOnScroll>
           <div className="pl-4">
              <ProcessStep number="1" title="Discovery & Strategy" desc="We analyze your business goals and technical requirements to create a solid roadmap." />
              <ProcessStep number="2" title="UI/UX Design" desc="Creating wireframes and prototypes to visualize the end product before coding." />
              <ProcessStep number="3" title="Agile Development" desc="Building your software in sprints with regular updates and feedback loops." />
              <ProcessStep number="4" title="Testing & Security" desc="Rigorous QA testing and security audits to ensure a bug-free launch." />
              <ProcessStep number="5" title="Deployment & Support" desc="Launching your product and providing 24/7 maintenance support." />
           </div>
        </div>
      </section>

      {/* --- 3D PROJECTS CAROUSEL --- */}
      <section id="projects" className="py-32 px-6 overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
                <h2 className="text-5xl font-black mb-16 text-center">FEATURED WORK</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
                <ThreeDCarousel />
            </RevealOnScroll>
         </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section id="team" className="py-32 px-6 bg-neutral-900/20 border-t border-white/5">
         <div className="max-w-7xl mx-auto">
             <RevealOnScroll>
                <div className="mb-20 text-center">
                    <span className="text-red-500 font-mono text-sm tracking-widest uppercase">/// The Squad</span>
                    <h2 className="text-4xl md:text-5xl font-black mt-4">MEET THE MINDS</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">The elite engineers and strategists behind Callisto's digital dominance.</p>
                </div>
             </RevealOnScroll>

             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                   { name: "Kehan Hasalawa", role: "Founder / CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" },
                   { name: "Sarah Jenkins", role: "CTO", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
                   { name: "David Ross", role: "Lead Architect", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800" },
                   { name: "Emily Chen", role: "Security Analyst", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800" }
                ].map((member, idx) => (
                   <RevealOnScroll key={idx} delay={idx * 0.1}>
                      <TeamMember {...member} />
                   </RevealOnScroll>
                ))}
             </div>
         </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-32 px-6 bg-neutral-900 border-y border-white/10">
        <div className="max-w-3xl mx-auto">
            <RevealOnScroll>
                <h2 className="text-4xl font-bold mb-12 text-center">FREQUENTLY ASKED</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}><AccordionItem question="How much does a custom software project cost?" answer="Project costs vary depending on complexity. We offer flexible pricing models starting from small business packages to enterprise solutions. Contact us for a free quote." /></RevealOnScroll>
            <RevealOnScroll delay={0.2}><AccordionItem question="Do you provide ongoing support?" answer="Yes, we offer 12 months of free maintenance for every project we build, including security patches and bug fixes." /></RevealOnScroll>
            <RevealOnScroll delay={0.3}><AccordionItem question="How long does development take?" answer="A standard website takes 2-4 weeks, while complex mobile apps or software systems can take 3-6 months depending on requirements." /></RevealOnScroll>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black pt-32 pb-10 relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 mb-20">
             <RevealOnScroll>
                 <div>
                    <img src="/logo.png" alt="Logo" className="h-16 w-auto mb-6 opacity-80" />
                    <h2 className="text-3xl font-bold mb-4">Let's Build the Future.</h2>
                    <p className="text-gray-500 max-w-sm">
                       Callisto Software Solution (Pvt) Ltd.<br/>
                       Innovating through code.
                    </p>
                 </div>
             </RevealOnScroll>
             <RevealOnScroll delay={0.2}>
                 <div className="flex flex-col gap-4 items-start md:items-end">
                    <a href="#" className="text-2xl font-bold hover:text-red-500 transition-colors">hello@callisto.lk</a>
                    <a href="#" className="text-2xl font-bold hover:text-red-500 transition-colors">+94 71 234 5678</a>
                    <p className="text-gray-500">Colombo, Sri Lanka</p>
                 </div>
             </RevealOnScroll>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-600 text-sm">
             <p>© 2024 Callisto Software Solution (Pvt) Ltd. All Rights Reserved.</p>
          </div>
      </footer>
    </div>
  );
};

export default App;