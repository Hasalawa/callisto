import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, Code, Globe, Layout, Smartphone, Database, Shield, Monitor, Layers, Cpu, Server } from 'lucide-react';
import { ParticleBackground } from '../components/Shared';
import Footer from '../components/Footer';

// --- UTILITY: CRT SCANLINE OVERLAY ---
const ScanlineOverlay = () => (
    <div className="fixed inset-0 pointer-events-none z-[50] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%] opacity-20 mix-blend-overlay"></div>
);

const ProjectDetail = ({ projectId, onBack }) => {
    const [loading, setLoading] = useState(true);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, [projectId]);

    // Data for each project (Matching the IDs from ThreeDCarousel)
    const getProjectData = (id) => {
        const projects = {
            'e-buy': {
                title: "E-BUY",
                category: "E-Commerce Platform",
                client: "Retail Corp Ltd.",
                duration: "3 Months",
                role: "Full-stack Development",
                tech: ["PHP", "JavaScript", "MySQL", "Bootstrap", "RESTful APIs"],
                overview: "E-Buy is a comprehensive electronic goods e-commerce platform designed to handle high-volume transactions. It features a dynamic cart management system, secure payment gateway integrations, and a custom admin dashboard for real-time inventory tracking.",
                features: ["Real-time Inventory Sync", "Secure Stripe Checkout", "Dynamic Cart Management", "Admin Analytics Dashboard"],
                images: ["https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200"],
                accentColor: "from-blue-600 to-indigo-600"
            },
            'chatme': {
                title: "ChatMe",
                category: "Messaging Application",
                client: "StartUp Inc.",
                duration: "4 Months",
                role: "Mobile App Development",
                tech: ["React Native", "TypeScript", "Java", "WebSockets", "MySQL"],
                overview: "A cross-platform mobile messaging application engineered for seamless real-time communication. ChatMe utilizes WebSockets for instant message delivery, end-to-end encryption for security, and a highly responsive UI built with React Native.",
                features: ["Real-time Messaging (WebSockets)", "End-to-End Encryption", "Media File Sharing", "Push Notifications"],
                images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"],
                accentColor: "from-purple-600 to-pink-600"
            },
            'smart-auto-bot': {
                title: "Smart Auto-Bot",
                category: "Hardware & IoT",
                client: "Tech Education Board",
                duration: "2 Months",
                role: "Embedded Systems & UI",
                tech: ["Arduino", "C++", "Java Swing", "Bluetooth Serial"],
                overview: "An autonomous, obstacle-avoiding robotic vehicle integrated with a custom Java-based desktop control interface. The system allows users to manually override the robot's autonomous mode via a Bluetooth connection for precision control and sensor data monitoring.",
                features: ["Ultrasonic Obstacle Avoidance", "Bluetooth Telemetry", "Java Desktop Controller", "Real-time Sensor Graphing"],
                images: ["https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&q=80&w=1200"],
                accentColor: "from-green-600 to-emerald-600"
            },
            'airnet': {
                title: "AIRNET",
                category: "Entertainment Portal",
                client: "MediaStream LLC",
                duration: "5 Months",
                role: "Web Architecture",
                tech: ["Java EE", "HTML5/CSS3", "JavaScript", "MySQL", "AWS S3"],
                overview: "A high-performance Java web platform designed for streaming multimedia content. AIRNET allows content creators to monetize their videos while providing users with a buffer-free, subscription-based viewing experience with adaptive bitrate streaming.",
                features: ["Adaptive Bitrate Streaming", "Creator Monetization Tools", "Subscription Management", "Cloud Video Hosting (AWS)"],
                images: ["https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200"],
                accentColor: "from-red-600 to-orange-600"
            },
            'mega-market-pos': {
                title: "Mega Market POS",
                category: "Retail Management",
                client: "Mega Supermarkets",
                duration: "6 Months",
                role: "Desktop Software Dev",
                tech: ["Java SE", "Java Swing", "MySQL", "JasperReports"],
                overview: "A robust, offline-first Java desktop application engineered for high-traffic supermarket checkouts. The system handles complex inventory logic, multi-currency payments, barcode scanner integration, and generates dynamic daily sales reports.",
                features: ["Offline-First Architecture", "Barcode Scanner Integration", "Dynamic Report Generation", "Multi-Tier Access Control"],
                images: ["https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200"],
                accentColor: "from-teal-600 to-cyan-600"
            },
            'nexway': {
                title: "NexWay",
                category: "Ride-Hailing System",
                client: "Transit Solutions",
                duration: "8 Months",
                role: "Android & Backend Core",
                tech: ["Java Android", "Spring Boot", "Firebase", "Google Maps API"],
                overview: "An on-demand transportation platform featuring dedicated apps for drivers and passengers. The system relies on a Spring Boot backend and Google Maps APIs to provide real-time driver tracking, route optimization, and fare estimation algorithms.",
                features: ["Live GPS Tracking", "Dynamic Fare Calculation", "Driver/Passenger Matchmaking", "In-App Wallet System"],
                images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1200"],
                accentColor: "from-yellow-500 to-orange-500"
            },
            'cbc-banking-system': {
                title: "CBC Banking System",
                category: "Enterprise Finance",
                client: "Commercial Bank Corp",
                duration: "12 Months",
                role: "Core Banking Arch",
                tech: ["Java Core", "Swing", "MySQL (Encrypted)", "Biometric SDK"],
                overview: "A highly secure, end-to-end desktop banking solution managing teller operations, loan processing, and customer accounts. A standout feature is the integration of biometric fingerprint scanners for strict employee attendance and transaction authorization.",
                features: ["Biometric Authentication", "AES-256 Data Encryption", "Automated Loan Processing", "Audit Trail Logging"],
                images: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200"],
                accentColor: "from-slate-600 to-zinc-600"
            },
            'pinkie': {
                title: "Pinkie",
                category: "Luxury E-Commerce",
                client: "Pinkie Jewelers",
                duration: "3 Months",
                role: "Web Application Dev",
                tech: ["Java", "Hibernate", "MySQL", "Bootstrap"],
                overview: "An elegant, visually driven e-commerce platform built specifically for a premium jewelry brand. Built on a robust Java and Hibernate backend, it ensures smooth product filtering, high-resolution image handling, and secure, encrypted checkouts.",
                features: ["Advanced Product Filtering", "Secure Checkout Gateway", "Wishlist Functionality", "Admin Order Management"],
                images: ["https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1200"],
                accentColor: "from-rose-500 to-pink-500"
            }
        };

        // Fallback if ID is not found
        return projects[id] || {
            title: "Project Not Found",
            category: "Unknown",
            client: "N/A",
            duration: "N/A",
            role: "N/A",
            tech: ["Unknown"],
            overview: "The requested project details could not be loaded. Please return to the portfolio.",
            features: [],
            images: ["https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"],
            accentColor: "from-gray-600 to-gray-800"
        };
    };

    const project = getProjectData(projectId);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black z-[999] flex items-center justify-center flex-col text-center">
                <div className="relative flex items-center justify-center mb-6">
                    <div className="absolute w-28 h-28 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
                    <img src="/logo.png" alt="Loading" className="w-16 h-auto animate-pulse rounded-full" />
                </div>
                <h2 className="text-white font-black text-2xl tracking-widest uppercase">DECRYPTING FILE</h2>
                <p className="text-red-500 font-mono text-xs mt-2 tracking-[0.2em] animate-pulse">ACCESSING PROJECT ARCHIVE...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 relative font-sans">
            <ScanlineOverlay />
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-red-600 z-[100] origin-left" style={{ scaleX }} />
            <ParticleBackground />

            <div className="max-w-7xl mx-auto mb-20 relative z-20 mt-8">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onBack}
                    className="relative flex items-center gap-2 text-gray-400 transition-colors group font-mono text-sm mb-10 border border-white/5 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm overflow-hidden hover:text-red-500 hover:border-red-500/30"
                >
                    <motion.div className="absolute inset-0 bg-red-600/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform relative z-10" />
                    <span className="relative z-10">RETURN_TO_PORTFOLIO</span>
                </motion.button>

                {/* Hero Section */}
                <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="inline-block px-3 py-1 bg-red-900/30 border border-red-500/30 rounded-full text-red-500 font-mono text-xs tracking-widest uppercase">
                            {project.category}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none text-white">
                            {project.title}
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-red-600 pl-4">
                            {project.overview}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-4">
                            {project.tech.map((t, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-gray-300">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7 relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                            {/* Color Overlay Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-tr ${project.accentColor} mix-blend-overlay opacity-20 group-hover:opacity-10 transition-opacity duration-500 z-10`}></div>
                            <img src={project.images[0]} alt={project.title} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />

                            {/* Decorative Tech Overlay Elements */}
                            <div className="absolute top-4 right-4 z-20 flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent z-20 font-mono text-[10px] text-gray-400">
                                IMG_SRC: {projectId.toUpperCase()}_SYS_ARCHIVE
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Project Details Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-neutral-900/50 border border-white/5 p-6 rounded-2xl">
                        <span className="text-gray-500 font-mono text-xs uppercase block mb-2">Client</span>
                        <p className="text-xl font-bold text-white">{project.client}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-neutral-900/50 border border-white/5 p-6 rounded-2xl">
                        <span className="text-gray-500 font-mono text-xs uppercase block mb-2">Timeline</span>
                        <p className="text-xl font-bold text-white">{project.duration}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-neutral-900/50 border border-white/5 p-6 rounded-2xl">
                        <span className="text-gray-500 font-mono text-xs uppercase block mb-2">Primary Role</span>
                        <p className="text-xl font-bold text-white">{project.role}</p>
                    </motion.div>
                </div>

                {/* Key Features Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-neutral-900/30 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

                    <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <Monitor className="text-red-500" /> Core System Features
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {project.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-red-500/30 transition-colors">
                                <div className="mt-1 bg-red-600/20 text-red-500 p-1 rounded">
                                    <Check size={16} strokeWidth={3} />
                                </div>
                                <p className="text-gray-300 font-medium">{feature}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-center">
                        <button className="group relative px-8 py-4 bg-red-600 text-white font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all">
                            <span className="relative z-10 flex items-center gap-2">
                                REQUEST SIMILAR PROJECT <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                </motion.div>

            </div>
            <Footer />
        </div>
    );
};

export default ProjectDetail;