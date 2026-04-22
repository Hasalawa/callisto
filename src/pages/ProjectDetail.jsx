import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, Code, Globe, Monitor, Layers, Cpu, ChevronLeft, ChevronRight, PlayCircle, MapPin, Landmark, Store, Gem, MessageSquare, ShoppingCart, Terminal, Shield } from 'lucide-react';
import { ParticleBackground } from '../components/Shared';
import Footer from '../components/Footer';
import { LoadingScreen } from '../components/PageComponents';

// --- UTILITY: HOLOGRAPHIC GRID & CRT OVERLAY ---
const HolographicGridOverlay = () => (
    <>
        <div className="fixed inset-0 pointer-events-none z-[0] opacity-30 mix-blend-screen"
            style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(220, 38, 38, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
                 `,
                backgroundSize: '50px 50px',
                maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
            }}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/10 to-transparent"
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 100%' }}
            />
        </div>
        <div className="fixed inset-0 pointer-events-none z-[50] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%] opacity-20 mix-blend-overlay"></div>
    </>
);

// --- COMPONENT: PREMIUM IMAGE CAROUSEL ---
const ImageCarousel = ({ images, accentColor }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="relative rounded-3xl overflow-hidden border border-red-500/20 shadow-[0_0_40px_rgba(220,38,38,0.15)] group h-[400px] md:h-[520px] bg-[#050505] backdrop-blur-xl">

            <div className={`absolute inset-0 bg-gradient-to-tr ${accentColor} mix-blend-overlay opacity-20 z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-30`}></div>
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-white/5 to-transparent opacity-50"></div>

            {/* REMOVED mode="wait" so images cross-fade smoothly without showing black background */}
            <AnimatePresence>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Project screenshot ${currentIndex + 1}`}
                    initial={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10 pointer-events-none"></div>

            <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-2xl bg-black/40 text-white backdrop-blur-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600/90 hover:border-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:-translate-x-2">
                <ChevronLeft size={24} />
            </button>
            <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-2xl bg-black/40 text-white backdrop-blur-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600/90 hover:border-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:translate-x-2">
                <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-30">
                {images.map((_, idx) => (
                    <button key={idx} onClick={() => setCurrentIndex(idx)} className={`transition-all duration-500 rounded-full overflow-hidden relative ${currentIndex === idx ? 'w-12 h-1.5 bg-red-900 border border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.8)]' : 'w-4 h-1.5 bg-white/20 hover:bg-white/50'}`}>
                        {currentIndex === idx && (
                            <motion.div layoutId="activeDot" className="absolute inset-0 bg-red-500" initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: 4, ease: "linear" }} />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

const ProjectDetail = ({ projectId, onBack }) => {
    const [loading, setLoading] = useState(true);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, [projectId]);

    const getProjectData = (id) => {
        const projects = {
            'e-buy': {
                title: "E-BUY",
                category: "E-Commerce Platform",
                client: "Retail Corp Ltd.",
                duration: "3 Months",
                role: "Full-stack Development",
                icon: ShoppingCart,
                tech: ["PHP", "JavaScript", "MySQL", "Bootstrap", "RESTful APIs"],
                overview: "E-Buy is a comprehensive electronic goods e-commerce platform designed to handle high-volume transactions. It features a dynamic cart management system, secure payment gateway integrations, and a custom admin dashboard for real-time inventory tracking.",
                features: ["Real-time Inventory Sync", "Secure Stripe Checkout", "Dynamic Cart Management", "Admin Analytics Dashboard"],
                images: [
                    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200"
                ],
                accentColor: "from-blue-600 to-indigo-600"
            },
            'chatme': {
                title: "ChatMe",
                category: "Messaging Application",
                client: "StartUp Inc.",
                duration: "4 Months",
                role: "Mobile App Development",
                icon: MessageSquare,
                tech: ["React Native", "TypeScript", "Java", "WebSockets", "MySQL"],
                overview: "A cross-platform mobile messaging application engineered for seamless real-time communication. ChatMe utilizes WebSockets for instant message delivery, end-to-end encryption for security, and a highly responsive UI built with React Native.",
                features: ["Real-time Messaging (WebSockets)", "End-to-End Encryption", "Media File Sharing", "Push Notifications"],
                images: [
                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200"
                ],
                accentColor: "from-purple-600 to-pink-600"
            },
            'smart-auto-bot': {
                title: "Smart Auto-Bot",
                category: "Hardware & IoT",
                client: "Tech Education Board",
                duration: "2 Months",
                role: "Embedded Systems & UI",
                icon: Cpu,
                tech: ["Arduino", "C++", "Java Swing", "Bluetooth Serial"],
                overview: "An autonomous, obstacle-avoiding robotic vehicle integrated with a custom Java-based desktop control interface. The system allows users to manually override the robot's autonomous mode via a Bluetooth connection for precision control and sensor data monitoring.",
                features: ["Ultrasonic Obstacle Avoidance", "Bluetooth Telemetry", "Java Desktop Controller", "Real-time Sensor Graphing"],
                images: [
                    "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1535378273068-9bb67d5beacd?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200"
                ],
                accentColor: "from-green-600 to-emerald-600"
            },
            'airnet': {
                title: "AIRNET",
                category: "Entertainment Portal",
                client: "MediaStream LLC",
                duration: "5 Months",
                role: "Web Architecture",
                icon: PlayCircle,
                tech: ["Java EE", "HTML5/CSS3", "JavaScript", "MySQL", "AWS S3"],
                overview: "A high-performance Java web platform designed for streaming multimedia content. AIRNET allows content creators to monetize their videos while providing users with a buffer-free, subscription-based viewing experience with adaptive bitrate streaming.",
                features: ["Adaptive Bitrate Streaming", "Creator Monetization Tools", "Subscription Management", "Cloud Video Hosting (AWS)"],
                images: [
                    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=1200"
                ],
                accentColor: "from-red-600 to-orange-600"
            },
            'mega-market-pos': {
                title: "Mega Market POS",
                category: "Retail Management",
                client: "Mega Supermarkets",
                duration: "6 Months",
                role: "Desktop Software Dev",
                icon: Store,
                tech: ["Java SE", "Java Swing", "MySQL", "JasperReports"],
                overview: "A robust, offline-first Java desktop application engineered for high-traffic supermarket checkouts. The system handles complex inventory logic, multi-currency payments, barcode scanner integration, and generates dynamic daily sales reports.",
                features: ["Offline-First Architecture", "Barcode Scanner Integration", "Dynamic Report Generation", "Multi-Tier Access Control"],
                images: [
                    "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=1200"
                ],
                accentColor: "from-teal-600 to-cyan-600"
            },
            'nexway': {
                title: "NexWay",
                category: "Ride-Hailing System",
                client: "Transit Solutions",
                duration: "8 Months",
                role: "Android & Backend Core",
                icon: MapPin,
                tech: ["Java Android", "Spring Boot", "Firebase", "Google Maps API"],
                overview: "An on-demand transportation platform featuring dedicated apps for drivers and passengers. The system relies on a Spring Boot backend and Google Maps APIs to provide real-time driver tracking, route optimization, and fare estimation algorithms.",
                features: ["Live GPS Tracking", "Dynamic Fare Calculation", "Driver/Passenger Matchmaking", "In-App Wallet System"],
                images: [
                    "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1556122071-e404be74749f?auto=format&fit=crop&q=80&w=1200"
                ],
                accentColor: "from-yellow-500 to-orange-500"
            },
            'cbc-banking-system': {
                title: "CBC Banking System",
                category: "Enterprise Finance",
                client: "Commercial Bank Corp",
                duration: "12 Months",
                role: "Core Banking Arch",
                icon: Landmark,
                tech: ["Java Core", "Swing", "MySQL (Encrypted)", "Biometric SDK"],
                overview: "A highly secure, end-to-end desktop banking solution managing teller operations, loan processing, and customer accounts. A standout feature is the integration of biometric fingerprint scanners for strict employee attendance and transaction authorization.",
                features: ["Biometric Authentication", "AES-256 Data Encryption", "Automated Loan Processing", "Audit Trail Logging"],
                images: [
                    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1616803140344-6682afb13cda?auto=format&fit=crop&q=80&w=1200"
                ],
                accentColor: "from-slate-600 to-zinc-600"
            },
            'pinkie': {
                title: "Pinkie",
                category: "Luxury E-Commerce",
                client: "Pinkie Jewelers",
                duration: "3 Months",
                role: "Web Application Dev",
                icon: Gem,
                tech: ["Java", "Hibernate", "MySQL", "Bootstrap"],
                overview: "An elegant, visually driven e-commerce platform built specifically for a premium jewelry brand. Built on a robust Java and Hibernate backend, it ensures smooth product filtering, high-resolution image handling, and secure, encrypted checkouts.",
                features: ["Advanced Product Filtering", "Secure Checkout Gateway", "Wishlist Functionality", "Admin Order Management"],
                images: [
                    "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200"
                ],
                accentColor: "from-rose-500 to-pink-500"
            }
        };

        return projects[id] || {
            title: "Project Not Found",
            category: "Unknown",
            client: "N/A",
            duration: "N/A",
            role: "N/A",
            icon: Terminal,
            tech: ["Unknown"],
            overview: "The requested project details could not be loaded. Please return to the portfolio.",
            features: [],
            images: ["https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"],
            accentColor: "from-gray-600 to-gray-800"
        };
    };

    const project = getProjectData(projectId);
    const ProjectIcon = project.icon;

    if (loading) {
        return <LoadingScreen title="CALLISTO" subtitle="PROJECT INITIALIZING..." />;
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-4 px-6 relative font-sans overflow-hidden selection:bg-red-600 selection:text-white">

            {/* Background Layers */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-900/15 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-orange-900/10 rounded-full blur-[150px] pointer-events-none"></div>
            <HolographicGridOverlay />

            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 z-[100] origin-left shadow-[0_0_15px_rgba(220,38,38,0.8)]" style={{ scaleX }} />
            <ParticleBackground />

            <div className="max-w-7xl mx-auto mb-24 relative z-20 mt-10">

                {/* Header Row */}
                <div className="flex justify-between items-center mb-12">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={onBack}
                        className="relative flex items-center gap-3 text-gray-300 transition-all group font-mono text-sm border border-white/10 px-5 py-2.5 rounded-xl bg-black/60 backdrop-blur-xl overflow-hidden hover:text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:-translate-y-0.5"
                    >
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform relative z-10 text-red-500 group-hover:text-white" />
                        <span className="relative z-10 tracking-widest font-bold">RETURN</span>
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative group overflow-hidden rounded-lg"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div className="relative flex items-center gap-2 px-4 py-2 bg-black/60 border border-red-500/50 rounded-lg backdrop-blur-sm shadow-[0_0_15px_rgba(220,38,38,0.15)] group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]"></div>
                            <span className="font-mono text-[10px] md:text-xs text-red-100 tracking-[0.2em] uppercase font-bold">
                                SYS_ID // {projectId.toUpperCase()}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Section */}
                <div className="grid lg:grid-cols-12 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3.5 bg-gradient-to-br from-red-600/20 to-transparent border border-red-500/40 rounded-2xl text-red-500 shadow-[0_0_30px_rgba(220,38,38,0.15)] backdrop-blur-md">
                                <ProjectIcon size={28} strokeWidth={1.5} />
                            </div>
                            <div className="inline-block px-4 py-2 bg-black/50 border border-white/10 rounded-full text-gray-300 font-mono text-[10px] tracking-[0.2em] uppercase shadow-inner backdrop-blur-md">
                                {project.category}
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">
                            {(() => {
                                let globalIndex = 0;
                                return project.title.split(' ').map((word, wordIndex) => (
                                    <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.3em] last:mr-0">
                                        {word.split('').map((char, charIndex) => {
                                            const delayIndex = globalIndex++;
                                            return (
                                                <motion.span
                                                    key={charIndex}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: delayIndex * 0.05 + 0.3 }}
                                                    className="inline-block"
                                                >
                                                    {char === ' ' ? '\u00A0' : char}
                                                </motion.span>
                                            );
                                        })}
                                    </span>
                                ));
                            })()}
                        </h1>

                        <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-transparent rounded-full"></div>
                            <p className="text-gray-400 text-lg leading-relaxed pl-6 py-2">
                                {project.overview}
                            </p>
                        </div>

                        <div className="pt-2">
                            <span className="text-[10px] font-mono text-red-500/80 uppercase tracking-widest block mb-4 flex items-center gap-2">
                                <Layers size={14} /> Stack Configuration
                            </span>
                            <div className="flex flex-wrap gap-2.5">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 hover:border-red-500/60 hover:bg-red-900/20 hover:shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all duration-300 rounded-lg text-xs font-mono text-gray-300 flex items-center gap-2 cursor-default backdrop-blur-sm group/tech">
                                        <Code size={14} className="text-gray-500 group-hover/tech:text-red-500 transition-colors" /> {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                        className="lg:col-span-7 perspective-1000"
                    >
                        <ImageCarousel images={project.images} accentColor={project.accentColor} />
                    </motion.div>
                </div>

                {/* INFO CARDS WITH VISIBLE GLOBAL THICK RED GLOW SWEEP */}
                <div className="relative mb-24 overflow-hidden py-10 px-2 -mx-2">

                    {/* The connecting horizontal line behind the cards */}
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/20 to-transparent -translate-y-1/2 z-0 pointer-events-none"></div>

                    {/* THE GLOBAL CONTINUOUS REFINED GLOW SWEEP - DEEP RED, NO WHITE */}
                    <motion.div
                        initial={{ left: '0%' }}
                        animate={{ left: '100%' }}
                        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                        className="absolute top-0 bottom-0 w-[150px] -skew-x-[15deg] z-[50] pointer-events-none flex justify-center items-center"
                    >
                        {/* More intense PURE RED glow to be visible over the dark cards */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/90 to-transparent blur-[20px]"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/60 to-transparent blur-[8px]"></div>
                    </motion.div>

                    {/* The Cards Grid */}
                    <div className="grid md:grid-cols-3 gap-6 relative z-10">
                        {/* Card 1: Client Identity */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative flex flex-col justify-center h-full w-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] hover:border-red-500/50 hover:-translate-y-2 group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:to-transparent transition-colors duration-500 pointer-events-none z-[2]"></div>
                            {/* Interactive Border Glow */}
                            <div className="absolute inset-0 border-[2px] border-transparent group-hover:border-red-500/30 rounded-[2rem] transition-all duration-500 z-[3] pointer-events-none"></div>

                            <div className="relative z-10 flex flex-row items-center justify-start gap-5 w-full h-full">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-red-600/20 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all">
                                    <Globe size={24} className="text-gray-400 group-hover:text-red-400 transition-colors" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-gray-500 font-mono text-[10px] tracking-widest uppercase group-hover:text-red-300 transition-colors block mb-1">Client Identity</span>
                                    <p className="text-xl md:text-2xl font-bold text-white tracking-wide">{project.client}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2: Dev Timeline */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative flex flex-col justify-center h-full w-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] hover:border-red-500/50 hover:-translate-y-2 group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:to-transparent transition-colors duration-500 pointer-events-none z-[2]"></div>
                            {/* Interactive Border Glow */}
                            <div className="absolute inset-0 border-[2px] border-transparent group-hover:border-red-500/30 rounded-[2rem] transition-all duration-500 z-[3] pointer-events-none"></div>

                            <div className="relative z-10 flex flex-row items-center justify-start gap-5 w-full h-full">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-red-600/20 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all">
                                    <Monitor size={24} className="text-gray-400 group-hover:text-red-400 transition-colors" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-gray-500 font-mono text-[10px] tracking-widest uppercase group-hover:text-red-300 transition-colors block mb-1">Dev Timeline</span>
                                    <p className="text-xl md:text-2xl font-bold text-white tracking-wide">{project.duration}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 3: Primary Role */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative flex flex-col justify-center h-full w-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] hover:border-red-500/50 hover:-translate-y-2 group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:to-transparent transition-colors duration-500 pointer-events-none z-[2]"></div>
                            {/* Interactive Border Glow */}
                            <div className="absolute inset-0 border-[2px] border-transparent group-hover:border-red-500/30 rounded-[2rem] transition-all duration-500 z-[3] pointer-events-none"></div>

                            <div className="relative z-10 flex flex-row items-center justify-start gap-5 w-full h-full">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-red-600/20 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all">
                                    <Shield size={24} className="text-gray-400 group-hover:text-red-400 transition-colors" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-gray-500 font-mono text-[10px] tracking-widest uppercase group-hover:text-red-300 transition-colors block mb-1">Primary Role</span>
                                    <p className="text-xl md:text-2xl font-bold text-white tracking-wide">{project.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Key Features Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-black/60 border border-white/10 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] group/section"
                >
                    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none group-hover/section:bg-red-600/20 transition-colors duration-1000"></div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 relative z-10 border-b border-white/10 pb-8">
                        <div className="flex items-center gap-5">
                            <div className="h-14 w-2 bg-gradient-to-b from-red-500 to-red-800 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.6)]"></div>
                            <div>
                                <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
                                    System Capabilities
                                </h3>
                                <p className="text-gray-500 font-mono text-sm">ARCHITECTURAL_HIGHLIGHTS</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                        {project.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-red-500/60 hover:bg-gradient-to-r hover:from-red-900/20 hover:to-transparent transition-all duration-300 group shadow-lg hover:shadow-[0_10px_30px_rgba(220,38,38,0.15)] hover:scale-[1.02] cursor-default">
                                <div className="mt-0.5 bg-black border border-white/10 text-red-500/70 p-2.5 rounded-xl group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] group-hover:-rotate-12 transition-all duration-300 shadow-md">
                                    <Check size={20} strokeWidth={3} />
                                </div>
                                <p className="text-gray-300 font-medium text-lg pt-1 group-hover:text-white transition-colors duration-300">{feature}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 flex justify-center relative z-10">
                        <button className="group relative px-10 py-5 bg-gradient-to-r from-red-600 to-red-800 text-white font-black tracking-widest text-sm rounded-full overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] transition-all transform hover:-translate-y-1 ring-1 ring-red-500/50">
                            <span className="relative z-10 flex items-center gap-3">
                                INITIATE SIMILAR BUILD <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                            </span>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full ease-in-out"></div>
                        </button>
                    </div>
                </motion.div>

            </div>
            <Footer />
        </div>
    );
};

export default ProjectDetail;