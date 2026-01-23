import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = ({ isMenuOpen, setIsMenuOpen, navLinks, setIsHovering }) => {
    return (
        <>
            <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <img src="/logo.png" alt="Logo" className="h-12 w-auto rounded-full" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-lg tracking-tight leading-none text-white mb-1">CALLISTO</h1>
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
                                className="text-2xl text-white hover:text-red-600 transition-colors tracking-tighter"
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
        </>
    );
};

export default Navbar;