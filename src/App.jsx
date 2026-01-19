import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Shield, Server, Globe, Database, Smartphone, Code, ChevronDown, Cpu, Lock, Zap, Layers, Menu, X, ChevronLeft, ChevronRight, Linkedin, Github, Twitter, Mail, Activity, Send, MapPin, Phone, Check, Star, User, Hash, Terminal } from 'lucide-react';

// --- COMPONENT 1: ENHANCED PARTICLE BACKGROUND ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
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

    let animationFrameId;
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

// --- COMPONENT 4: SPOTLIGHT CARD (KEPT FOR PRICING) ---
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

// --- COMPONENT 5: NEW CYBER SERVICE CARD (NEW ATTRACTIVE DESIGN) ---
const CyberServiceCard = ({ icon: Icon, title, desc, index }) => {
  return (
    <div className="group relative h-full bg-neutral-900 border border-white/10 overflow-hidden hover:border-red-600/50 transition-all duration-500 rounded-none md:rounded-tr-[3rem] md:rounded-bl-[3rem]">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Red Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/0 via-red-900/0 to-red-900/0 group-hover:via-red-900/5 group-hover:to-red-900/10 transition-all duration-500"></div>
      
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/10 group-hover:border-red-600 transition-colors duration-500"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/10 group-hover:border-red-600 transition-colors duration-500"></div>

      <div className="relative p-8 z-10 flex flex-col h-full">
         <div className="flex justify-between items-start mb-8">
            <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-all duration-500 shadow-lg group-hover:shadow-red-600/20">
               <Icon size={28} strokeWidth={1.5} />
            </div>
            <span className="font-mono text-xs text-gray-700 group-hover:text-red-500/50 transition-colors">SYS_0{index + 1}</span>
         </div>
         
         <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
            {title}
         </h3>
         <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 border-l-2 border-white/5 pl-4 group-hover:border-red-600/30 transition-colors">
            {desc}
         </p>
         
         <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">
               <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-500 group-hover:animate-ping"></span>
               Online
            </div>
            <ArrowUpRight size={16} className="text-gray-600 group-hover:text-red-500 transition-colors transform group-hover:rotate-45 duration-300" />
         </div>
      </div>
    </div>
  );
};

// --- COMPONENT 6: 3D CAROUSEL ---
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

// --- COMPONENT 7: INFINITE SCROLL LOGOS ---
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

// --- COMPONENT 8: FAQ ---
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

// --- COMPONENT 9: PROCESS TIMELINE ---
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

// --- COMPONENT 10: TEAM MEMBER CARD ---
const TeamMember = ({ name, role, img }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

  return (
    <div ref={ref} className="group relative bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden hover:border-red-600/50 transition-colors duration-500">
       <div className="h-[350px] w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"/>
          <img 
            src={img} 
            alt={name} 
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

// --- COMPONENT 11: HERO GRAPHIC ---
const HeroGraphic = () => {
  return (
    <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] hidden md:flex items-center justify-center pointer-events-none select-none">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute w-full h-full rounded-full border border-red-600/20 border-dashed"/>
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[80%] h-[80%] rounded-full border-2 border-orange-600/30 border-dotted"/>
      <div className="absolute w-32 h-32 bg-gradient-to-br from-red-600 to-orange-600 rounded-full blur-[60px] opacity-40 animate-pulse" />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <Shield size={100} className="text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
        <Activity size={30} className="text-orange-400 mt-4 animate-pulse" />
      </div>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute w-[60%] h-[60%] rounded-full">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full blur-[2px]"></div>
      </motion.div>
    </div>
  );
};

// --- COMPONENT 12: ANIMATED COUNTER ---
const Counter = ({ from, to, label }) => {
  const nodeRef = useRef();
  const isInView = useInView(nodeRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const node = nodeRef.current;
    const controls = { duration: 2000, easing: "ease-out" };
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / controls.duration, 1);
      node.textContent = Math.floor(progress * (to - from) + from);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [from, to, isInView]);

  return (
    <div className="text-center p-6 bg-neutral-900 border border-white/10 rounded-2xl hover:border-red-600 transition-colors duration-500">
      <div className="text-5xl font-black text-white mb-2 flex justify-center items-baseline">
        <span ref={nodeRef}>{from}</span><span className="text-red-600">+</span>
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-widest font-mono">{label}</div>
    </div>
  );
};

// --- COMPONENT 13: PRICING CARD ---
const PricingCard = ({ title, price, features, recommended = false }) => {
  return (
    <SpotlightCard className={`p-8 flex flex-col h-full ${recommended ? 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.2)]' : ''}`}>
       <div className="relative z-10 flex flex-col h-full">
          {recommended && <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>}
          <h3 className="text-xl font-bold text-gray-400 mb-2">{title}</h3>
          <div className="flex items-baseline gap-1 mb-6">
             <span className="text-4xl font-black text-white">${price}</span>
             <span className="text-gray-500">/project</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
             {features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                   <div className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 flex-shrink-0"><Check size={12}/></div>
                   {feat}
                </li>
             ))}
          </ul>
          <button className={`w-full py-3 rounded-xl font-bold transition-all ${recommended ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
             Choose Plan
          </button>
       </div>
    </SpotlightCard>
  )
}

// --- MAIN APP ---
const App = () => {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500); 
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black z-[999] flex items-center justify-center flex-col text-center">
         <div className="relative flex items-center justify-center mb-6">
            <div className="absolute w-28 h-28 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
            <img src="/logo.png" alt="Loading" className="w-16 h-auto animate-pulse rounded-full" />
         </div>
         <h2 className="text-white font-black text-2xl tracking-widest uppercase">CALLISTO</h2>
         <p className="text-red-500 font-mono text-xs mt-2 tracking-[0.2em] animate-pulse">SYSTEM INITIALIZING...</p>
      </div>
    );
  }

  const navLinks = ['Services', 'Process', 'Projects', 'Pricing', 'Team', 'Contact'];

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-red-600 selection:text-white cursor-none overflow-x-hidden relative">
      
      <ParticleBackground />
      <div className="fixed top-0 left-0 w-6 h-6 bg-red-600 rounded-full pointer-events-none z-[100] hidden md:block mix-blend-screen blur-[2px]" style={{ left: mousePosition.x - 12, top: mousePosition.y - 12, transform: isHovering ? 'scale(3)' : 'scale(1)', transition: 'transform 0.1s' }} />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-orange-600 origin-left z-50" style={{ scaleX }} />
      <motion.div className="fixed top-0 left-0 bottom-0 w-1 bg-red-600 origin-top z-50 shadow-[0_0_15px_rgba(220,38,38,0.8)] hidden md:block" style={{ scaleY }} />

      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#220000_1px,transparent_1px),linear-gradient(to_bottom,#220000_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_70%,transparent_100%)] opacity-20"></div>

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
        <div className="flex items-center gap-3 cursor-pointer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
           <img src="/logo.png" alt="Logo" className="h-10 w-auto rounded-full" />
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
        <div className="absolute top-1/4 right-1/4 text-red-500/30 font-mono text-xs animate-pulse hidden md:block pointer-events-none select-none">/// NETWORK_STATUS: STABLE</div>
        <div className="absolute bottom-1/4 left-1/3 text-red-500/30 font-mono text-xs animate-pulse delay-700 hidden md:block pointer-events-none select-none">[+] ENCRYPTED_CONN: ACTIVE</div>

        <div className="max-w-7xl mx-auto w-full z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <RevealOnScroll>
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-mono text-gray-300">SYSTEM ONLINE</span>
                </div>
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none text-white mb-6">
                  <HackerText text="DIGITAL" className="block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                    <HackerText text="EVOLUTION." className="" />
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mt-8 border-l-4 border-red-600 pl-6">
                  <strong className="text-white">Callisto Software Solution (Pvt) Ltd</strong> transforms businesses with AI-driven software and military-grade cybersecurity.
                </p>
                <button className="mt-10 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all flex items-center gap-2 group">
                  EXPLORE PLATFORM <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.2}>
             <HeroGraphic />
          </RevealOnScroll>
        </div>
      </section>

      {/* --- INFINITE TECH STRIP --- */}
      <div className="py-12 bg-neutral-900 border-y border-white/10 overflow-hidden">
          <InfiniteLogos />
      </div>

      {/* --- STATS SECTION --- */}
      <section className="py-20 px-6 border-b border-white/5">
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <Counter from={0} to={85} label="Projects" />
            <Counter from={0} to={12} label="Countries" />
            <Counter from={0} to={99} label="Satisfaction" />
            <Counter from={0} to={24} label="Support (Hrs)" />
         </div>
      </section>

      {/* --- SERVICES SECTION (UPDATED) --- */}
      <section id="services" className="py-32 px-6">
         <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
                <div className="mb-20">
                    <span className="text-red-500 font-mono text-sm tracking-widest uppercase">/// System Capabilities</span>
                    <h2 className="text-4xl md:text-6xl font-bold mt-4">CORE SERVICES</h2>
                </div>
            </RevealOnScroll>
            <div className="grid md:grid-cols-3 gap-6">
               {[
                   { icon: Shield, title: "Cyber Security", desc: "Military-grade vulnerability assessment, penetration testing, and real-time threat monitoring." },
                   { icon: Cpu, title: "AI Solutions", desc: "Custom machine learning models, intelligent automation bots, and predictive analytics integration." },
                   { icon: Globe, title: "Web Systems", desc: "High-performance, scalable web applications built with React, Next.js and secure cloud architecture." },
                   { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform mobile experiences for iOS & Android with offline capabilities." },
                   { icon: Database, title: "Cloud Infra", desc: "AWS/Azure serverless architecture design, DevOps automation, and database optimization." },
                   { icon: Terminal, title: "Custom Software", desc: "Tailor-made software solutions for complex business logic and enterprise resource planning." }
               ].map((service, idx) => (
                   <RevealOnScroll key={idx} delay={idx * 0.1}>
                       <CyberServiceCard index={idx} icon={service.icon} title={service.title} desc={service.desc} />
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

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-32 px-6 bg-neutral-900/20">
         <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
                <div className="mb-20 text-center">
                    <span className="text-red-500 font-mono text-sm tracking-widest uppercase">/// Investment</span>
                    <h2 className="text-4xl md:text-5xl font-black mt-4">PRICING PLANS</h2>
                    <p className="text-gray-400 mt-4">Transparent pricing for world-class engineering.</p>
                </div>
            </RevealOnScroll>
            
            <div className="grid md:grid-cols-3 gap-8">
               <RevealOnScroll delay={0.1}>
                  <PricingCard 
                     title="Startup" 
                     price="1,500" 
                     features={["Single Page Application", "Basic SEO Setup", "1 Month Support", "Mobile Responsive"]} 
                  />
               </RevealOnScroll>
               <RevealOnScroll delay={0.2}>
                  <PricingCard 
                     title="Business" 
                     price="3,500" 
                     recommended={true}
                     features={["Multi-page Web App", "CMS Integration", "Advanced Security", "3 Months Support", "API Integration"]} 
                  />
               </RevealOnScroll>
               <RevealOnScroll delay={0.3}>
                  <PricingCard 
                     title="Enterprise" 
                     price="Custom" 
                     features={["Full SaaS Platform", "AI & ML Integration", "Cloud Architecture", "24/7 Dedicated Support", "Audited Security"]} 
                  />
               </RevealOnScroll>
            </div>
         </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="testimonials" className="py-32 px-6 border-t border-white/5">
         <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
               <h2 className="text-4xl font-black mb-16 text-center">CLIENT VOICES</h2>
            </RevealOnScroll>
            <div className="grid md:grid-cols-2 gap-8">
               {[
                  { name: "John Carter", company: "CEO, TechFlow", text: "Callisto's security audit saved us from a potential breach. Their attention to detail is unmatched in the industry." },
                  { name: "Sarah Williams", company: "Director, InnovateX", text: "The team delivered our AI platform weeks ahead of schedule. The code quality and performance are world-class." }
               ].map((t, i) => (
                  <RevealOnScroll key={i} delay={i * 0.1}>
                     <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl relative">
                        <div className="absolute top-[-15px] left-8 bg-red-600 text-white p-2 rounded-full"><Star size={20} fill="currentColor"/></div>
                        <p className="text-gray-300 italic mb-6 text-lg">"{t.text}"</p>
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><User /></div>
                           <div>
                              <h4 className="font-bold text-white">{t.name}</h4>
                              <p className="text-red-500 text-sm">{t.company}</p>
                           </div>
                        </div>
                     </div>
                  </RevealOnScroll>
               ))}
            </div>
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

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-red-900/5 -z-10 skew-y-3 transform origin-top-left"></div>
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <RevealOnScroll>
               <h2 className="text-5xl font-black mb-6">READY TO <br/><span className="text-red-600">START?</span></h2>
               <p className="text-gray-400 text-lg mb-8">Reach out to us for a consultation. Whether it's a new project or a security audit, we are here to help.</p>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-red-500"><Phone /></div>
                     <div><p className="text-sm text-gray-500">Call Us</p><p className="font-bold text-lg">+94 71 234 5678</p></div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-red-500"><Mail /></div>
                     <div><p className="text-sm text-gray-500">Email Us</p><p className="font-bold text-lg">hello@callisto.lk</p></div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-red-500"><MapPin /></div>
                     <div><p className="text-sm text-gray-500">Visit Us</p><p className="font-bold text-lg">Colombo, Sri Lanka</p></div>
                  </div>
               </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
               <div className="bg-neutral-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Name" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition-colors text-white" />
                        <input type="text" placeholder="Company" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition-colors text-white" />
                     </div>
                     <input type="email" placeholder="Email Address" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition-colors text-white" />
                     <select className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition-colors text-gray-400">
                        <option>Select Service</option>
                        <option>Web Development</option>
                        <option>Cyber Security</option>
                        <option>Mobile App</option>
                     </select>
                     <textarea rows="4" placeholder="Tell us about your project" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition-colors text-white"></textarea>
                     <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all">
                        SEND MESSAGE <Send size={18}/>
                     </button>
                  </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black pt-32 pb-10 relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 mb-20">
             <RevealOnScroll>
                 <div>
                    <img src="/logo.png" alt="Logo" className="h-16 w-auto mb-6 opacity-80 rounded-full" />
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