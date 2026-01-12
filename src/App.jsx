import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useInView } from 'framer-motion';
import { ArrowUpRight, Shield, Server, Globe, Database, Smartphone, Code, ChevronDown, Cpu, Lock, Zap, Layers } from 'lucide-react';

// --- COMPONENT 1: ENHANCED PARTICLE BACKGROUND WITH SHOOTING STARS ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);

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
    const numberOfParticles = 70;
    const shootingStars = [];

    // Normal Particle
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

    // Shooting Star Class
    class ShootingStar {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5;
        this.length = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 5;
        this.angle = Math.PI / 4; // 45 degrees
        this.opacity = 0;
        this.active = false;
        this.timer = Math.random() * 200;
      }
      update() {
        if (!this.active) {
          this.timer--;
          if (this.timer <= 0) {
            this.active = true;
            this.x = Math.random() * canvas.width * 0.5; // Start from left side mainly
            this.y = Math.random() * canvas.height * 0.5;
            this.opacity = 1;
          }
        } else {
          this.x += this.speed * Math.cos(this.angle);
          this.y += this.speed * Math.sin(this.angle);
          this.opacity -= 0.02;
          if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
            this.active = false;
            this.timer = Math.random() * 300 + 100; // Reset timer
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

    // Init Particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
    // Init Shooting Stars
    for (let i = 0; i < 3; i++) {
      shootingStars.push(new ShootingStar());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Particles & Connections
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

      // Draw Shooting Stars
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

// --- COMPONENT 2: HACKER TEXT EFFECT (NEW HERO ANIMATION) ---
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
      
      iterations += 1/3; // Speed control
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

// --- COMPONENT 3: SPOTLIGHT CARD ---
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

// --- COMPONENT 4: 3D TILT CARD ---
const TiltCard = ({ title, category, description }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY, z: 100 }}
      drag
      dragElastic={0.16}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      whileHover={{ cursor: "grabbing" }}
      className="w-full h-[400px] bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative overflow-hidden group perspective-1000 shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
        <div>
           <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-red-600/20">
              <Code size={24} />
           </div>
           <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
           <p className="text-red-500 font-mono text-sm tracking-wider">{category}</p>
        </div>
        <div className="space-y-4">
           <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
           <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:translate-x-2 transition-transform">
             VIEW CASE STUDY <ArrowUpRight size={16} />
           </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- COMPONENT 5: INFINITE SCROLL LOGOS ---
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

// --- COMPONENT 6: FAQ ---
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

// --- COMPONENT 7: PROCESS TIMELINE ---
const ProcessStep = ({ number, title, desc }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className="relative pl-12 pb-12 border-l border-white/10 last:border-0">
      <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : { scale: 0 }} className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
      <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }} transition={{ delay: 0.2 }}>
        <span className="text-red-500 font-mono text-sm mb-2 block">STEP 0{number}</span>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{desc}</p>
      </motion.div>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black z-[999] flex items-center justify-center flex-col text-center">
         <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-6"/>
         <h2 className="text-white font-black text-2xl tracking-widest uppercase animate-pulse">CALLISTO</h2>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-red-600 selection:text-white cursor-none overflow-x-hidden relative">
      
      {/* Enhanced Background */}
      <ParticleBackground />
      
      {/* Custom Cursor */}
      <div className="fixed top-0 left-0 w-6 h-6 bg-red-600 rounded-full pointer-events-none z-[100] hidden md:block mix-blend-screen blur-[2px]" style={{ left: mousePosition.x - 12, top: mousePosition.y - 12, transform: isHovering ? 'scale(3)' : 'scale(1)', transition: 'transform 0.1s' }} />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-orange-600 origin-left z-50" style={{ scaleX }} />

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-40 px-6 py-6 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
           <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
           <div className="hidden md:block">
             <h1 className="font-bold text-lg tracking-tight leading-none">CALLISTO</h1>
             <p className="text-[9px] text-gray-400 tracking-[0.2em]">SOFTWARE SOLUTION (PVT) LTD</p>
           </div>
        </div>
        <div className="hidden md:flex gap-8 items-center">
            {['Services', 'Process', 'Projects', 'FAQ'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">{item}</a>
            ))}
            <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all">
                Book a Call
            </button>
        </div>
      </nav>

      {/* --- HERO SECTION WITH HACKER ANIMATION --- */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-20 relative">
        <div className="max-w-7xl mx-auto w-full z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
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
          </motion.div>
        </div>
      </section>

      {/* --- INFINITE TECH STRIP --- */}
      <div className="py-12 bg-neutral-900 border-y border-white/10 overflow-hidden">
          <InfiniteLogos />
      </div>

      {/* --- SERVICES --- */}
      <section id="services" className="py-32 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="mb-20">
                <span className="text-red-500 font-mono text-sm tracking-widest uppercase">/// What We Do</span>
                <h2 className="text-4xl md:text-6xl font-bold mt-4">CORE SERVICES</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
               {[
                   { icon: Shield, title: "Cyber Security", desc: "Vulnerability assessment & penetration testing." },
                   { icon: Cpu, title: "AI Solutions", desc: "Machine learning models & intelligent automation." },
                   { icon: Globe, title: "Web Systems", desc: "Enterprise scalable web applications." },
                   { icon: Smartphone, title: "Mobile Apps", desc: "Native iOS & Android development." },
                   { icon: Database, title: "Cloud Infra", desc: "AWS/Azure architecture & DevOps." },
                   { icon: Layers, title: "UI/UX Design", desc: "User-centric interface design systems." }
               ].map((service, idx) => (
                   <SpotlightCard key={idx} className="p-8 h-full min-h-[250px] group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                       <div className="relative z-10 flex flex-col h-full">
                           <service.icon size={40} className="text-red-600 mb-6 group-hover:scale-110 transition-transform duration-300" />
                           <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                           <p className="text-gray-400">{service.desc}</p>
                       </div>
                   </SpotlightCard>
               ))}
            </div>
         </div>
      </section>

      {/* --- PROCESS TIMELINE --- */}
      <section id="process" className="py-32 px-6 bg-neutral-900/30">
        <div className="max-w-4xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">HOW WE WORK</h2>
              <p className="text-gray-400">Our proven methodology for success.</p>
           </div>
           <div className="pl-4">
              <ProcessStep number="1" title="Discovery & Strategy" desc="We analyze your business goals and technical requirements to create a solid roadmap." />
              <ProcessStep number="2" title="UI/UX Design" desc="Creating wireframes and prototypes to visualize the end product before coding." />
              <ProcessStep number="3" title="Agile Development" desc="Building your software in sprints with regular updates and feedback loops." />
              <ProcessStep number="4" title="Testing & Security" desc="Rigorous QA testing and security audits to ensure a bug-free launch." />
              <ProcessStep number="5" title="Deployment & Support" desc="Launching your product and providing 24/7 maintenance support." />
           </div>
        </div>
      </section>

      {/* --- 3D PROJECTS --- */}
      <section id="projects" className="py-32 px-6">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-black mb-16">FEATURED WORK</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               <TiltCard title="FinTech Core" category="Banking" description="Secure banking portal with 256-bit encryption." />
               <TiltCard title="AeroNav AI" category="Drone Tech" description="Autonomous navigation system for commercial drones." />
               <TiltCard title="MediSync" category="Healthcare" description="Hospital management system with AI diagnostics." />
            </div>
         </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-32 px-6 bg-neutral-900 border-y border-white/10">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">FREQUENTLY ASKED</h2>
            <AccordionItem question="How much does a custom software project cost?" answer="Project costs vary depending on complexity. We offer flexible pricing models starting from small business packages to enterprise solutions. Contact us for a free quote." />
            <AccordionItem question="Do you provide ongoing support?" answer="Yes, we offer 12 months of free maintenance for every project we build, including security patches and bug fixes." />
            <AccordionItem question="How long does development take?" answer="A standard website takes 2-4 weeks, while complex mobile apps or software systems can take 3-6 months depending on requirements." />
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black pt-32 pb-10 relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 mb-20">
             <div>
                <img src="/logo.png" alt="Logo" className="h-16 w-auto mb-6 opacity-80" />
                <h2 className="text-3xl font-bold mb-4">Let's Build the Future.</h2>
                <p className="text-gray-500 max-w-sm">
                   Callisto Software Solution (Pvt) Ltd.<br/>
                   Innovating through code.
                </p>
             </div>
             <div className="flex flex-col gap-4 items-start md:items-end">
                <a href="#" className="text-2xl font-bold hover:text-red-500 transition-colors">callisto.lk</a>
                <a href="#" className="text-2xl font-bold hover:text-red-500 transition-colors">+94 74 072 9268</a>
                <p className="text-gray-500">Matara, Sri Lanka</p>
             </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-600 text-sm">
             <p>© 2026 Callisto Software Solution (Pvt) Ltd. All Rights Reserved.</p>
          </div>
      </footer>
    </div>
  );
};

export default App;