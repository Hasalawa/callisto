import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, Activity, Wifi, HardDrive, AlertTriangle } from 'lucide-react';
import { ParticleBackground } from '../components/Shared';

const PlatformPage = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 relative overflow-hidden">
            <ParticleBackground />
            
            {/* Top Bar */}
            <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/> Back to Home
                </button>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full text-red-500 text-xs font-mono animate-pulse">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span> LIVE CONNECTION
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase">Command Center</h1>
                    <p className="text-gray-400 max-w-2xl">Real-time system analytics and security monitoring dashboard. Access restricted to authorized personnel only.</p>
                </motion.div>

                {/* Dashboard Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="col-span-2 bg-neutral-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20"><BarChart3 size={100} /></div>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Activity className="text-red-500"/> System Traffic</h3>
                        <div className="h-48 flex items-end gap-2">
                            {[40, 65, 30, 80, 55, 90, 70, 45, 60, 85, 95, 75].map((h, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ height: 0 }} 
                                    animate={{ height: `${h}%` }} 
                                    transition={{ duration: 1, delay: i * 0.05 }}
                                    className="flex-1 bg-gradient-to-t from-red-900 to-red-600 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Wifi className="text-red-500"/> Network Status</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <span className="text-gray-400">Latency</span>
                                <span className="text-green-400 font-mono">24ms</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <span className="text-gray-400">Upload</span>
                                <span className="text-white font-mono">850 MB/s</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Download</span>
                                <span className="text-white font-mono">1.2 GB/s</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><HardDrive className="text-red-500"/> Server Load</h3>
                        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                            <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-t-red-600 border-r-red-600 border-b-transparent border-l-transparent rounded-full rotate-45"></div>
                            <div className="text-center">
                                <span className="block text-3xl font-black">42%</span>
                                <span className="text-xs text-gray-500">OPTIMAL</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="col-span-2 bg-neutral-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><AlertTriangle className="text-red-500"/> Recent Threats Blocked</h3>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="text-gray-500 border-b border-white/10">
                                    <th className="pb-3">Type</th>
                                    <th className="pb-3">Origin</th>
                                    <th className="pb-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="font-mono">
                                <tr className="border-b border-white/5">
                                    <td className="py-3 text-white">SQL Injection</td>
                                    <td className="py-3 text-gray-400">192.168.X.X</td>
                                    <td className="py-3 text-red-500">BLOCKED</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-3 text-white">DDoS Attempt</td>
                                    <td className="py-3 text-gray-400">Unknown Proxy</td>
                                    <td className="py-3 text-red-500">MITIGATED</td>
                                </tr>
                                <tr>
                                    <td className="py-3 text-white">XSS Attack</td>
                                    <td className="py-3 text-gray-400">10.0.0.12</td>
                                    <td className="py-3 text-red-500">BLOCKED</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlatformPage;