import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowLeft, Check, Terminal, Cpu, Shield, ArrowUpRight,
    Activity, Server, Smartphone, Zap, Code, Layers,
    GitBranch, Database, Lock, ChevronDown, Clock, Globe, Quote, Wifi,
    Star, TrendingUp, ShieldCheck, MousePointer2, Box,
    Send, Mail, X, User, Building2, Sparkles, CheckCircle2, AlertCircle
} from 'lucide-react';
import {
    motion, AnimatePresence, useScroll, useSpring,
    useMotionValue, useMotionTemplate, useTransform
} from 'framer-motion';
import { ParticleBackground } from '../components/Shared';
import Footer from '../components/Footer';
import { LoadingScreen } from '../components/PageComponents';

// --- UTILITY: CRT SCANLINE OVERLAY ---
const ScanlineOverlay = () => (
    <div className="fixed inset-0 pointer-events-none z-[50] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%] opacity-20 mix-blend-overlay"></div>
);

// --- UTILITY: SCRAMBLE TEXT EFFECT ---
const ScrambleText = ({ text, className }) => {
    const [display, setDisplay] = useState(text);
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/";

    const scramble = () => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                text.split("").map((letter, index) => {
                    if (index < iterations) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
    };

    useEffect(() => {
        scramble();
    }, []);

    return (
        <span onMouseEnter={scramble} className={className}>
            {display}
        </span>
    );
};

// --- UTILITY: MAGNETIC BUTTON ---
const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.3);
        y.set((clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.button>
    );
};

// --- UTILITY: TYPEWRITER CODE EFFECT ---
const TypewriterCode = ({ code }) => {
    const [displayedCode, setDisplayedCode] = useState("");

    useEffect(() => {
        let i = 0;
        setDisplayedCode("");
        const interval = setInterval(() => {
            setDisplayedCode((prev) => prev + code.charAt(i));
            i++;
            if (i >= code.length) clearInterval(interval);
        }, 20);
        return () => clearInterval(interval);
    }, [code]);

    return <span>{displayedCode}<span className="animate-pulse text-red-500">_</span></span>;
};

// --- UTILITY: 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className={className}
        >
            <div style={{ transform: "translateZ(20px)" }}>{children}</div>
        </motion.div>
    );
};

// --- VARIANTS FOR STAGGERED TITLE REVEAL ---
const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.03, delayChildren: 0.3 }
    }
};

const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 90 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { type: "spring", damping: 12, stiffness: 100 }
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/10 last:border-0">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex items-center justify-between text-left group">
                <span className="text-lg font-medium text-gray-200 group-hover:text-red-500 transition-colors">{question}</span>
                <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-500' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="pb-6 text-base text-gray-400 leading-relaxed pl-4 border-l-2 border-red-600/20 w-full">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const AnimatedCounter = ({ value, duration = 2 }) => {
    const [count, setCount] = useState("0");
    useEffect(() => {
        let start = 0;
        const end = parseFloat(value.replace(/[^0-9.]/g, ''));
        const suffix = value.replace(/[0-9.]/g, '');
        if (start === end) return;
        let incrementTime = (duration * 1000 / end) * 10;
        if (incrementTime < 10) incrementTime = 10;
        let timer = setInterval(() => {
            start += 0.1;
            const currentString = end % 1 !== 0 ? start.toFixed(1) : Math.floor(start).toString();
            setCount(currentString + suffix);
            if (start >= end) { clearInterval(timer); setCount(value); }
        }, incrementTime);
        return () => clearInterval(timer);
    }, [value, duration]);
    return <span>{count}</span>;
};

const ServiceDetail = ({ serviceId, onBack }) => {
    const [loading, setLoading] = useState(true);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Parallax
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

    // Spotlight Effect Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(220, 38, 38, 0.08), transparent 40%)`;

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const getServiceData = (id) => {
        const data = {
            'web-systems': {
                title: "Enterprise Web Systems",
                desc: "High-performance, scalable web platforms built with React.js, Laravel, and Java architectures for complex business needs.",
                stats: [{ label: "Uptime", val: "99.9%" }, { label: "Performance", val: "<100ms" }],
                icon: Globe,
                tech: ["React.js", "Laravel", "Java Spring", "PostgreSQL"],
                codeSnippet: `class EnterprisePlatform extends WebArchitecture {\n  constructor() {\n    this.frontend = "React.js";\n    this.backend = ["Laravel", "Java"];\n    this.db = "PostgreSQL";\n  }\n  deploy() {\n    return this.scale("horizontal");\n  }\n}`,
                faqs: [
                    { q: "Why use a hybrid of React, Laravel, and Java?", a: "This hybrid approach allows us to leverage the specific strengths of each technology. React ensures a blazing-fast, highly interactive frontend user experience that feels like a native app. Laravel provides rapid development for standard backend logic, while Java Spring Boot handles heavy-duty enterprise processing tasks and multi-threading, ensuring unmatched stability and scalability for your most critical business operations." },
                    { q: "How scalable is the system for future growth?", a: "Our architecture is built on a modular microservices pattern, which allows for infinite horizontal scalability. By decoupling the frontend from the backend services, we can independently scale server resources based on traffic demands. Whether you have 100 users today or 10 million tomorrow, the system can expand dynamically without requiring a complete rewrite." },
                    { q: "How do you handle database security and backups?", a: "We implement defense-in-depth security strategies for all databases. This includes AES-256 encryption for data at rest and TLS 1.3 for data in transit. We also configure automated, redundant backups that are stored in geographically isolated locations, ensuring that your data can be fully restored to any point in time in the event of a critical failure." }
                ],
                clientQuote: "The combination of React's speed and Java's reliability completely transformed our business workflow."
            },
            'mobile-apps': {
                title: "Next-Gen Mobile Apps",
                desc: "Seamless cross-platform and native Android experiences using React Native to ensure dominance in the mobile market.",
                stats: [{ label: "Code Reuse", val: "90%" }, { label: "Performance", val: "60 FPS" }],
                icon: Smartphone,
                tech: ["React Native", "Android SDK", "Redux", "Firebase"],
                codeSnippet: `const MobileExperience = () => {\n  const [platform] = usePlatform();\n  \n  return (\n    <NativeView renderTo={platform}>\n      <SeamlessPerformance fps={60} />\n    </NativeView>\n  );\n}`,
                faqs: [
                    { q: "Why choose React Native over pure Native development?", a: "React Native allows us to build high-quality applications for both Android and iOS using a single unified codebase. This strategy reduces development time and costs by approximately 40% compared to building separate native apps. However, because it renders to native components, you still get the smooth performance and look-and-feel of a purely native application." },
                    { q: "Can you implement complex hardware features like Bluetooth or NFC?", a: "Absolutely. While React Native handles the UI and logic, we possess deep expertise in the Native Android SDK and iOS Bridge technologies. If your application requires direct access to specific hardware sensors, Bluetooth Low Energy (BLE), or NFC, we write custom native modules to bridge that gap seamlessly without compromising performance." },
                    { q: "How do you handle App Store and Play Store submissions?", a: "We manage the entire end-to-end submission process for you, which can often be complex. This includes ensuring strict compliance with Apple's Human Interface Guidelines and Google's Material Design standards to prevent rejections. We also handle certificate management, provisioning profiles, and metadata optimization to ensure a smooth launch." }
                ],
                clientQuote: "Our app performs flawlessly on every device. The React Native solution was a game-changer."
            },
            'custom-soft': {
                title: "Custom Software & Desktop",
                desc: "Robust Java-based desktop applications and tailored software solutions engineered to automate your unique business logic.",
                stats: [{ label: "Automation", val: "100%" }, { label: "Stability", val: "High" }],
                icon: Terminal,
                tech: ["Java SE", "JavaFX", "Swing", "MySQL"],
                codeSnippet: `public class CustomSolution {\n  public void automateWorkflow() {\n    // Tailored business logic\n    BusinessLogic logic = new BusinessLogic();\n    logic.optimize("Java Core");\n    System.out.println("Efficiency Max");\n  }\n}`,
                faqs: [
                    { q: "Why is Java the preferred choice for desktop applications?", a: "Java is the industry gold standard for enterprise desktop applications due to its 'Write Once, Run Anywhere' capability. It offers exceptional stability, superior memory management, and multi-threading support, making it ideal for complex, resource-intensive tasks that web applications simply cannot handle efficiently." },
                    { q: "Can this software operate in an offline environment?", a: "Yes, fully offline capability is a primary advantage of our custom desktop solutions. We design systems with robust local databases (like MySQL or SQLite) that allow your team to continue working without interruption during internet outages. Data is then automatically synchronized with the cloud once connectivity is restored." },
                    { q: "Can you integrate the software with legacy hardware?", a: "Certainly. Our Java-based solutions are engineered with high interoperability in mind. We can write custom drivers and API wrappers to communicate directly with legacy mainframes, industrial barcode scanners, manufacturing machinery, or proprietary hardware interfaces that modern off-the-shelf software often fails to detect." }
                ],
                clientQuote: "The custom Java software automated hours of manual data entry for us. Rock-solid and reliable."
            },
            'iot-solutions': {
                title: "Industrial IoT Solutions",
                desc: "Bridging hardware and cloud ecosystems for real-time remote monitoring, smart control, and data-driven connectivity.",
                stats: [{ label: "Latency", val: "<50ms" }, { label: "Devices", val: "Unlimited" }],
                icon: Wifi,
                tech: ["MQTT", "AWS IoT", "C++", "Python"],
                codeSnippet: `void setup() {\n  // Initialize IoT Sensors\n  IoT.connect(SSID, PASSWORD);\n  Sensor.begin(9600);\n}\n\nvoid loop() {\n  Data packet = Sensor.read();\n  Cloud.publish("industrial/monitor", packet);\n}`,
                faqs: [
                    { q: "How does the real-time remote monitoring architecture work?", a: "We connect your industrial hardware sensors to the cloud using lightweight, low-latency protocols like MQTT. This transmits operational data in milliseconds to a central dashboard, allowing you to monitor critical metrics like temperature, pressure, machine health, and production output from anywhere in the world instantly." },
                    { q: "What security measures protect the IoT network?", a: "Security is the backbone of our IoT solutions. We implement device-level authentication using X.509 certificates and ensure all data transmission is encrypted via TLS 1.2+. This prevents unauthorized devices from connecting to your network and ensures that your sensitive operational data remains tamper-proof." },
                    { q: "What happens if the internet connection is lost at the factory?", a: "Our system is designed with edge computing resilience. The local gateway devices are programmed to buffer data locally during internet outages. Once connectivity is restored, the system automatically transmits the stored data to the cloud in chronological order, ensuring zero data loss and maintaining the integrity of your historical analytics." }
                ],
                clientQuote: "Real-time monitoring of our factory floor has reduced downtime by 25%."
            },
            'ai-solutions': {
                title: "AI & Machine Learning",
                desc: "Integrating intelligent algorithms to transform raw data into predictive insights and automated decision-making systems.",
                stats: [{ label: "Accuracy", val: "98.5%" }, { label: "Processing", val: "Real-time" }],
                icon: Cpu,
                tech: ["TensorFlow", "PyTorch", "Python", "Pandas"],
                codeSnippet: `model = Sequential()\nmodel.add(Dense(64, activation='relu'))\n\n# Train predictive model\nmodel.fit(data, labels, epochs=100)\n\nprediction = model.predict(new_data)\nreturn prediction`,
                faqs: [
                    { q: "How can AI practically improve my business decision-making?", a: "Our AI models analyze vast amounts of historical and real-time data to identify hidden patterns that human analysis might miss. By predicting future trends—such as inventory demand, equipment failure, or customer churn—we empower you to make proactive, data-driven decisions that directly impact your bottom line." },
                    { q: "Do I need a massive dataset to get started with AI?", a: "Not necessarily. While more data improves accuracy, we utilize techniques like Transfer Learning to leverage existing pre-trained models and fine-tune them for your specific niche. This allows us to deliver valuable predictive insights even with smaller initial datasets, which improves as your data grows." },
                    { q: "Is the AI model transparent and free from bias?", a: "We prioritize 'Explainable AI' (XAI) in our development process. Instead of a 'black box,' we design models that provide reasoning behind their predictions. We also rigorously test datasets for inherent biases during the training phase to ensure that the automated decisions are fair, ethical, and reliable for your business context." }
                ],
                clientQuote: "The predictive insights provided by the AI model allowed us to optimize stock levels perfectly."
            },
            'cyber-security': {
                title: "Cyber Security",
                desc: "Military-grade vulnerability assessment, penetration testing, and digital fortification to protect your sensitive data.",
                stats: [{ label: "Threats Blocked", val: "24/7" }, { label: "Encryption", val: "AES-256" }],
                icon: Shield,
                tech: ["Kali Linux", "Metasploit", "Wireshark", "Python"],
                codeSnippet: `if (vulnerabilityDetected) {\n  Firewall.activeBlock(ip);\n  Log.incident("Critical", timestamp);\n  Notify.admin("Breach Attempt Blocked");\n} else {\n  Monitor.continue();\n}`,
                faqs: [
                    { q: "What is included in a comprehensive vulnerability assessment?", a: "Our assessment covers your entire digital footprint. We scan your networks, servers, web applications, and APIs for known weaknesses. Using industry-standard tools like Kali Linux and Metasploit, we identify outdated software, weak configurations, and open ports, providing you with a prioritized roadmap to fix them before hackers exploit them." },
                    { q: "How often should we perform penetration testing?", a: "We strongly recommend conducting a full penetration test at least annually, or immediately after any significant changes to your infrastructure. Regular testing ensures that new features haven't introduced security loopholes and that your defenses remain robust against the constantly evolving landscape of cyber threats." },
                    { q: "What is your incident response protocol if a breach occurs?", a: "We believe in proactive preparation. We help you establish a dedicated Incident Response Plan (IRP). In the event of a detected threat, our systems trigger immediate containment protocols to isolate affected segments, followed by forensic analysis to identify the source, and a rapid recovery process to restore operations with minimal downtime." }
                ],
                clientQuote: "We finally sleep soundly knowing our sensitive client data is protected by top-tier security protocols."
            }
        };
        const defaultData = { title: "Service Detail", desc: "Premium tech solution.", stats: [], icon: Terminal, tech: [], codeSnippet: "// Loading...", faqs: [], clientQuote: "Excellent service." };
        return { ...defaultData, ...(data[id] || {}) };
    };

    const service = getServiceData(serviceId);
    const ServiceIcon = service.icon;

    // --- DEPLOYMENT MODAL & ALERT STATES ---
    const [showDeployAlert, setShowDeployAlert] = useState(false);
    const [showDeployModal, setShowDeployModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [status, setStatus] = useState(''); // 'loading' | 'success' | 'error' | ''
    const [errorMessage, setErrorMessage] = useState('');
    const alertTimeoutRef = useRef(null);

    const servicesList = [
        "Enterprise Web Systems",
        "Next-Gen Mobile Apps",
        "Custom Software & Desktop",
        "Industrial IoT Solutions",
        "AI & Machine Learning",
        "Cyber Security"
    ];

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        service: service.title,
        message: ''
    });

    useEffect(() => {
        setFormData(prev => ({ ...prev, service: service.title }));
    }, [service.title]);

    useEffect(() => {
        document.body.style.overflow = showDeployModal ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [showDeployModal]);

    useEffect(() => {
        return () => {
            if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
        };
    }, []);

    const handleInitiateDeploy = () => {
        if (showDeployAlert || showDeployModal) return;

        setFormData(prev => ({ ...prev, service: service.title }));
        setStatus('');
        setErrorMessage('');
        setShowDeployAlert(true);

        alertTimeoutRef.current = setTimeout(() => {
            setShowDeployAlert(false);
            setShowDeployModal(true);
        }, 2000);
    };

    const handleCloseModal = () => {
        setShowDeployModal(false);
        setShowConfirm(false);
        setStatus('');
        setErrorMessage('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(String(email).toLowerCase())) return false;

        const typoDomains = [
            'gail.com', 'gamil.com', 'gnail.com', 'gmaill.com', 'gmail.con', 'gmai.com',
            'yaho.com', 'yahhoo.com', 'yhoo.com',
            'outlok.com', 'outlook.con', 'hotmal.com'
        ];
        return !typoDomains.includes(email.split('@')[1].toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.company.trim() || !formData.email.trim() || !formData.service.trim() || !formData.message.trim()) {
            setStatus('error');
            setErrorMessage('All parameters are required. Please fill in the missing fields.');
            return;
        }
        if (!validateEmail(formData.email)) {
            setStatus('error');
            setErrorMessage('Please enter a valid, verified business email address.');
            return;
        }
        setErrorMessage('');
        setShowConfirm(true);
    };

    const confirmAndSend = async () => {
        setShowConfirm(false);
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', company: '', email: '', service: service.title, message: '' });
                setTimeout(() => {
                    setStatus('');
                    setShowDeployModal(false);
                }, 3000);
            } else {
                throw new Error('Transmission failed');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Deployment transmission failed. Please verify connection and retry.');
        }
    };

    if (loading) {
        return <LoadingScreen title="CALLISTO" subtitle="SERVICES INITIALIZING..." />;
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 relative overflow-hidden font-sans group/spotlight" onMouseMove={handleMouseMove}>

            <ScanlineOverlay />

            {/* --- DEPLOYMENT NOTIFICATION TOAST ALERT --- */}
            <AnimatePresence>
                {showDeployAlert && (
                    <motion.div
                        initial={{ opacity: 0, x: 60, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 60, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="fixed top-6 right-6 z-[160] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-red-500/40 p-5 rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.35)] w-[92%] max-w-sm overflow-hidden"
                    >
                        {/* Glowing top line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_rgba(220,38,38,0.8)]" />

                        <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/50 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                                <span className="animate-ping absolute inset-0 rounded-xl bg-red-500/30" />
                                <Cpu className="text-red-500 relative z-10 animate-pulse" size={22} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                                    <span className="text-[10px] font-mono text-red-500 font-bold tracking-[0.2em] uppercase">
                                        PROTOCOL ENGAGED
                                    </span>
                                </div>
                                <h4 className="text-white font-black text-sm tracking-wide uppercase truncate">
                                    DEPLOYMENT INITIALIZED
                                </h4>
                                <p className="text-gray-400 text-xs font-mono mt-0.5 truncate">
                                    Opening manifest for <span className="text-red-400 font-semibold">{service.title}</span>...
                                </p>
                            </div>
                        </div>

                        {/* Animated 2s countdown line */}
                        <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                            <span className="text-red-400/80 flex items-center gap-1.5">
                                <Zap size={11} className="text-red-500 animate-pulse" />
                                SYS_ROUTING // SECURE_SOCKET
                            </span>
                            <span className="text-gray-400">02s</span>
                        </div>
                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-1.5">
                            <motion.div
                                className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- NEXT-LEVEL SERVICE DEPLOYMENT POPUP MODAL --- */}
            <AnimatePresence>
                {showDeployModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
                        className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 25 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 25 }}
                            transition={{ type: "spring", damping: 25, stiffness: 220 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-red-500/20 p-6 md:p-10 rounded-[2.5rem] shadow-[0_0_80px_rgba(220,38,38,0.25)] relative overflow-hidden w-full max-w-2xl my-8 group/modal"
                        >
                            {/* Cyber ambient glow orbs */}
                            <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-600/15 rounded-full blur-[100px] pointer-events-none group-hover/modal:bg-red-600/25 transition-all duration-700" />
                            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

                            {/* Top glowing cyber accent line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_20px_rgba(220,38,38,0.8)]" />

                            {/* Modal Header */}
                            <div className="flex items-start justify-between mb-8 relative z-10 border-b border-white/5 pb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                        <span className="text-red-500 font-mono text-[10px] tracking-[0.25em] uppercase font-bold">
                                            /// DEPLOYMENT MANIFEST // SECURE TRANSMISSION
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-2.5 flex-wrap">
                                        DEPLOY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">{service.title}</span>
                                    </h3>
                                    <p className="text-gray-400 text-xs font-mono mt-1">
                                        Configure project scope, technical specifications, and delivery target.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-red-500/60 hover:bg-red-600/20 transition-all hover:rotate-90 duration-300 shadow-md shrink-0"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Email Confirmation Overlay */}
                            <AnimatePresence>
                                {showConfirm && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.94 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.94 }}
                                        className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/98 backdrop-blur-xl rounded-[2.5rem] p-6"
                                    >
                                        <div className="text-center p-8 border border-red-500/30 rounded-3xl bg-black/80 shadow-[0_0_50px_rgba(220,38,38,0.25)] max-w-md w-full relative overflow-hidden">
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                                            <div className="w-16 h-16 bg-red-950/60 border border-red-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                                                <ShieldCheck className="text-red-500" size={32} />
                                            </div>
                                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Authorize Transmission</h3>
                                            <p className="text-gray-300 mb-6 font-sans text-sm leading-relaxed">
                                                Verify your contact email address. Our engineering team will dispatch the deployment proposal here:<br />
                                                <span className="text-red-400 font-mono font-bold text-sm bg-red-950/60 border border-red-500/40 px-3.5 py-1.5 rounded-lg inline-block mt-3 tracking-wide break-all shadow-inner">
                                                    {formData.email}
                                                </span>
                                            </p>
                                            <div className="flex gap-4 justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirm(false)}
                                                    className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all font-sans text-xs font-semibold tracking-wider"
                                                >
                                                    ABORT / EDIT
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={confirmAndSend}
                                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] font-sans text-xs tracking-wider flex items-center gap-2"
                                                >
                                                    <Send size={14} /> AUTHORIZE & TRANSMIT
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-xs md:text-sm font-sans font-semibold text-gray-200 tracking-wide flex items-center gap-2">
                                            <User size={15} className="text-red-500" /> Client Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/50 transition-all font-sans text-sm"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-xs md:text-sm font-sans font-semibold text-gray-200 tracking-wide flex items-center gap-2">
                                            <Building2 size={15} className="text-red-500" /> Company / Organization
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/50 transition-all font-sans text-sm"
                                            placeholder="e.g. Acme Enterprises"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-xs md:text-sm font-sans font-semibold text-gray-200 tracking-wide flex items-center gap-2">
                                            <Mail size={15} className="text-red-500" /> Business Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/50 transition-all font-sans text-sm"
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-xs md:text-sm font-sans font-semibold text-gray-200 tracking-wide flex items-center gap-2">
                                            <Terminal size={15} className="text-red-500" /> Target Service
                                        </label>
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/50 transition-all font-sans text-sm appearance-none cursor-pointer"
                                        >
                                            <option value={service.title} className="bg-[#0a0a0a] text-white">
                                                {service.title} (Selected)
                                            </option>
                                            {servicesList
                                                .filter(s => s !== service.title)
                                                .map((srv, idx) => (
                                                    <option key={idx} value={srv} className="bg-[#0a0a0a] text-white">
                                                        {srv}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="text-xs md:text-sm font-sans font-semibold text-gray-200 tracking-wide flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Code size={15} className="text-red-500" /> Deployment Specifications & Goals
                                        </span>
                                        <span className="text-[11px] font-mono text-red-400/90 bg-red-950/50 border border-red-500/30 px-2 py-0.5 rounded font-normal">REQUIRED</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/50 transition-all resize-none font-sans text-sm"
                                        placeholder="Outline your technical requirements, expected user volume, desired deployment timeline, and key integration points..."
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3.5 bg-red-950/40 border border-red-500/40 rounded-xl text-red-400 text-xs font-mono flex items-center gap-3 shadow-inner"
                                    >
                                        <AlertCircle size={16} className="text-red-500 shrink-0" />
                                        <span>ERROR: {errorMessage}</span>
                                    </motion.div>
                                )}

                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-green-950/40 border border-green-500/40 rounded-xl text-green-400 text-xs font-mono flex items-center gap-3 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                                    >
                                        <CheckCircle2 size={18} className="text-green-500 shrink-0 animate-bounce" />
                                        <div>
                                            <p className="font-bold uppercase tracking-wider">DEPLOYMENT MANIFEST TRANSMITTED</p>
                                            <p className="text-gray-400 text-[11px] mt-0.5">We have received your specifications. Our lead engineer will contact you shortly.</p>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={`w-full group relative px-10 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-black tracking-widest text-sm rounded-xl overflow-hidden transition-all shadow-[0_0_30px_rgba(220,38,38,0.35)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] ring-1 ring-red-500/40 hover:ring-red-400 ${status === 'loading' ? 'opacity-75 cursor-wait' : ''}`}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            {status === 'loading' ? (
                                                <>
                                                    <Cpu size={18} className="animate-spin text-white" />
                                                    TRANSMITTING MANIFEST...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                                    TRANSMIT DEPLOYMENT MANIFEST
                                                </>
                                            )}
                                        </span>
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full ease-in-out"></div>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SPOTLIGHT & BACKGROUND */}
            <motion.div className="pointer-events-none fixed -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100 z-10" style={{ background: spotlightBackground }} />
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-red-600 z-[100] origin-left" style={{ scaleX }} />
            <ParticleBackground />

            {/* FLOATING BEAMS GRID EFFECT */}
            <div className="fixed inset-0 pointer-events-none z-[5] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20">
                <motion.div
                    className="absolute top-0 left-0 w-full h-[2px] bg-red-500/20 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* PARALLAX SHAPES */}
            <motion.div style={{ y: y1 }} className="fixed top-20 right-10 opacity-10 pointer-events-none z-0">
                <Box size={200} strokeWidth={0.5} className="text-red-600 animate-[spin_20s_linear_infinite]" />
            </motion.div>
            <motion.div style={{ y: y2 }} className="fixed bottom-40 left-10 opacity-5 pointer-events-none z-0">
                <Globe size={300} strokeWidth={0.5} className="text-gray-500 animate-[spin_30s_linear_infinite_reverse]" />
            </motion.div>

            {/* HEADER */}
            <div className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-2 bg-neutral-900/80 backdrop-blur-xl pl-2 pr-6 py-2 rounded-full border border-white/10 shadow-2xl">
                    <div className="relative flex items-center justify-center w-14 h-14 group flex-shrink-0">
                        <motion.div className="absolute inset-0 rounded-full border border-red-600/30 border-t-red-500" animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
                        <motion.div className="absolute inset-2 rounded-full border border-red-600/20 border-b-red-500" animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
                        <div className="relative w-9 h-9 bg-black rounded-full border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.5)] overflow-hidden flex items-center justify-center">
                            <img src="/logo.png" alt="Callisto Logo" className="w-full h-full object-cover opacity-90" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="font-black tracking-[0.2em] text-sm text-white leading-none mb-1.5">CALLISTO</span>
                        <span className="font-mono text-[9px] text-gray-400 tracking-widest leading-none opacity-80">SOFTWARE SOLUTION (PVT) LTD</span>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-3 bg-neutral-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                        <span className="text-[10px] font-mono text-green-500 font-bold tracking-widest">SYSTEM ONLINE</span>
                    </div>
                    <Wifi size={14} className="text-gray-500" />
                </div>
            </div>

            <motion.div className="max-w-7xl mx-auto mb-12 relative z-20 mt-16" variants={containerVariants} initial="hidden" animate="visible">
                {/* --- RETURN BUTTON --- */}
                <motion.button
                    variants={itemVariants}
                    onClick={onBack}
                    className="relative flex items-center gap-2 text-gray-400 transition-colors group font-mono text-sm mb-8 border border-white/5 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm overflow-hidden hover:text-red-500 hover:border-red-500/30"
                >
                    <motion.div
                        className="absolute inset-0 bg-red-600/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
                    />
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform relative z-10" />
                    <span className="relative z-10">RETURN_HOME</span>
                </motion.button>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-7 space-y-10">
                        <motion.div variants={itemVariants} className="relative pl-6 border-l-4 border-red-600">
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-4">
                                <div className="p-1.5 bg-red-600 rounded text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                                    <ServiceIcon size={18} />
                                </div>
                                <ScrambleText text={`/// SYSTEM PROTOCOL: ${serviceId}`} className="text-red-500 font-mono text-sm tracking-widest uppercase cursor-default" />
                            </motion.div>

                            {/* --- FIXED: WRAPPING WORDS + STAGGERED 3D REVEAL + GLITCH ON HOVER --- */}
                            <motion.h1
                                className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight leading-none text-white drop-shadow-xl block group"
                                variants={titleContainerVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover={{ x: [0, -2, 2, 0], transition: { repeat: Infinity, duration: 0.2 } }}
                            >
                                {service.title.split(" ").map((word, wordIndex) => (
                                    <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                                        {word.split("").map((char, charIndex) => (
                                            <motion.span
                                                key={charIndex}
                                                variants={letterVariants}
                                                className="inline-block relative z-10"
                                            >
                                                {/* Main Character */}
                                                <span className="relative z-10 inline-block">
                                                    {char}
                                                </span>
                                                {/* Glitch Layers (Moved inside per-char for correct wrapping) */}
                                                <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-600 opacity-0 group-hover:opacity-70 group-hover:-translate-x-1 mix-blend-screen animate-pulse">
                                                    {char}
                                                </span>
                                                <span className="absolute top-0 left-0 -z-10 w-full h-full text-blue-600 opacity-0 group-hover:opacity-70 group-hover:translate-x-1 mix-blend-screen animate-pulse">
                                                    {char}
                                                </span>
                                            </motion.span>
                                        ))}
                                    </span>
                                ))}
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-xl text-gray-400 leading-relaxed max-w-2xl">{service.desc}</motion.p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative group rounded-xl p-[1px] overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="bg-[#0f0f0f] rounded-xl overflow-hidden relative z-10 h-full">
                                <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                                    <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                                    <span className="text-[10px] text-gray-500 font-mono">module_config.js</span>
                                </div>
                                <div className="p-6 font-mono text-sm text-gray-300 overflow-x-auto scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-transparent">
                                    <pre className="whitespace-pre-wrap"><code>
                                        <span className="text-purple-400">import</span> {`{ ${serviceId ? serviceId.replace('-', '_').toUpperCase() : 'MODULE'}_CORE }`} <span className="text-purple-400">from</span> <span className="text-green-400">'@callisto/enterprise'</span>;<br /><br />
                                        <TypewriterCode code={service.codeSnippet} />
                                    </code></pre>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
                            {service.stats && service.stats.map((stat, i) => (
                                <TiltCard key={i} className="bg-neutral-900/50 rounded-xl p-6 border border-white/10 hover:border-red-600 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-50 transition-opacity">
                                        <Activity size={20} className="text-red-600" />
                                    </div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2 group-hover:text-red-400 transition-colors">{stat.label}</p>
                                    <p className="text-4xl font-mono font-bold text-white flex items-baseline gap-1">
                                        <AnimatedCounter value={stat.val} />
                                    </p>
                                </TiltCard>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
                                <Star size={20} className="text-red-500" fill="currentColor" /> Key Advantages
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <TiltCard className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 p-5 rounded-2xl group hover:border-red-500/30 transition-all">
                                    <TrendingUp size={24} className="text-red-600 mb-3" />
                                    <h4 className="font-bold text-white mb-1">Scalable Growth</h4>
                                    <p className="text-xs text-gray-400">Engineered to grow seamlessly with your user base.</p>
                                </TiltCard>
                                <TiltCard className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 p-5 rounded-2xl group hover:border-red-500/30 transition-all">
                                    <ShieldCheck size={24} className="text-red-600 mb-3" />
                                    <h4 className="font-bold text-white mb-1">Enterprise Security</h4>
                                    <p className="text-xs text-gray-400">Bank-grade protection for critical data assets.</p>
                                </TiltCard>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-5 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 50, rotateX: -15, skewY: 5 }}
                            whileInView={{ opacity: 1, x: 0, rotateX: 0, skewY: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.2 }}
                            className="relative bg-neutral-900 border border-white/10 p-8 rounded-3xl overflow-hidden shadow-2xl group"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-600/20 rounded-full blur-[60px] animate-pulse"></div>
                            <h3 className="text-2xl font-bold mb-3 relative z-10 text-white">Initialize Project</h3>
                            <p className="text-gray-400 text-sm mb-8 relative z-10 leading-relaxed">Ready to deploy this solution? Launch a new instance for your company today.</p>

                            <button
                                type="button"
                                onClick={handleInitiateDeploy}
                                className="group/btn relative w-full py-4 bg-gradient-to-r from-red-600 via-red-600 to-red-800 text-white font-black tracking-widest text-sm rounded-xl overflow-hidden shadow-lg shadow-red-600/30 hover:shadow-red-600/60 transition-all duration-300 ring-1 ring-red-500/50 hover:ring-red-400 active:scale-[0.98]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    DEPLOY NOW
                                    <ArrowUpRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                </span>
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full ease-in-out"></div>
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50, rotateX: -15, skewY: 5 }}
                            whileInView={{ opacity: 1, x: 0, rotateX: 0, skewY: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.4 }}
                            className="bg-gradient-to-br from-neutral-900 to-black border border-white/10 p-6 rounded-3xl relative overflow-hidden"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="absolute top-4 right-4 text-red-600/20"><Quote size={40} /></div>
                            <h4 className="text-sm font-bold text-red-500 mb-2 uppercase tracking-wide">Client Impact</h4>
                            <p className="text-lg text-gray-300 italic mb-4 leading-relaxed">"{service.clientQuote}"</p>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Check size={14} className="text-green-500" /></div>
                                <span className="text-xs text-gray-500">Verified Partner</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="bg-neutral-900/30 border border-white/5 p-6 rounded-3xl backdrop-blur-sm"
                        >
                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><GitBranch size={18} className="text-red-500" /> Execution Roadmap</h4>
                            <div className="space-y-6 relative">
                                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/10">
                                    <motion.div className="w-full bg-red-600 origin-top" style={{ height: "100%", scaleY: scrollYProgress }} />
                                </div>
                                {[{ step: "01", title: "Analysis", desc: "Requirement gathering." }, { step: "02", title: "Development", desc: "Agile sprints." }, { step: "03", title: "Deployment", desc: "Go-live." }].map((phase, idx) => (
                                    <div key={idx} className="relative flex gap-4 group cursor-default">
                                        <div className="w-6 h-6 rounded-full bg-black border-2 border-white/20 group-hover:border-red-500 z-10 flex items-center justify-center transition-colors">
                                            <motion.div
                                                className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-red-500 transition-colors"
                                                animate={{ scale: [1, 1.5, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                                            />
                                        </div>
                                        <div>
                                            <span className="text-xs font-mono text-red-500 mb-1 block">PHASE {phase.step}</span>
                                            <h5 className="font-bold text-white group-hover:text-red-400 transition-colors">{phase.title}</h5>
                                            <p className="text-xs text-gray-500">{phase.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Tech Stack</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {service.tech && service.tech.map((t, idx) => (
                                    <div key={idx} className="relative bg-neutral-900 border border-white/10 p-3 rounded-lg flex items-center gap-3 overflow-hidden group hover:border-red-500/50 transition-all cursor-default">
                                        {/* --- DATA STREAM FLOW ANIMATION --- */}
                                        <motion.div
                                            className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(220,38,38,0.1),transparent)]"
                                            initial={{ x: '-100%' }}
                                            animate={{ x: '100%' }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: idx * 0.2 }}
                                        />
                                        <div className="absolute inset-0 bg-red-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <Code size={16} className="text-gray-500 group-hover:text-red-500 transition-colors relative z-10" />
                                        <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors relative z-10">{t}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div variants={itemVariants} className="mt-24 w-full">
                    <div className="bg-neutral-900/30 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-[100px] pointer-events-none"></div>
                        <h3 className="text-3xl font-bold mb-10 flex items-center gap-4 text-white">
                            <span className="w-2 h-10 bg-red-600 rounded-full"></span>
                            Common Inquiries
                        </h3>
                        <div className="grid gap-4">
                            {service.faqs && service.faqs.map((faq, i) => (<FAQItem key={i} question={faq.q} answer={faq.a} />))}
                        </div>
                    </div>
                </motion.div>

            </motion.div>
            <Footer />
        </div>
    );
};

export default ServiceDetail;