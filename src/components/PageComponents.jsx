import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Check, Code, ChevronLeft, ChevronRight, Globe, Server, Database, Smartphone, Cpu, Lock, Zap, Linkedin, Twitter, Mail } from 'lucide-react';
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

// --- 2. 3D CAROUSEL ---
export const ThreeDCarousel = () => {
  const [active, setActive] = useState(1);
  const cards = [
    { id: 1, title: "FinTech Core", category: "Banking System", desc: "Secure banking portal with 256-bit encryption & AI fraud detection." },
    { id: 2, title: "AeroNav AI", category: "Drone Tech", desc: "Autonomous navigation system for commercial drones using Computer Vision." },
    { id: 3, title: "MediSync", category: "Healthcare", desc: "Hospital management system with AI diagnostics and Cloud Sync." },
    { id: 4, title: "CyberShield", category: "Security", desc: "Enterprise-grade firewall and threat detection dashboard." },
    { id: 5, title: "ShopNext", category: "E-Commerce", desc: "Next-gen headless e-commerce platform with AR product preview." }
  ];

  const handleNext = () => setActive((prev) => (prev + 1) % cards.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + cards.length) % cards.length);

  const getCardStyles = (index) => {
    const diff = (index - active + cards.length) % cards.length;
    let dist = diff;
    if (diff > Math.floor(cards.length / 2)) dist = diff - cards.length;
    
    const isActive = dist === 0;
    const xOffset = dist * 150;
    const scale = 1 - Math.abs(dist) * 0.2;
    const opacity = 1 - Math.abs(dist) * 0.3;
    const zIndex = 10 - Math.abs(dist);
    const rotateY = dist * -25;

    return { x: xOffset, scale, opacity: Math.abs(dist) > 2 ? 0 : opacity, zIndex, rotateY, filter: isActive ? 'blur(0px)' : 'blur(4px)', pointerEvents: isActive ? 'auto' : 'none' };
  };

  return (
    <div className="relative h-[500px] w-full flex items-center justify-center perspective-1000">
       <div className="relative w-full max-w-3xl h-full flex items-center justify-center">
          {cards.map((card, index) => {
             const styles = getCardStyles(index);
             return (
                <motion.div key={card.id} animate={styles} transition={{ type: "spring", stiffness: 150, damping: 20 }} className="absolute w-[350px] md:w-[400px] h-[450px] bg-neutral-900 border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-black/80" style={{ transformStyle: 'preserve-3d' }}>
                   <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent pointer-events-none rounded-3xl"></div>
                   <div>
                      <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-red-600/20"><Code size={24} /></div>
                      <h3 className="text-3xl font-bold text-white mb-2">{card.title}</h3>
                      <p className="text-red-500 font-mono text-sm tracking-wider uppercase">{card.category}</p>
                   </div>
                   <div className="space-y-4">
                      <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                      <button className="flex items-center gap-2 text-white font-bold text-sm hover:text-red-500 transition-colors">VIEW PROJECT <ArrowUpRight size={16} /></button>
                   </div>
                </motion.div>
             );
          })}
       </div>
       <div className="absolute bottom-[-40px] flex gap-4 z-20">
          <button onClick={handlePrev} className="p-3 rounded-full bg-neutral-800 border border-white/10 hover:bg-red-600 hover:text-white transition-all"><ChevronLeft size={24} /></button>
          <button onClick={handleNext} className="p-3 rounded-full bg-neutral-800 border border-white/10 hover:bg-red-600 hover:text-white transition-all"><ChevronRight size={24} /></button>
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"/>
          <img src={img} alt={name} className={`w-full h-full object-cover transition-all duration-700 ${isInView ? 'grayscale-0 scale-110' : 'grayscale scale-100'} md:grayscale md:scale-100 md:group-hover:grayscale-0 md:group-hover:scale-110`}/>
       </div>
       <div className={`absolute bottom-0 left-0 w-full p-6 z-20 transition-transform duration-500 ${isInView ? 'translate-y-0' : 'translate-y-4'} md:translate-y-4 md:group-hover:translate-y-0`}>
          <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
          <p className="text-red-500 font-mono text-sm tracking-widest uppercase mb-4">{role}</p>
          <div className={`flex gap-4 transition-opacity duration-500 delay-100 ${isInView ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100`}>
             <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-red-600 hover:text-white transition-colors"><Linkedin size={18}/></a>
             <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-red-600 hover:text-white transition-colors"><Twitter size={18}/></a>
             <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-red-600 hover:text-white transition-colors"><Mail size={18}/></a>
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
          <ul className="space-y-4 mb-8 flex-1">{features.map((feat, i) => (<li key={i} className="flex items-center gap-3 text-gray-300 text-sm"><div className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 flex-shrink-0"><Check size={12}/></div>{feat}</li>))}</ul>
          <button className={`w-full py-3 rounded-xl font-bold transition-all ${recommended ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>Choose Plan</button>
       </div>
    </SpotlightCard>
  )
}