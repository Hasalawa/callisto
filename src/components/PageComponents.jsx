import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, Code, ChevronLeft, ChevronRight, Globe, Layers, Server, Database, Smartphone, Cpu, Lock, Zap, Linkedin, Shield, Twitter, Mail } from 'lucide-react';
import { SpotlightCard } from './Shared'; // Shared එකෙන් SpotlightCard එක ගන්නවා

// --- 1. CYBER SERVICE CARD ---
export const CyberServiceCard = ({ icon: Icon, title, desc, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

  return (
    <div ref={ref} className={`group relative h-full bg-neutral-900 border overflow-hidden transition-all duration-500 rounded-none md:rounded-tr-[3rem] md:rounded-bl-[3rem] ${isInView ? 'border-red-600/50' : 'border-white/10'} md:border-white/10 md:hover:border-red-600/50`}>
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_14px] transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100`}></div>
      <div className={`absolute inset-0 bg-gradient-to-b from-red-900/0 transition-all duration-500 ${isInView ? 'via-red-900/5 to-red-900/10' : 'via-red-900/0 to-red-900/0'} md:via-red-900/0 md:to-red-900/0 md:group-hover:via-red-900/5 md:group-hover:to-red-900/10`}></div>
      <div className={`absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 transition-colors duration-500 ${isInView ? 'border-red-600' : 'border-white/10'} md:border-white/10 md:group-hover:border-red-600`}></div>
      <div className={`absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 transition-colors duration-500 ${isInView ? 'border-red-600' : 'border-white/10'} md:border-white/10 md:group-hover:border-red-600`}></div>

      <div className="relative p-8 z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <div className={`w-14 h-14 border flex items-center justify-center transition-all duration-500 shadow-lg ${isInView ? 'bg-red-600 text-white border-red-500 shadow-red-600/20' : 'bg-white/5 border-white/10 text-red-600'} md:bg-white/5 md:text-red-600 md:border-white/10 md:group-hover:bg-red-600 md:group-hover:text-white md:group-hover:border-red-500 md:group-hover:shadow-red-600/20`}>
            <Icon size={28} strokeWidth={1.5} />
          </div>
          <span className={`font-mono text-xs transition-colors ${isInView ? 'text-red-500/50' : 'text-gray-700'} md:text-gray-700 md:group-hover:text-red-500/50`}>SYS_0{index + 1}</span>
        </div>
        <h3 className={`text-2xl font-bold text-white mb-4 transition-transform duration-300 flex items-center gap-2 ${isInView ? 'translate-x-2' : 'translate-x-0'} md:translate-x-0 md:group-hover:translate-x-2`}>{title}</h3>
        <p className={`text-gray-400 text-sm leading-relaxed mb-6 flex-1 border-l-2 pl-4 transition-colors ${isInView ? 'border-red-600/30' : 'border-white/5'} md:border-white/5 md:group-hover:border-red-600/30`}>{desc}</p>
        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
          <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${isInView ? 'text-white' : 'text-gray-500'} md:text-gray-500 md:group-hover:text-white`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isInView ? 'bg-red-500 animate-ping' : 'bg-gray-600'} md:bg-gray-600 md:group-hover:bg-red-500 md:group-hover:animate-ping`}></span>
            Online
          </div>
          <ArrowUpRight size={16} className={`transition-colors transform duration-300 ${isInView ? 'text-red-500 rotate-45' : 'text-gray-600'} md:text-gray-600 md:rotate-0 md:group-hover:text-red-500 md:group-hover:rotate-45`} />
        </div>
      </div>
    </div>
  );
};

// --- 2. 3D CAROUSEL (RESIZED & COMPACT VERSION) ---
export const ThreeDCarousel = () => {
  const [active, setActive] = useState(2);
  const [isPaused, setIsPaused] = useState(false); // Controls Auto-play

  // Brand Red Color
  const themeColor = "#dc2626";

  const cards = [
    {
      id: 1,
      title: "FinTech Core",
      category: "Banking",
      icon: Database,
      tech: ["React", "Node.js", "Blockchain"],
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      desc: "Secure banking portal with 256-bit encryption & AI fraud detection."
    },
    {
      id: 2,
      title: "AeroNav AI",
      category: "Drone Tech",
      icon: Zap,
      tech: ["Python", "TensorFlow", "IoT"],
      img: "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=800",
      desc: "Autonomous navigation system for commercial drones using Computer Vision."
    },
    {
      id: 3,
      title: "MediSync",
      category: "Healthcare",
      icon: Code,
      tech: ["Flutter", "Firebase", "AI"],
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
      desc: "Hospital management system with AI diagnostics and Cloud Sync."
    },
    {
      id: 4,
      title: "CyberShield",
      category: "Security",
      icon: Shield,
      tech: ["C++", "Rust", "Networking"],
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      desc: "Enterprise-grade firewall and threat detection dashboard."
    },
    {
      id: 5,
      title: "LogiChain",
      category: "Logistics",
      icon: Server,
      tech: ["Angular", "AWS", "IoT"],
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      desc: "AI-powered supply chain optimization with real-time fleet tracking."
    },
    {
      id: 6,
      title: "EduSphere",
      category: "EdTech",
      icon: Smartphone,
      tech: ["Vue.js", "WebRTC", "AI"],
      img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
      desc: "Interactive LMS with live virtual classrooms and AI tutoring."
    },
    {
      id: 7,
      title: "EstateVR",
      category: "Real Estate",
      icon: Layers,
      tech: ["Unity", "React", "VR"],
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
      desc: "Immersive virtual tours for luxury real estate properties."
    },
    {
      id: 8,
      title: "AgriSense",
      category: "AgriTech",
      icon: Cpu,
      tech: ["Python", "IoT", "Azure"],
      img: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=800",
      desc: "AI-driven crop monitoring system with autonomous irrigation control."
    }
  ];

  const handleNext = () => setActive((prev) => (prev + 1) % cards.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + cards.length) % cards.length);

  // --- AUTO PLAY (4 Seconds) ---
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length);
    }, 4000); // 4 Seconds
    return () => clearInterval(interval);
  }, [isPaused, cards.length]);

  const getCardStyles = (index) => {
    const diff = (index - active + cards.length) % cards.length;
    let dist = diff;
    if (diff > Math.floor(cards.length / 2)) dist = diff - cards.length;

    const isActive = dist === 0;

    // Spacing
    const xOffset = dist * 160;

    const scale = isActive ? 1.05 : 1 - Math.abs(dist) * 0.15;

    // Opacity logic to show 3 cards deep
    const opacity = isActive ? 1 : 1 - Math.abs(dist) * 0.2;

    const zIndex = 10 - Math.abs(dist);
    const rotateY = dist * -20;

    return {
      x: xOffset,
      scale,
      opacity: Math.abs(dist) > 3 ? 0 : opacity,
      zIndex,
      rotateY,
      filter: isActive ? 'blur(0px) brightness(1.1)' : 'blur(4px) brightness(0.6)',
      pointerEvents: isActive ? 'auto' : 'none',
      isActive
    };
  };

  return (
    <div className="relative h-[650px] w-full flex items-center justify-center perspective-1000 overflow-hidden">

      {/* DYNAMIC BACKGROUND PULSE */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] bg-red-600/20 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative w-full max-w-7xl h-full flex items-center justify-center mb-12">
        {cards.map((card, index) => {
          const { isActive, ...styles } = getCardStyles(index);
          const CardIcon = card.icon;

          return (
            <motion.div
              key={card.id}
              initial={styles}
              animate={{
                ...styles,
                // FLOATING EFFECT
                y: isActive ? [0, -10, 0] : 0,
              }}
              transition={{
                // Switching physics (Fast & Smooth)
                type: "spring", stiffness: 350, damping: 30, mass: 0.8,
                // Floating loop override
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}

              onMouseEnter={() => isActive && setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}

              className="absolute w-[300px] md:w-[380px] h-[400px] bg-neutral-900 rounded-3xl overflow-hidden flex flex-col group border border-white/5"
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: isActive
                  ? `0 20px 50px -10px ${themeColor}60, 0 0 20px -5px ${themeColor}`
                  : '0 10px 30px -10px black',
                border: `1px solid ${isActive ? themeColor : 'rgba(255,255,255,0.05)'}`
              }}
            >
              {/* Background Image: Grayscale when inactive, Color when active */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className={`w-full h-full object-cover opacity-50 transition-all duration-700 group-hover:scale-110 ${isActive ? 'grayscale-0' : 'grayscale'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
              </div>

              {/* PROGRESS BAR */}
              {isActive && !isPaused && (
                <motion.div
                  className="absolute bottom-0 left-0 h-[3px] bg-red-500 z-50 shadow-[0_0_10px_#dc2626]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  key={active}
                />
              )}

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col h-full">

                {/* Top Badge Row */}
                <div className="flex justify-between items-start mb-2">
                  {/* ICON BADGE */}
                  <div
                    className="w-10 h-10 backdrop-blur-xl rounded-lg flex items-center justify-center z-20 shadow-lg border border-white/10"
                    style={{ backgroundColor: `${themeColor}40` }}
                  >
                    <CardIcon size={20} className="text-white drop-shadow-md" />
                  </div>

                  {/* RESTORED: PREVIOUS CATEGORY BADGE DESIGN & ANIMATION */}
                  <div
                    className="px-3 py-1 rounded-md shadow-lg z-20 backdrop-blur-md"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      border: `1px solid ${themeColor}`,
                      boxShadow: `0 0 10px ${themeColor}40`
                    }}
                  >
                    {/* Animated Text: Color Pulse */}
                    <motion.span
                      className="text-[10px] font-mono font-bold uppercase tracking-wider block"
                      animate={isActive ? {
                        color: ["#dc2626", "#ff9999", "#dc2626"], // Red -> Light Red -> Red
                      } : { color: themeColor }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {card.category}
                    </motion.span>
                  </div>
                </div>

                {/* Bottom Details with STAGGERED ENTRANCE ANIMATION */}
                <div className="mt-auto">
                  {/* Animate Title */}
                  <motion.h3
                    className="text-3xl font-black text-white mb-3 leading-tight"
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    {card.title}
                  </motion.h3>

                  {/* Animate Tags */}
                  <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {card.tech.map((tech, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300 font-mono hover:bg-white/10 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </motion.div>

                  {/* Animate Description */}
                  <motion.p
                    className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2"
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {card.desc}
                  </motion.p>

                  {/* Animate Button */}
                  <motion.button
                    className="group/btn relative w-full py-3 bg-red-600 text-white text-xs font-bold rounded-xl overflow-hidden shadow-lg shadow-red-600/20 hover:shadow-red-600/50 transition-all duration-300"
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      EXPLORE PROJECT
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full ease-in-out"></div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div
        className="absolute bottom-12 flex gap-6 z-30"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button onClick={handlePrev} className="group p-4 rounded-full bg-black/40 border border-white/10 text-white hover:bg-red-600 hover:border-red-500 backdrop-blur-md transition-all active:scale-95 shadow-2xl">
          <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button onClick={handleNext} className="group p-4 rounded-full bg-black/40 border border-white/10 text-white hover:bg-red-600 hover:border-red-500 backdrop-blur-md transition-all active:scale-95 shadow-2xl">
          <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// --- 3. INFINITE LOGOS ---
export const InfiniteLogos = () => (
  <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
    <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
      {[...Array(2)].map((_, i) => (
        <ul key={i} className="flex items-center justify-center md:justify-start [&_li]:mx-12 [&_li]:text-gray-500 font-bold text-2xl">
          <li className="flex items-center gap-2"><Globe /> REACT</li>
          <li className="flex items-center gap-2"><Server /> AWS CLOUD</li>
          <li className="flex items-center gap-2"><Database /> MONGODB</li>
          <li className="flex items-center gap-2"><Smartphone /> FLUTTER</li>
          <li className="flex items-center gap-2"><Cpu /> AI/ML</li>
          <li className="flex items-center gap-2"><Lock /> CYBERSEC</li>
          <li className="flex items-center gap-2"><Zap /> NEXT.JS</li>
        </ul>
      ))}
    </motion.div>
  </div>
);

// --- 4. PROCESS STEP ---
export const ProcessStep = ({ number, title, desc }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  return (
    <div ref={ref} className="relative pl-12 pb-12 border-l border-white/10 last:border-0">
      <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : { scale: 0 }} transition={{ duration: 0.5 }} className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
      <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <span className="text-red-500 font-mono text-sm mb-2 block">STEP 0{number}</span>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{desc}</p>
      </motion.div>
    </div>
  );
};

// --- 5. TEAM MEMBER ---
export const TeamMember = ({ name, role, img }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });
  return (
    <div ref={ref} className="group relative bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden hover:border-red-600/50 transition-colors duration-500">
      <div className="h-[350px] w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
        <img src={img} alt={name} className={`w-full h-full object-cover transition-all duration-700 ${isInView ? 'grayscale-0 scale-110' : 'grayscale scale-100'} md:grayscale md:scale-100 md:group-hover:grayscale-0 md:group-hover:scale-110`} />
      </div>
      <div className={`absolute bottom-0 left-0 w-full p-6 z-20 transition-transform duration-500 ${isInView ? 'translate-y-0' : 'translate-y-4'} md:translate-y-4 md:group-hover:translate-y-0`}>
        <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
        <p className="text-red-500 font-mono text-sm tracking-widest uppercase mb-4">{role}</p>
        <div className={`flex gap-4 transition-opacity duration-500 delay-100 ${isInView ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100`}>
          <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-red-600 hover:text-white transition-colors"><Linkedin size={18} /></a>
          <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-red-600 hover:text-white transition-colors"><Twitter size={18} /></a>
          <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-red-600 hover:text-white transition-colors"><Mail size={18} /></a>
        </div>
      </div>
    </div>
  )
}

// --- 6. ANIMATED COUNTER ---
export const Counter = ({ from, to, label }) => {
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
      <div className="text-5xl font-black text-white mb-2 flex justify-center items-baseline"><span ref={nodeRef}>{from}</span><span className="text-red-600">+</span></div>
      <div className="text-gray-400 text-sm uppercase tracking-widest font-mono">{label}</div>
    </div>
  );
};

// --- 7. PRICING CARD ---
export const PricingCard = ({ title, price, features, recommended = false }) => {
  return (
    <SpotlightCard className={`p-8 flex flex-col h-full ${recommended ? 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.2)]' : ''}`}>
      <div className="relative z-10 flex flex-col h-full">
        {recommended && <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>}
        <h3 className="text-xl font-bold text-gray-400 mb-2">{title}</h3>
        <div className="flex items-baseline gap-1 mb-6"><span className="text-4xl font-black text-white">${price}</span><span className="text-gray-500">/project</span></div>
        <ul className="space-y-4 mb-8 flex-1">{features.map((feat, i) => (<li key={i} className="flex items-center gap-3 text-gray-300 text-sm"><div className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 flex-shrink-0"><Check size={12} /></div>{feat}</li>))}</ul>
        <button className={`w-full py-3 rounded-xl font-bold transition-all ${recommended ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>Choose Plan</button>
      </div>
    </SpotlightCard>
  )
}