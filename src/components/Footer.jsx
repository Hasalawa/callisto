import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black pt-32 pb-10 relative z-10">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 mb-20">
                <div>
                    <img src="/logo.png" alt="Logo" className="h-16 w-auto mb-6 opacity-80 rounded-full" />
                    <h2 className="text-3xl font-bold mb-4">Let's Build the Future.</h2>
                    <p className="text-gray-500 max-w-sm">
                        Callisto Software Solution (Pvt) Ltd.<br />
                        Innovating through code.
                    </p>
                </div>
                <div className="flex flex-col gap-4 items-start md:items-end">
                    <a href="mailto:hello@callisto.lk" className="text-2xl font-bold hover:text-red-500 transition-colors">hello@callisto.lk</a>
                    <a href="tel:+94712345678" className="text-2xl font-bold hover:text-red-500 transition-colors">+94 71 234 5678</a>
                    <p className="text-gray-500">Colombo, Sri Lanka</p>
                </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-gray-600 text-sm">
                <p>© 2024 Callisto Software Solution (Pvt) Ltd. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;