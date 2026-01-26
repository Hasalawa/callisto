import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Terminal, Cpu, Shield, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ParticleBackground, RevealOnScroll } from '../components/Shared';
import Footer from '../components/Footer';

const ServiceDetail = ({ serviceId, onBack }) => {
    const [loading, setLoading] = useState(true); // Loading state එක

    useEffect(() => {
        // Page එකට ආපු ගමන් උඩට Scroll වෙන්න
        window.scrollTo(0, 0);

        // Preloader එක තත්පර 2ක් පෙන්නන්න
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const getServiceData = (id) => {
        const data = {
            'web-systems': { title: "Enterprise Web Systems", desc: "Building scalable, high-performance web applications using React, Node.js, and Cloud Tech." },
            'mobile-apps': { title: "Next-Gen Mobile Apps", desc: "Native and cross-platform mobile solutions for iOS and Android." },
            'cyber-security': { title: "Cyber Security", desc: "Advanced threat protection, penetration testing, and security audits." },
            'ai-solutions': { title: "AI & Machine Learning", desc: "Intelligent automation and predictive analytics for your business." },
            'cloud-infra': { title: "Cloud Infrastructure", desc: "Scalable cloud solutions on AWS, Azure, and Google Cloud." },
            'custom-soft': { title: "Custom Software", desc: "Tailor-made software solutions to fit your exact business needs." }
        };
        return data[id] || { title: "Service Detail", desc: "Details about our premium service." };
    };

    const service = getServiceData(serviceId);

    // --- PRELOADER ---
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

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 relative overflow-hidden font-sans">
            <ParticleBackground />
            
            <div className="fixed inset-0 pointer-events-none z-[10] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"></div>

            <div className="max-w-7xl mx-auto mb-12 relative z-20">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors group font-mono text-sm mb-8">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> &lt; RETURN_HOME /&gt;
                </button>

                {/* Header Animation */}
                <RevealOnScroll>
                    <div className="mb-16">
                        <span className="text-red-500 font-mono text-sm tracking-widest uppercase mb-2 block">/// Service Protocol</span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase">{service.title}</h1>
                        <p className="text-xl text-gray-400 max-w-3xl border-l-4 border-red-600 pl-6">{service.desc}</p>
                    </div>
                </RevealOnScroll>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="col-span-2 space-y-8">
                        {/* Capabilities Animation */}
                        <RevealOnScroll delay={0.1}>
                            <div className="bg-neutral-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
                                <h3 className="text-2xl font-bold mb-6 text-white">System Capabilities</h3>
                                <ul className="space-y-4">
                                    {['High Scalability Architecture', '24/7 Real-time Monitoring', 'Advanced Encryption Standard', 'Custom API Integration'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center text-red-500"><Check size={14}/></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </RevealOnScroll>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Feature Card 1 Animation */}
                            <RevealOnScroll delay={0.2}>
                                <div className="bg-neutral-900/50 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:border-red-600/50 transition-colors h-full">
                                    <div className="p-3 bg-red-600/10 rounded-lg text-red-500"><Terminal size={24}/></div>
                                    <div><h4 className="font-bold">Clean Code</h4><p className="text-xs text-gray-500">Optimized Performance</p></div>
                                </div>
                            </RevealOnScroll>

                            {/* Feature Card 2 Animation */}
                            <RevealOnScroll delay={0.3}>
                                <div className="bg-neutral-900/50 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:border-red-600/50 transition-colors h-full">
                                    <div className="p-3 bg-red-600/10 rounded-lg text-red-500"><Shield size={24}/></div>
                                    <div><h4 className="font-bold">Secure</h4><p className="text-xs text-gray-500">Enterprise Grade</p></div>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>

                    {/* CTA Card Animation */}
                    <div className="h-full">
                        <RevealOnScroll delay={0.4}>
                            <div className="bg-neutral-900/80 border border-white/10 p-8 rounded-3xl h-full flex flex-col justify-center">
                                <h3 className="text-xl font-bold mb-4">Start Project</h3>
                                <p className="text-gray-400 text-sm mb-6">Initialize a new instance of this service for your company.</p>
                                <button className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all">
                                    DEPLOY NOW <ArrowUpRight size={18}/>
                                </button>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ServiceDetail;