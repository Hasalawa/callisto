import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Shield, Server, Globe, Database, Smartphone, Code, Cpu, Lock, Zap, Layers, Linkedin, Github, Twitter, Mail, Send, MapPin, Phone, Check, Star, User, Terminal, Wifi } from 'lucide-react';
import { ParticleBackground, RevealOnScroll, HackerText, HeroGraphic, AccordionItem } from '../components/Shared';
// Import all specific components from the new file
import { CyberServiceCard, ThreeDCarousel, InfiniteLogos, ProcessStep, TeamMember, Counter, PricingCard } from '../components/PageComponents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
                            <button onClick={() => navigateTo('platform')} className="mt-10 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all flex items-center gap-2 group">
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
            <section className="py-20 px-6 border-b border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    <Counter from={0} to={85} label="Projects" />
                    <Counter from={0} to={12} label="Countries" />
                    <Counter from={0} to={99} label="Satisfaction" />
                    <Counter from={0} to={24} label="Support (Hrs)" />
                </div>
            </section>

            {/* --- SERVICES --- */}
            <section id="services" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="mb-20">
                            <span className="text-red-500 font-mono text-sm tracking-widest uppercase">/// System Capabilities</span>
                            <h2 className="text-4xl md:text-6xl font-bold mt-4">CORE SERVICES</h2>
                        </div>
                    </RevealOnScroll>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Globe,
                                title: "Enterprise Web Systems",
                                desc: "High-performance, scalable web platforms built with React.js, Laravel, and Java architectures for complex business needs."
                            },
                            {
                                icon: Smartphone,
                                title: "Next-Gen Mobile Apps",
                                desc: "Seamless cross-platform and native Android experiences using React Native to ensure dominance in the mobile market."
                            },
                            {
                                icon: Terminal,
                                title: "Custom Software & Desktop",
                                desc: "Robust Java-based desktop applications and tailored software solutions engineered to automate your unique business logic."
                            },
                            {
                                icon: Wifi,
                                title: "Industrial IoT Solutions",
                                desc: "Bridging hardware and cloud ecosystems for real-time remote monitoring, smart control, and data-driven connectivity."
                            },
                            {
                                icon: Cpu,
                                title: "AI & Machine Learning",
                                desc: "Integrating intelligent algorithms to transform raw data into predictive insights and automated decision-making systems."
                            },
                            {
                                icon: Shield,
                                title: "Cyber Security",
                                desc: "Military-grade vulnerability assessment, penetration testing, and digital fortification to protect your sensitive data."
                            }
                        ].map((service, idx) => (
                            <RevealOnScroll key={idx} delay={idx * 0.1}>
                                <CyberServiceCard index={idx} icon={service.icon} title={service.title} desc={service.desc} />
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PROCESS --- */}
            <section id="process" className="py-32 px-6 bg-neutral-900/30">
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
            <section id="projects" className="py-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <h2 className="text-5xl font-black mb-2 text-center">FEATURED WORK</h2>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.2}>
                        <ThreeDCarousel />
                    </RevealOnScroll>
                </div>
            </section>

            {/* --- PRICING --- */}
            <section id="pricing" className="py-32 px-6 bg-neutral-900/20">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="mb-20 text-center">
                            <span className="text-red-500 font-mono text-sm tracking-widest uppercase">/// Investment</span>
                            <h2 className="text-4xl md:text-5xl font-black mt-4">PRICING PLANS</h2>
                            <p className="text-gray-400 mt-4">Transparent pricing for world-class engineering.</p>
                        </div>
                    </RevealOnScroll>

                    <div className="grid md:grid-cols-3 gap-8">
                        <RevealOnScroll delay={0.1}>
                            <PricingCard
                                title="Startup"
                                price="1,500"
                                features={["Single Page Application", "Basic SEO Setup", "1 Month Support", "Mobile Responsive"]}
                            />
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.2}>
                            <PricingCard
                                title="Business"
                                price="3,500"
                                recommended={true}
                                features={["Multi-page Web App", "CMS Integration", "Advanced Security", "3 Months Support", "API Integration"]}
                            />
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.3}>
                            <PricingCard
                                title="Enterprise"
                                price="Custom"
                                features={["Full SaaS Platform", "AI & ML Integration", "Cloud Architecture", "24/7 Dedicated Support", "Audited Security"]}
                            />
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIALS --- */}
            <section id="testimonials" className="py-32 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <h2 className="text-4xl font-black mb-16 text-center">CLIENT VOICES</h2>
                    </RevealOnScroll>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { name: "John Carter", company: "CEO, TechFlow", text: "Callisto's security audit saved us from a potential breach. Their attention to detail is unmatched in the industry." },
                            { name: "Sarah Williams", company: "Director, InnovateX", text: "The team delivered our AI platform weeks ahead of schedule. The code quality and performance are world-class." }
                        ].map((t, i) => (
                            <RevealOnScroll key={i} delay={i * 0.1}>
                                <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl relative">
                                    <div className="absolute top-[-15px] left-8 bg-red-600 text-white p-2 rounded-full"><Star size={20} fill="currentColor" /></div>
                                    <p className="text-gray-300 italic mb-6 text-lg">"{t.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><User /></div>
                                        <div>
                                            <h4 className="font-bold text-white">{t.name}</h4>
                                            <p className="text-red-500 text-sm">{t.company}</p>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TEAM --- */}
            <section id="team" className="py-32 px-6 bg-neutral-900/20 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="mb-20 text-center">
                            <span className="text-red-500 font-mono text-sm tracking-widest uppercase">/// The Squad</span>
                            <h2 className="text-4xl md:text-5xl font-black mt-4">MEET THE MINDS</h2>
                            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">The elite engineers and strategists behind Callisto's digital dominance.</p>
                        </div>
                    </RevealOnScroll>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Kehan Hasalawa", role: "Founder / CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" },
                            { name: "Sarah Jenkins", role: "CTO", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
                            { name: "David Ross", role: "Lead Architect", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800" },
                            { name: "Emily Chen", role: "Security Analyst", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800" }
                        ].map((member, idx) => (
                            <RevealOnScroll key={idx} delay={idx * 0.1}>
                                <TeamMember {...member} />
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FAQ --- */}
            <section id="faq" className="py-32 px-6 bg-neutral-900 border-y border-white/10">
                <div className="max-w-3xl mx-auto">
                    <RevealOnScroll>
                        <h2 className="text-4xl font-bold mb-12 text-center">FREQUENTLY ASKED</h2>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.1}><AccordionItem question="How much does a custom software project cost?" answer="Project costs vary depending on complexity. We offer flexible pricing models starting from small business packages to enterprise solutions. Contact us for a free quote." /></RevealOnScroll>
                    <RevealOnScroll delay={0.2}><AccordionItem question="Do you provide ongoing support?" answer="Yes, we offer 12 months of free maintenance for every project we build, including security patches and bug fixes." /></RevealOnScroll>
                    <RevealOnScroll delay={0.3}><AccordionItem question="How long does development take?" answer="A standard website takes 2-4 weeks, while complex mobile apps or software systems can take 3-6 months depending on requirements." /></RevealOnScroll>
                </div>
            </section>

            {/* --- CONTACT --- */}
            <section id="contact" className="py-32 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-red-900/5 -z-10 skew-y-3 transform origin-top-left"></div>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <RevealOnScroll>
                        <h2 className="text-5xl font-black mb-6">READY TO <br /><span className="text-red-600">START?</span></h2>
                        <p className="text-gray-400 text-lg mb-8">Reach out to us for a consultation. Whether it's a new project or a security audit, we are here to help.</p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-red-500"><Phone /></div>
                                <div><p className="text-sm text-gray-500">Call Us</p><p className="font-bold text-lg">+94 71 234 5678</p></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-red-500"><Mail /></div>
                                <div><p className="text-sm text-gray-500">Email Us</p><p className="font-bold text-lg">hello@callisto.lk</p></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-red-500"><MapPin /></div>
                                <div><p className="text-sm text-gray-500">Visit Us</p><p className="font-bold text-lg">Colombo, Sri Lanka</p></div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2}>
                        <div className="bg-neutral-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Name" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition-colors text-white" />
                                    <input type="text" placeholder="Company" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition-colors text-white" />
                                </div>
                                <input type="email" placeholder="Email Address" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition-colors text-white" />
                                <select className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition-colors text-gray-400">
                                    <option>Select Service</option>
                                    <option>Web Development</option>
                                    <option>Cyber Security</option>
                                    <option>Mobile App</option>
                                </select>
                                <textarea rows="4" placeholder="Tell us about your project" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition-colors text-white"></textarea>
                                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all">
                                    SEND MESSAGE <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;