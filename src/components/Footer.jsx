import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Youtube, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Globe, ShieldCheck } from 'lucide-react';

const Footer = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="bg-[#050505] pt-24 pb-10 border-t border-white/5 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-900/5 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Top Animated Line */}
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
                >
                    {/* Column 1: Brand Info */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            {/* නව Animation එක සහිත Logo කොටස */}
                            <motion.div
                                whileHover={{
                                    scale: 1.1,
                                    filter: "drop-shadow(0 0 15px rgba(220, 38, 38, 0.8))"
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10
                                }}
                                className="relative"
                            >
                                <img
                                    src="/logo.png"
                                    alt="Callisto Logo"
                                    className="h-14 w-auto rounded-full ring-2 ring-red-600/20 group-hover:ring-red-600 transition-all duration-500"
                                />
                                {/* Logo එක පිටුපසින් එන සියුම් Pulse Effect එක */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 bg-red-600/20 rounded-full -z-10 group-hover:bg-red-600/40"
                                />
                            </motion.div>

                            <div className="leading-tight">
                                <span className="block text-3xl font-black text-white tracking-tighter">CALLISTO</span>
                                <span className="text-[10px] text-red-500 font-mono uppercase tracking-[0.3em]">Cyber Infrastructure</span>
                            </div>
                        </div>

                        <div className="max-w-md">
                            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontSize: "16px" }}>Callisto Software Solution (Pvt) Ltd.</p>
                            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontWeight: "300" }}>
                                Architecting the future of enterprise software. We deliver
                                <span className="text-red-400 font-medium"> precision-engineered solutions</span> with a focus on <span className="text-white border-b border-gray-700"> high-scale performance</span> and
                                <span className="text-white border-b border-gray-700"> military-grade cybersecurity.</span>
                            </p>
                        </div>

                        {/* Social Icons with Hover Effect */}
                        <div className="flex gap-4">
                            {[
                                { Icon: Linkedin, link: "https://www.linkedin.com/company/callistosoftwaresolution/" },
                                { Icon: Facebook, link: "https://www.facebook.com/CallistoSoftwareSolution" },
                                { Icon: Instagram, link: "https://www.instagram.com/callisto_software_solution?igsh=c2ExbmpxZDl2dGZn" },
                                { Icon: Youtube, link: "#" },
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg shadow-black/50"
                                >
                                    <item.Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Column 2: Services */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-red-600"></span>
                            Solutions
                        </h3>
                        <ul className="space-y-4">
                            {['Web Development', 'Mobile Applications', 'Cyber Security', 'Cloud Solutions', 'AI Integration', 'UI/UX Design'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-red-500 transition-all duration-300 text-sm flex items-center gap-2 group">
                                        <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3: Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-red-600"></span>
                            Ecosystem
                        </h3>
                        <ul className="space-y-4">
                            {['About Us', 'Our Process', 'Client Portfolios', 'Career Openings', 'Privacy Policy', 'Terms of Service'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-red-500 transition-all duration-300 text-sm flex items-center gap-2 group">
                                        <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 4: Contact & Newsletter */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-red-600"></span>
                            Stay Synced
                        </h3>
                        <div className="space-y-4 mb-8">
                            <a href="mailto:hello@callisto.lk" className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-red-600/10"><Mail size={16} /></div>
                                <span className="text-sm">callistosoftwaresolution@gmail.com</span>
                            </a>
                            <a href="tel:+94712345678" className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-red-600/10"><Phone size={16} /></div>
                                <span className="text-sm">+94 74 072 9268</span>
                            </a>
                            <div className="flex items-center gap-3 text-gray-400 group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-red-600/10"><MapPin size={16} /></div>
                                <span className="text-sm">Matara, Sri Lanka</span>
                            </div>
                        </div>

                        {/* Newsletter Input */}
                        <div>
                            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Subscribe to Newsletter</p>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="Enter your email address..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-4 text-sm text-white focus:outline-none focus:border-red-600/50 transition-colors focus:ring-1 focus:ring-red-600/20 placeholder:text-gray-700"
                                />
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute right-2 top-2 bottom-2 px-3 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                                >
                                    <ArrowRight size={16} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <div className="flex items-center gap-6">
                        <p className="text-gray-600 text-[12px] font-mono tracking-wider">
                            © 2024 CALLISTO SOFTWARE SOLUTION (PVT) LTD.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 text-gray-600 text-[10px] uppercase tracking-[0.2em]">
                            <ShieldCheck size={14} className="text-green-500/50" />
                            <span>Encrypted Connection</span>
                        </div>
                        <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
                        <div className="flex items-center gap-2 text-gray-600 text-[10px] uppercase tracking-[0.2em] group cursor-pointer hover:text-red-500 transition-colors">
                            <Globe size={14} />
                            <span>Developed by Callisto Team</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;