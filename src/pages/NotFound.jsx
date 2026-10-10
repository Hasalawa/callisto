import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Terminal } from 'lucide-react';
import { ParticleBackground, HackerText } from '../components/Shared';

const MAX_PATH_LENGTH = 80;

// Shown when the visitor opens an address that does not exist on this site.
// `path` is the address they typed, `onHome` takes them back to the home page.
const NotFound = ({ path = '', onHome }) => {
    // Very long addresses would break the layout, so cut them.
    const shownPath = path.length > MAX_PATH_LENGTH ? `${path.slice(0, MAX_PATH_LENGTH)}...` : path;

    // Give the browser tab a clear title while this page is shown, and restore it afterwards.
    useEffect(() => {
        const previousTitle = document.title;
        document.title = 'Page not found | Callisto';
        return () => { document.title = previousTitle; };
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden font-sans selection:bg-red-600 selection:text-white flex items-center justify-center px-6 py-16">
            <ParticleBackground />

            {/* Red hologram grid, same look as the project pages */}
            <div
                className="fixed inset-0 pointer-events-none z-[0] opacity-30 mix-blend-screen"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(220, 38, 38, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                }}
            />

            <motion.main
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-2xl text-center"
            >
                {/* Status chip (decorative) */}
                <div
                    aria-hidden="true"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black/60 border border-red-500/50 rounded-lg backdrop-blur-sm shadow-[0_0_15px_rgba(220,38,38,0.15)]"
                >
                    <AlertTriangle size={14} className="text-red-500" />
                    <span className="font-mono text-[10px] md:text-xs text-red-100 tracking-[0.2em] uppercase font-bold">
                        <HackerText text="SIGNAL LOST" />
                    </span>
                </div>

                {/* Big 404 (decorative, the real heading is below) */}
                <p
                    aria-hidden="true"
                    className="mt-6 text-[7rem] md:text-[11rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.35)]"
                >
                    404
                </p>

                <h1 className="mt-2 text-3xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    Page not found
                </h1>

                <p className="mt-4 text-gray-400 text-base md:text-lg max-w-md mx-auto">
                    The address you typed does not exist on this site. It may have been mistyped or moved.
                </p>

                {/* Terminal-style readout of the address that was not found */}
                <div className="mt-8 mx-auto max-w-md text-left bg-black/60 border border-red-500/30 rounded-xl backdrop-blur-xl px-5 py-4 font-mono text-xs md:text-sm shadow-[0_0_30px_rgba(220,38,38,0.12)]">
                    <div className="flex items-center gap-2 text-red-500/80 text-[10px] tracking-widest uppercase mb-3">
                        <Terminal size={12} />
                        <span>route.log</span>
                    </div>
                    <p className="text-gray-300 break-all">
                        <span className="text-red-500">&gt; </span>GET {shownPath || '/'}
                    </p>
                    <p className="text-gray-500 mt-1">&gt; 404 // ROUTE NOT FOUND</p>
                </div>

                <button
                    type="button"
                    onClick={onHome}
                    className="relative mt-10 inline-flex items-center gap-3 text-gray-300 transition-all group font-mono text-sm border border-white/10 px-6 py-3 rounded-xl bg-black/60 backdrop-blur-xl overflow-hidden hover:text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:-translate-y-0.5 focus:outline-none focus-visible:border-red-500 focus-visible:text-white"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-red-500 group-hover:text-white" />
                    <span className="tracking-widest font-bold">RETURN HOME</span>
                </button>
            </motion.main>
        </div>
    );
};

export default NotFound;
