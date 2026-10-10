import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Shield, Globe, Database, Smartphone, Cpu, Send, MapPin, Phone, Mail, Terminal, Wifi } from 'lucide-react';
import { ParticleBackground, RevealOnScroll, HackerText, HeroGraphic, AccordionItem } from '../components/Shared';
import { CyberServiceCard, ThreeDCarousel, InfiniteLogos, ProcessStep, TeamMember, Counter, PricingCard } from '../components/PageComponents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TeamMemberCard from '../components/TeamMemberCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

const Home = ({ navigateTo }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", mouseMove);
        return () => window.removeEventListener("mousemove", mouseMove);
    }, []);

    const navLinks = ['Services', 'Process', 'Projects', 'Pricing', 'Team', 'Contact'];

    // Services Data
    const services = [
        {
            id: 'web-systems',
            icon: Globe,
            title: "Enterprise Web Systems",
            desc: "High-performance, scalable web platforms built with React.js, Laravel, and Java architectures for complex business needs."
        },
        {
            id: 'mobile-apps',
            icon: Smartphone,
            title: "Next-Gen Mobile Apps",
            desc: "Seamless cross-platform and native Android experiences using React Native to ensure dominance in the mobile market."
        },
        {
            id: 'custom-soft',
            icon: Terminal,
            title: "Custom Software & Desktop",
            desc: "Robust Java-based desktop applications and tailored software solutions engineered to automate your unique business logic."
        },
        {
            id: 'iot-solutions',
            icon: Wifi,
            title: "Industrial IoT Solutions",
            desc: "Bridging hardware and cloud ecosystems for real-time remote monitoring, smart control, and data-driven connectivity."
        },
        {
            id: 'ai-solutions',
            icon: Cpu,
            title: "AI & Machine Learning",
            desc: "Integrating intelligent algorithms to transform raw data into predictive insights and automated decision-making systems."
        },
        {
            id: 'cyber-security',
            icon: Shield,
            title: "Cyber Security",
            desc: "Military-grade vulnerability assessment, penetration testing, and digital fortification to protect your sensitive data."
        }
    ];

    // Contact Form States (Update this part)
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        service: '',
        message: ''
    });
    const [status, setStatus] = useState(''); // 'loading', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');
    const [showConfirm, setShowConfirm] = useState(false); // New state for confirmation box

    // Callisto Services List
    const servicesList = [
        "Custom Software Development",
        "Web Application Development",
        "Mobile App Development (iOS & Android)",
        "UI/UX Design & Prototyping",
        "E-Commerce Solutions",
        "Cloud Architecture & DevOps",
        "Enterprise ERP/CRM Systems",
        "Software Maintenance & Support"
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        // මූලික Email Format එක (text@text.text) පරීක්ෂා කිරීම
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidFormat = re.test(String(email).toLowerCase());

        if (!isValidFormat) return false;

        // ගොඩක් අය අතින් වැරදෙන (Typos) ඩොමේන් ලිස්ට් එක
        const typoDomains = [
            'gail.com', 'gamil.com', 'gnail.com', 'gmaill.com', 'gmail.con', 'gmai.com',
            'yaho.com', 'yahhoo.com', 'yhoo.com',
            'outlok.com', 'outlook.con', 'hotmal.com'
        ];

        // Email එකෙන් '@' එකට පස්සේ තියෙන කොටස (Domain) වෙන් කරගැනීම
        const domain = email.split('@')[1].toLowerCase();

        // ඒ Domain එක වැරදි ලිස්ට් එකේ තියෙනවද කියලා බැලීම
        if (typoDomains.includes(domain)) {
            return false;
        }

        return true;
    };

    // handleSubmit function eka update karanna
    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Check for empty fields
        if (!formData.name || !formData.company || !formData.email || !formData.service || !formData.message) {
            setStatus('error');
            setErrorMessage('All fields are required. Please fill in the missing information.');
            return;
        }

        // 2. Validate Email
        if (!validateEmail(formData.email)) {
            setStatus('error');
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        // 3. Email is valid, show confirmation box
        setErrorMessage('');
        setShowConfirm(true);
    };

    // New function to actually send the email after confirmation
    const confirmAndSend = async () => {
        setShowConfirm(false); // Hide the confirmation box
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', company: '', email: '', service: '', message: '' });
                setTimeout(() => setStatus(''), 5000);
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Failed to send the message. Please try again later.');
        }
    };

    // --- Pricing Plan Alert States ---
    const [showPlanAlert, setShowPlanAlert] = useState(false);
    const [selectedPlanName, setSelectedPlanName] = useState('');

    const handlePlanSelection = (planName) => {
        setSelectedPlanName(planName);
        setShowPlanAlert(true); // Alert එක පෙන්වීම

        // තත්පර 2.5 කට පසුව Contact Section එකට Auto Scroll වීම
        setTimeout(() => {
            setShowPlanAlert(false);
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 2500);
    };

    return (
        <div className="bg-[#050505] text-white font-sans selection:bg-red-600 selection:text-white cursor-none overflow-x-hidden relative">
            <ParticleBackground />
            <div className="fixed top-0 left-0 w-6 h-6 bg-red-600 rounded-full pointer-events-none z-[100] hidden md:block mix-blend-screen blur-[2px]" style={{ left: mousePosition.x - 12, top: mousePosition.y - 12, transform: isHovering ? 'scale(3)' : 'scale(1)', transition: 'transform 0.1s' }} />

            <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navLinks={navLinks} setIsHovering={setIsHovering} />

            {/* --- HERO --- */}
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
                            <button onClick={() => navigateTo('platform')} className="mt-20 md:my-20 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all flex items-center gap-2 group">
                                EXPLORE PLATFORM <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </RevealOnScroll>
                    </div>
                    <RevealOnScroll delay={0.2}><HeroGraphic /></RevealOnScroll>
                </div>
            </section>

            {/* --- INFINITE LOGOS --- */}
            <div className="py-12 bg-neutral-900 border-y border-white/10 overflow-hidden">
                <InfiniteLogos />
            </div>

            {/* --- STATS --- */}
            <section className="pb-8 pt-16 md:py-20 px-6 border-b border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    <Counter from={0} to={85} label="Projects" />
                    <Counter from={0} to={12} label="Countries" />
                    <Counter from={0} to={99} label="Satisfaction" />
                    <Counter from={0} to={24} label="Support (Hrs)" />
                </div>
            </section>

            {/* --- SERVICES (CLICK FIXED HERE) --- */}
            <section id="services" className="py-12 md:py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="mb-20">
                            <span className="text-red-500 font-mono text-sm tracking-widest uppercase">/// System Capabilities</span>
                            <h2 className="text-4xl md:text-6xl font-bold mt-4">CORE SERVICES</h2>
                        </div>
                    </RevealOnScroll>
                    <div className="grid md:grid-cols-3 gap-6">
                        {services.map((service, idx) => (
                            <RevealOnScroll key={idx} delay={idx * 0.1}>
                                {/* FIXED: Now passing 'service-' prefix */}
                                <div onClick={() => navigateTo('service-' + service.id)} className="h-full cursor-pointer">
                                    <CyberServiceCard index={idx} icon={service.icon} title={service.title} desc={service.desc} />
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PROCESS --- */}
            <section id="process" className="py-12 md:py-16 bg-neutral-900/30">
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

            {/* --- PROJECTS --- */}
            <section id="projects" className="pt-12 md:pt-16 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <h2 className="text-5xl font-black mb-4 text-center">FEATURED WORK</h2>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.2}>
                        <ThreeDCarousel navigateTo={navigateTo} />
                    </RevealOnScroll>
                </div>
            </section>

            {/* --- PRICING --- */}
            <section id="pricing" className="py-24 md:py-32 px-6 bg-[#050505] relative z-10 overflow-hidden">

                {/* Background ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none"></div>

                {/* --- PLAN SELECTION ALERT --- */}
                <AnimatePresence>
                    {showPlanAlert && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: -20, x: "-50%" }}
                            className="fixed top-24 left-1/2 z-[100] bg-[#0a0a0a]/95 backdrop-blur-xl border border-red-500/30 px-6 py-5 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.3)] flex items-center gap-5 w-[90%] max-w-md"
                        >
                            <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center border border-red-500/30 animate-pulse shrink-0">
                                <Send className="text-red-500" size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm md:text-base tracking-wide">
                                    Great choice: {selectedPlanName} Plan!
                                </h4>
                                <p className="text-gray-400 text-xs font-mono mt-1">
                                    Please tell us about your project below.<br />Redirecting to contact form...
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="max-w-7xl mx-auto relative z-10">
                    <RevealOnScroll>
                        <div className="mb-20 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
                                <span className="text-red-500 font-mono text-xs tracking-widest uppercase">/// Strategic Investment</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black mt-4 text-white uppercase tracking-tighter">
                                PROJECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">PRICING</span>
                            </h2>
                            <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
                                Transparent pricing architectures engineered for scale. Choose the operational tier that aligns with your mission objectives.
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div className="grid lg:grid-cols-3 gap-8 items-center">

                        {/* --- STARTUP PLAN --- */}
                        <RevealOnScroll delay={0.1}>
                            <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 transition-all duration-500 hover:border-red-500/40 hover:shadow-[0_10px_40px_rgba(220,38,38,0.15)] group hover:-translate-y-2 relative overflow-hidden h-full flex flex-col">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-red-500/50 transition-all duration-500"></div>
                                <h3 className="text-xl font-bold text-white mb-2">Startup</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-gray-500 font-mono">$</span>
                                    <span className="text-5xl font-black text-white tracking-tighter">1,500</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-8 pb-8 border-b border-white/10">Perfect for deploying foundational digital assets and establishing market presence.</p>
                                <ul className="space-y-5 mb-10 flex-grow">
                                    {["Single Page Application", "Basic SEO Setup", "1 Month Technical Support", "Mobile Responsive Design"].map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 mr-4 shadow-[0_0_8px_rgba(220,38,38,0.8)]"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => handlePlanSelection('Startup')} className="w-full py-4 rounded-xl border border-white/10 text-white font-bold text-sm tracking-wide hover:bg-white/5 transition-all">
                                    INITIALIZE PLAN
                                </button>
                            </div>
                        </RevealOnScroll>

                        {/* --- BUSINESS PLAN (RECOMMENDED) --- */}
                        <RevealOnScroll delay={0.2}>
                            <div className="bg-gradient-to-b from-[#1a0505] to-[#0a0a0a] backdrop-blur-2xl border border-red-500/50 rounded-[2rem] p-10 transition-all duration-500 shadow-[0_0_30px_rgba(220,38,38,0.1)] group hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(220,38,38,0.25)] relative overflow-hidden h-full flex flex-col lg:scale-105 z-10">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>

                                {/* --- UPDATED RECOMMENDED BADGE --- */}
                                <div className="absolute top-5 right-5 bg-gradient-to-r from-red-600 to-red-500 border border-red-400/80 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.8)] z-20">
                                    <span className="text-[10px] sm:text-xs font-black text-white tracking-widest uppercase drop-shadow-md">Recommended</span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 mt-2">Business</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-gray-500 font-mono">$</span>
                                    <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tighter">3,500</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-8 pb-8 border-b border-red-500/20">Advanced architectures for scaling operations with robust security protocols.</p>
                                <ul className="space-y-5 mb-10 flex-grow">
                                    {["Multi-page Web App / Portal", "Custom CMS Integration", "Advanced Data Security", "3 Months Priority Support", "Third-party API Integration"].map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-white font-medium">
                                            <span className="w-2 h-2 rounded-full bg-red-500 mr-4 shadow-[0_0_12px_rgba(220,38,38,1)]"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => handlePlanSelection('Business')} className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-sm tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all overflow-hidden relative group/btn">
                                    <span className="relative z-10">DEPLOY NOW</span>
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full ease-in-out"></div>
                                </button>
                            </div>
                        </RevealOnScroll>

                        {/* --- ENTERPRISE PLAN --- */}
                        <RevealOnScroll delay={0.3}>
                            <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 transition-all duration-500 hover:border-red-500/40 hover:shadow-[0_10px_40px_rgba(220,38,38,0.15)] group hover:-translate-y-2 relative overflow-hidden h-full flex flex-col">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-red-500/50 transition-all duration-500"></div>
                                <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-5xl font-black text-white tracking-tighter">Custom</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-8 pb-8 border-b border-white/10">Military-grade digital infrastructures engineered for massive scale and complexity.</p>
                                <ul className="space-y-5 mb-10 flex-grow">
                                    {["Full Custom SaaS Platform", "AI & Machine Learning Engine", "Complex Cloud Architecture", "24/7 Dedicated Engineering Team", "Pen-tested Security Audits"].map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 mr-4 shadow-[0_0_8px_rgba(220,38,38,0.8)]"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => handlePlanSelection('Enterprise')} className="w-full py-4 rounded-xl border border-white/10 text-white font-bold text-sm tracking-wide hover:bg-white/5 transition-all">
                                    REQUEST BRIEFING
                                </button>
                            </div>
                        </RevealOnScroll>

                    </div>
                </div>
            </section>

            <section
                id="team"
                className="py-20 md:py-28 px-6 bg-neutral-950 border-t border-white/5 relative overflow-hidden"
                // අලුතින් එකතු කළ කොටස: Section එකට Ref එකක් දෙනවා, ඒකෙන් තමයි මේක පේනවාද නැද්ද කියලා බලන්නේ
                ref={(el) => {
                    if (el) {
                        const observer = new IntersectionObserver(
                            ([entry]) => {
                                // Window එකේ (window object) swiper එක save කරගන්නවා
                                if (window.teamSwiper) {
                                    if (entry.isIntersecting) {
                                        window.teamSwiper.autoplay.start(); // Section එක දැක්කම Start කරනවා
                                    } else {
                                        window.teamSwiper.autoplay.stop(); // Section එක පේන්නේ නැත්නම් නතර කරනවා
                                    }
                                }
                            },
                            { threshold: 0.3 } // Section එකෙන් 30% ක් පෙනුනම තමයි වැඩ කරන්න පටන් ගන්නේ
                        );
                        observer.observe(el);
                    }
                }}
            >
                <div className="max-w-7xl mx-auto relative z-10">
                    <RevealOnScroll>
                        <div className="mb-20 text-center">
                            <span className="text-red-500 font-mono text-sm tracking-widest uppercase">/// The Squad</span>
                            <h2 className="text-4xl md:text-5xl font-black mt-4 text-white">MEET THE MINDS</h2>
                            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">The elite engineers and strategists behind Callisto's digital dominance.</p>
                        </div>
                    </RevealOnScroll>

                    {/* Swiper එක මෙතනින් පටන් ගන්නවා */}
                    <Swiper
                        // අලුතින් එකතු කළ කොටස: Swiper එක load වුණ ගමන් ඒක window එකට save කරගන්නවා පාලනය කරන්න ලේසි වෙන්න
                        onSwiper={(swiper) => {
                            window.teamSwiper = swiper;
                            swiper.autoplay.stop(); // මුලින්ම load වෙද්දී ඉබේම දුවන එක නතර කරලා තියනවා
                        }}
                        modules={[Pagination, Autoplay]}
                        spaceBetween={32}
                        slidesPerView={1}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                        className="w-full pb-16 cursor-grab active:cursor-grabbing"
                    >
                        {[
                            {
                                name: "Kehan Hasalawa",
                                role: "Founder / CEO",
                                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
                                socials: {
                                    github: "https://github.com/",
                                    linkedin: "https://linkedin.com/",
                                    twitter: "https://twitter.com/"
                                }
                            },
                            {
                                name: "Tharindra Dasuni",
                                role: "Co-Founder",
                                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
                                socials: {
                                    linkedin: "https://linkedin.com/"
                                }
                            },
                            {
                                name: "Sahan  Dilshan",
                                role: "CEO",
                                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
                                socials: {
                                    github: "https://github.com/",
                                    twitter: "https://twitter.com/"
                                }
                            },
                            {
                                name: "Thushara Jayanga",
                                role: "CTO",
                                img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
                                socials: {
                                    github: "https://github.com/",
                                    twitter: "https://twitter.com/"
                                }
                            },
                            {
                                name: "Prasanna Lakshan",
                                role: "Software Engineer",
                                img: "https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&q=80&w=800",
                                socials: {
                                    github: "https://github.com/",
                                    twitter: "https://twitter.com/"
                                }
                            },
                            {
                                name: "Krishan Chirantha",
                                role: "Software Engineer",
                                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
                                socials: {
                                    github: "https://github.com/",
                                    twitter: "https://twitter.com/"
                                }
                            }
                        ].map((member, idx) => (
                            <SwiperSlide key={idx} className="pb-8">
                                <RevealOnScroll delay={idx * 0.1}>
                                    <TeamMemberCard {...member} />
                                </RevealOnScroll>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* --- CONTACT SECTION --- */}
            <section className="py-24 bg-[#050505] relative z-10" id="contact">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left Side: Contact Details */}
                        <div className="order-1 pr-0 lg:pr-10">
                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-2 leading-tight">
                                READY TO <br />
                                <span className="text-red-600">START?</span>
                            </h2>
                            <p className="text-gray-400 text-lg mt-6 mb-12 max-w-lg leading-relaxed">
                                Reach out to us for a consultation. Whether it's a new project or a security audit, we are here to help.
                            </p>

                            <div className="space-y-8">
                                {/* Phone */}
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-full bg-[#111111] border border-white/5 flex items-center justify-center shrink-0">
                                        <Phone className="text-red-500" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Call Us</p>
                                        <p className="text-white font-bold text-xl">+94 74 072 9268</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-full bg-[#111111] border border-white/5 flex items-center justify-center shrink-0">
                                        <Mail className="text-red-500" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Email Us</p>
                                        <p className="text-white font-bold text-xl">callistosoftwaresolution@gmail.com</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-full bg-[#111111] border border-white/5 flex items-center justify-center shrink-0">
                                        <MapPin className="text-red-500" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Visit Us</p>
                                        <p className="text-white font-bold text-xl">Matara, Sri Lanka</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Contact Form */}
                        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden order-2">
                            {/* Background glow effect */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>

                            {/* --- EMAIL CONFIRMATION OVERLAY --- */}
                            <AnimatePresence>
                                {showConfirm && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-md rounded-[2rem]"
                                    >
                                        <div className="text-center p-8 border border-white/10 rounded-2xl bg-black/60 shadow-[0_0_30px_rgba(220,38,38,0.15)] mx-6">
                                            <div className="w-16 h-16 bg-red-900/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Mail className="text-red-500" size={28} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Confirm Email</h3>
                                            <p className="text-gray-400 mb-6 font-mono text-sm leading-relaxed">
                                                Is the entered email correct?<br />
                                                <span className="text-red-500 font-bold text-base bg-red-900/10 px-3 py-1 rounded-md inline-block mt-2 tracking-wide">{formData.email}</span>
                                            </p>
                                            <div className="flex gap-4 justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirm(false)}
                                                    className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all font-mono text-sm"
                                                >
                                                    NO, EDIT
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={confirmAndSend}
                                                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] font-mono text-sm"
                                                >
                                                    YES, SEND
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Company */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Company</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
                                            placeholder="Company Inc."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Email */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    {/* Service Dropdown */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Service</label>
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled className="text-gray-500">Select a Service...</option>
                                            {servicesList.map((srv, idx) => (
                                                <option key={idx} value={srv} className="bg-[#0a0a0a]">{srv}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="flex flex-col space-y-2">
                                    <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Tell us about your project</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all resize-none"
                                        placeholder="Describe your requirements, goals, and timeline..."
                                    ></textarea>
                                </div>

                                {/* Error & Success Messages */}
                                {status === 'error' && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm font-mono text-center">
                                        ERROR: {errorMessage}
                                    </motion.div>
                                )}
                                {status === 'success' && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 text-sm font-mono text-center">
                                        SUCCESS: Transmission completed. We will contact you shortly.
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={`w-full group relative px-12 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-black tracking-widest text-sm rounded-xl overflow-hidden transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] ${status === 'loading' ? 'opacity-75 cursor-wait' : ''}`}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            {status === 'loading' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                                        </span>
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full ease-in-out"></div>
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;
