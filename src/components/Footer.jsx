import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
        {/* Top Decorative Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>

        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* Column 1: Brand Info */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Callisto Logo" className="h-12 w-auto rounded-full opacity-90" />
                        <div className="leading-tight">
                            <span className="block text-2xl font-bold text-white tracking-tight">CALLISTO</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Software Solution</span>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Callisto Software Solution (Pvt) Ltd. <br/>
                        Innovating through code. We engineer digital dominance through AI-driven software and military-grade cybersecurity.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Icons with Hover Effect */}
                        {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Column 2: Services */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                        <span className="w-1 h-4 bg-red-600 rounded-full"></span> Services
                    </h3>
                    <ul className="space-y-3">
                        {['Web Development', 'Mobile Applications', 'Cyber Security', 'Cloud Solutions', 'AI Integration', 'UI/UX Design'].map((item) => (
                            <li key={item}>
                                <a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Quick Links */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                        <span className="w-1 h-4 bg-red-600 rounded-full"></span> Company
                    </h3>
                    <ul className="space-y-3">
                        {['About Us', 'Our Process', 'Portfolio', 'Careers', 'Privacy Policy', 'Terms of Service'].map((item) => (
                            <li key={item}>
                                <a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 4: Contact & Newsletter */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                        <span className="w-1 h-4 bg-red-600 rounded-full"></span> Connect
                    </h3>
                    <div className="space-y-4 mb-8">
                        <a href="mailto:hello@callisto.lk" className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors group">
                            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-red-600/10"><Mail size={16} /></div>
                            <span className="text-sm">hello@callisto.lk</span>
                        </a>
                        <a href="tel:+94712345678" className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors group">
                            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-red-600/10"><Phone size={16} /></div>
                            <span className="text-sm">+94 71 234 5678</span>
                        </a>
                        <div className="flex items-center gap-3 text-gray-400 group">
                            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-red-600/10"><MapPin size={16} /></div>
                            <span className="text-sm">Matara, Sri Lanka</span>
                        </div>
                    </div>

                    {/* Newsletter Input */}
                    <div>
                        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Subscribe to Newsletter</p>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-gray-600"
                            />
                            <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-red-600 rounded-md text-white hover:bg-red-700 transition-colors">
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-xs">
                    © 2024 Callisto Software Solution (Pvt) Ltd. All Rights Reserved.
                </p>
                <div className="flex items-center gap-2 text-gray-700 text-xs">
                    <Globe size={12} />
                    <span>Designed & Developed by Callisto Team</span>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;