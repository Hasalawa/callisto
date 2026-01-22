import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowLeft, Activity, Wifi, HardDrive, AlertTriangle, Shield, Globe, Cpu, Zap, Crosshair, ArrowUp, ArrowDown, Database, Clock } from 'lucide-react';
import { ParticleBackground } from '../components/Shared';
import Footer from '../components/Footer';

// --- HELPER: REVEAL ON SCROLL COMPONENT ---
const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-10%" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
            className={className} // Added className prop to handle height
        >
            {children}
        </motion.div>
    );
};

// --- COMPONENT 1: SMOOTH SCROLLING CANVAS GRAPH ---
const LiveTrafficGraph = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const pointCount = 60;
        const speed = 1.5;
        const data = Array.from({ length: pointCount + 2 }, () => Math.random() * 50 + 20);

        let offset = 0;
        let stepWidth = 0;

        const resize = () => {
            if (containerRef.current && canvas) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                const dpr = window.devicePixelRatio || 1;
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                ctx.scale(dpr, dpr);
                stepWidth = width / (pointCount - 1);
            }
        };

        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();

            offset -= speed;
            if (offset <= -stepWidth) {
                offset += stepWidth;
                data.shift();
                data.push(Math.random() * 60 + 20);
            }

            ctx.clearRect(0, 0, width, height);

            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, "rgba(220, 38, 38, 0.6)");
            gradient.addColorStop(1, "rgba(220, 38, 38, 0.05)");

            ctx.beginPath();
            ctx.moveTo(0, height);

            for (let i = 0; i < data.length; i++) {
                const x = (i * stepWidth) + offset;
                const y = height - ((data[i] / 100) * height);

                if (i === 0) {
                    ctx.lineTo(x, y);
                } else {
                    const prevX = ((i - 1) * stepWidth) + offset;
                    const prevY = height - ((data[i - 1] / 100) * height);
                    const cx = (prevX + x) / 2;
                    const cy = (prevY + y) / 2;
                    ctx.quadraticCurveTo(prevX, prevY, cx, cy);
                    if (i === data.length - 1) {
                        ctx.lineTo(x, y);
                    }
                }
            }

            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.beginPath();
            for (let i = 0; i < data.length; i++) {
                const x = (i * stepWidth) + offset;
                const y = height - ((data[i] / 100) * height);
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    const prevX = ((i - 1) * stepWidth) + offset;
                    const prevY = height - ((data[i - 1] / 100) * height);
                    const cx = (prevX + x) / 2;
                    const cy = (prevY + y) / 2;
                    ctx.quadraticCurveTo(prevX, prevY, cx, cy);
                    if (i === data.length - 1) {
                        ctx.lineTo(x, y);
                    }
                }
            }
            ctx.strokeStyle = "#dc2626";
            ctx.lineWidth = 2;
            ctx.shadowColor = "#dc2626";
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-48 overflow-hidden rounded-xl bg-black/40 border border-white/5">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
            <canvas ref={canvasRef} className="block w-full h-full" />
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[10px] text-red-500 font-mono tracking-widest">LIVE FEED</span>
            </div>
        </div>
    );
};

// --- COMPONENT 2: ANIMATED NETWORK STATUS ---
const NetworkStatus = () => {
    const [stats, setStats] = useState({ latency: 24, upload: 850, download: 1.2 });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats({
                latency: Math.floor(Math.random() * (30 - 15) + 15),
                upload: Math.floor(Math.random() * (900 - 800) + 800),
                download: (Math.random() * (1.5 - 1.1) + 1.1).toFixed(1)
            });
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md h-full flex flex-col justify-between hover:border-red-600/30 transition-colors">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Wifi className="text-red-500" /> Network Status
            </h3>
            {/* Added flex-1 and justify-around to space elements evenly */}
            <div className="flex-1 flex flex-col justify-around py-2">
                <div className="group">
                    <div className="flex justify-between items-center pb-1">
                        <span className="text-gray-400 text-sm">Latency</span>
                        <span className="text-green-400 font-mono text-lg">{stats.latency}ms</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-green-500"
                            animate={{ width: `${(stats.latency / 50) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <div className="group">
                    <div className="flex justify-between items-center pb-1">
                        <span className="text-gray-400 text-sm flex items-center gap-1"><ArrowUp size={14} /> Upload</span>
                        <span className="text-white font-mono text-lg">{stats.upload} MB/s</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-red-500"
                            animate={{ width: `${(stats.upload / 1000) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <div className="group">
                    <div className="flex justify-between items-center pb-1">
                        <span className="text-gray-400 text-sm flex items-center gap-1"><ArrowDown size={14} /> Download</span>
                        <span className="text-white font-mono text-lg">{stats.download} GB/s</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-500"
                            animate={{ width: `${(stats.download / 2) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- COMPONENT 3: CYBER RADAR (NODES ACTIVE) ---
const CyberRadar = () => {
    return (
        <div className="bg-neutral-900/40 border border-white/10 rounded-xl p-6 backdrop-blur-md flex flex-col relative overflow-hidden hover:border-red-600/30 transition-colors h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 to-transparent"></div>

            <h3 className="text-sm font-bold text-gray-200 mb-2 z-10 flex items-center gap-2">
                <Crosshair size={16} className="text-red-500" /> ACTIVE NODES
            </h3>

            <div className="flex-1 flex flex-col items-center justify-center z-10">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <div className="absolute inset-0 border border-white/5 rounded-full"></div>
                    <div className="absolute inset-4 border border-white/10 rounded-full"></div>
                    <div className="absolute inset-8 border border-white/5 rounded-full"></div>
                    <div className="absolute inset-0 rounded-full animate-[spin_3s_linear_infinite] bg-gradient-to-t from-transparent via-transparent to-red-600/20 border-t border-red-600/50"></div>
                    <div className="absolute top-4 right-8 w-1 h-1 bg-red-500 rounded-full animate-ping"></div>
                    <div className="absolute bottom-8 left-10 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-700"></div>
                    <div className="relative z-10 bg-black/80 p-2 rounded-full border border-red-600/30">
                        <Globe size={20} className="text-red-500" />
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-2xl font-bold text-white">1,024</p>
                    <p className="text-[10px] text-green-500">NODES SECURED</p>
                </div>
            </div>
        </div>
    )
}

// --- COMPONENT 4: SERVER HEALTH GAUGE ---
const ServerLoadGauge = () => {
    const [load, setLoad] = useState(42);
    useEffect(() => {
        const interval = setInterval(() => { setLoad(Math.floor(Math.random() * 30) + 30); }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-md hover:border-red-600/30 transition-colors h-full flex flex-col justify-between">
            <h3 className="text-sm font-bold mb-2 flex items-center gap-2 text-gray-200"><HardDrive size={16} className="text-red-500" /> CORE HEALTH</h3>

            <div className="relative w-48 h-48 mx-auto flex items-center justify-center my-2">
                <div className="absolute inset-0 border-4 border-white/5 rounded-full"></div>
                <motion.svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" stroke="#171717" strokeWidth="8" fill="none" />
                    <motion.circle cx="50" cy="50" r="46" stroke="#dc2626" strokeWidth="4" fill="none" strokeDasharray="290"
                        animate={{ strokeDashoffset: 290 - (290 * load) / 100 }} transition={{ duration: 1.5, ease: "easeInOut" }} strokeLinecap="round" />
                </motion.svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Cpu size={28} className="text-gray-500 mb-1" />
                    <motion.span className="block text-4xl font-black text-white">{load}%</motion.span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-center p-2 bg-black/40 rounded border border-white/5">
                    <span className="block text-gray-500 text-[9px]">TEMP</span>
                    <span className="text-white font-mono text-sm">42°C</span>
                </div>
                <div className="text-center p-2 bg-black/40 rounded border border-white/5">
                    <span className="block text-gray-500 text-[9px]">FAN</span>
                    <span className="text-white font-mono text-sm">2400</span>
                </div>
            </div>
        </div>
    );
};

// --- COMPONENT 5: MEMORY MATRIX ---
const MemoryMatrix = () => {
    const [blocks, setBlocks] = useState(Array(25).fill(false));

    useEffect(() => {
        const interval = setInterval(() => {
            setBlocks(prev => prev.map(() => Math.random() > 0.6));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-md hover:border-red-600/30 transition-colors h-full flex flex-col">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-gray-200"><Database size={16} className="text-red-500" /> MEMORY CLUSTER</h3>
            <div className="flex-1 grid grid-cols-5 gap-2 content-center">
                {blocks.map((active, i) => (
                    <motion.div
                        key={i}
                        animate={{ backgroundColor: active ? '#dc2626' : '#1a1a1a', opacity: active ? 1 : 0.3 }}
                        className="aspect-square rounded-sm"
                    />
                ))}
            </div>
            <div className="mt-4 flex justify-between text-[10px] font-mono text-gray-500">
                <span>ALLOCATED: 64%</span>
                <span>FREE: 12GB</span>
            </div>
        </div>
    )
}

// --- COMPONENT 6: LIVE THREAT LOG ---
const LiveThreatLog = () => {
    const [logs, setLogs] = useState([
        { id: 1, type: "SQL Injection", ip: "192.168.4.22", status: "BLOCKED", time: "Now" },
        { id: 2, type: "XSS Attempt", ip: "45.22.11.90", status: "BLOCKED", time: "2s ago" },
        { id: 3, type: "Brute Force", ip: "10.0.0.5", status: "MITIGATED", time: "5s ago" },
    ]);

    useEffect(() => {
        const types = ["DDoS Attack", "Malware", "Phishing", "SQL Injection", "Port Scan"];
        const ips = ["172.16.0.1", "10.20.30.40", "192.168.1.1", "8.8.8.8", "Unknown Proxy"];
        const interval = setInterval(() => {
            const newLog = {
                id: Date.now(),
                type: types[Math.floor(Math.random() * types.length)],
                ip: ips[Math.floor(Math.random() * ips.length)],
                status: "BLOCKED",
                time: "Just now"
            };
            setLogs(prev => [newLog, ...prev.slice(0, 4)]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full overflow-hidden">
            <div className="grid grid-cols-4 text-xs text-gray-500 border-b border-white/10 pb-2 mb-2 font-mono uppercase tracking-wider">
                <span>Threat</span>
                <span>Origin</span>
                <span>Status</span>
                <span className="text-right">Time</span>
            </div>
            <div className="space-y-1">
                <AnimatePresence mode='popLayout'>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-4 text-sm font-mono border-b border-white/5 pb-2 pt-1 items-center"
                        >
                            <span className="text-white truncate pr-2">{log.type}</span>
                            <span className="text-gray-400 truncate pr-2">{log.ip}</span>
                            <span className="text-red-500 font-bold text-xs bg-red-900/10 px-2 py-0.5 rounded w-fit">{log.status}</span>
                            <span className="text-gray-600 text-right text-xs">{log.time}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- MAIN PLATFORM PAGE ---
const PlatformPage = ({ onBack }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const seconds = currentTime.toLocaleTimeString('en-US', { second: '2-digit' });

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

            <div className="fixed inset-0 pointer-events-none z-[50] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"></div>
            <div className="fixed top-0 left-0 w-full h-1 bg-white/5 blur-md animate-[scan_6s_linear_infinite] pointer-events-none z-[50]"></div>

            {/* --- 1. TOP BAR --- */}
            <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 border-b border-white/10 pb-6">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors group font-mono text-sm">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> &lt; DISCONNECT_SESSION /&gt;
                </button>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 px-4 py-1.5 bg-black border border-red-600/50 rounded-sm text-red-500 text-xs font-mono shadow-[0_0_10px_rgba(220,38,38,0.3)]">
                        <Activity size={12} className="animate-pulse" />
                        SECURE_CHANNEL: ENCRYPTED
                    </div>

                    <div className="flex items-center gap-3 px-4 py-2 bg-green-950/20 border border-green-500/30 rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.1)] backdrop-blur-sm">
                        <Clock size={16} className="text-green-500" />
                        <div className="font-mono font-bold text-green-400 text-sm tracking-widest flex items-center gap-1">
                            <span>{hours.split(':')[0]}</span>
                            <span className="animate-pulse">:</span>
                            <span>{hours.split(':')[1]}</span>
                            <span className="text-green-600 text-xs pl-1">{seconds}</span>
                        </div>
                    </div>

                    <div className="text-xs font-mono text-gray-500">v4.2.0-secure</div>
                </div>
            </div>

            {/* --- 2. HEADER SECTION --- */}
            <div className="max-w-7xl mx-auto mb-12 flex items-center gap-6 relative z-10">
                <div className="relative flex items-center justify-center w-20 h-20 group flex-shrink-0">
                    <div className="absolute inset-0 rounded-full border border-red-600/30 border-t-red-500 animate-[spin_4s_linear_infinite]"></div>
                    <div className="absolute inset-2 rounded-full border border-red-600/20 border-b-red-500 animate-[spin_3s_linear_infinite_reverse]"></div>
                    <div className="relative w-14 h-14 bg-black rounded-full border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.5)] overflow-hidden flex items-center justify-center">
                        <img src="/logo.png" alt="Callisto Logo" className="w-full h-full object-cover opacity-90" />
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter font-sans drop-shadow-[0_2px_4px_rgba(220,38,38,0.5)]">
                        COMMAND CENTER
                    </h1>
                    <p className="text-red-400 font-mono text-xs tracking-[0.2em] uppercase relative top-[1px] flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        Callisto Software Solutions
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 pb-20">

                {/* --- ROW 1: TRAFFIC GRAPH + NETWORK STATUS (Equal Height Fix) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Main Traffic Monitor */}
                    <div className="col-span-1 md:col-span-2">
                        <RevealOnScroll className="h-full">
                            <div className="bg-neutral-900/40 border border-white/10 rounded-xl p-6 backdrop-blur-md relative overflow-hidden group h-full flex flex-col justify-between">
                                <div className="absolute top-0 right-0 p-2 opacity-50"><Zap className="text-red-600" size={20} /></div>
                                <div>
                                    <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
                                        <span className="w-1.5 h-4 bg-red-600"></span>
                                        <h3 className="text-lg font-bold text-gray-200">GLOBAL NETWORK TRAFFIC</h3>
                                    </div>
                                    <LiveTrafficGraph />
                                </div>
                                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                                    <div className="bg-black/40 p-2 rounded border border-white/5"><p className="text-[10px] text-gray-500">PACKETS</p><p className="text-lg font-mono font-bold text-white">4.2M/s</p></div>
                                    <div className="bg-black/40 p-2 rounded border border-white/5"><p className="text-[10px] text-gray-500">BANDWIDTH</p><p className="text-lg font-mono font-bold text-white">12 GB</p></div>
                                    <div className="bg-black/40 p-2 rounded border border-white/5"><p className="text-[10px] text-gray-500">LOAD</p><p className="text-lg font-mono font-bold text-red-500">84%</p></div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Network Status (Fixed Height to match Graph) */}
                    <div className="col-span-1">
                        <RevealOnScroll delay={0.1} className="h-full">
                            <NetworkStatus />
                        </RevealOnScroll>
                    </div>
                </div>

                {/* --- ROW 2 --- */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <RevealOnScroll delay={0.2}><CyberRadar /></RevealOnScroll>
                    <RevealOnScroll delay={0.3}><ServerLoadGauge /></RevealOnScroll>
                    <RevealOnScroll delay={0.4}><MemoryMatrix /></RevealOnScroll>
                </div>

                {/* --- ROW 3 --- */}
                <RevealOnScroll delay={0.5}>
                    <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden hover:border-red-600/30 transition-colors">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2"><Shield className="text-red-500" /> Firewall Logs</h3>
                            <button className="text-xs text-red-500 border border-red-500/30 px-3 py-1 rounded hover:bg-red-500/10 transition-colors">EXPORT LOGS</button>
                        </div>
                        <LiveThreatLog />
                    </div>
                </RevealOnScroll>

            </div>

            <Footer />

            <style jsx>{`
                @keyframes scan { 0% { top: -10%; opacity: 0; } 50% { opacity: 1; } 100% { top: 110%; opacity: 0; } }
            `}</style>
        </div>
    );
};

export default PlatformPage;