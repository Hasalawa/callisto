import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

export default function TeamMemberCard({ name, role, img, socials = {} }) {
    const [isHovered, setIsHovered] = useState(false);
    const [displayedName, setDisplayedName] = useState(name);
    const [displayedRole, setDisplayedRole] = useState(role);

    useEffect(() => {
        // Hover effect එක Desktop වලට පමණක් සීමා වේ
        if (isHovered) {
            let nameIndex = 0;
            let roleIndex = 0;
            setDisplayedName('');
            setDisplayedRole('');

            const nameInterval = setInterval(() => {
                if (nameIndex <= name.length) {
                    setDisplayedName(name.substring(0, nameIndex));
                    nameIndex++;
                } else {
                    clearInterval(nameInterval);
                }
            }, 60);

            const roleInterval = setInterval(() => {
                if (roleIndex <= role.length) {
                    setDisplayedRole(role.substring(0, roleIndex));
                    roleIndex++;
                } else {
                    clearInterval(roleInterval);
                }
            }, 40); 

            return () => {
                clearInterval(nameInterval);
                clearInterval(roleInterval);
            };
        } else {
            setDisplayedName(name);
            setDisplayedRole(role);
        }
    }, [isHovered, name, role]);

    const hasSocials = socials.github || socials.linkedin || socials.twitter;

    return (
        <Tilt
            tiltMaxAngleX={12}
            tiltMaxAngleY={12}
            perspective={1000}
            glareEnable={true}
            glareMaxOpacity={0.4}
            glareColor="#ffffff"
            glarePosition="all"
            scale={1.02} // Mobile වලට ගැලපෙන්න scale එක පොඩ්ඩක් අඩු කළා
            transitionSpeed={1500}
            className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/50 shadow-2xl cursor-pointer group"
            onEnter={() => setIsHovered(true)}
            onLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-[3/4] w-full h-full">
                <div className="absolute inset-0 bg-neutral-950/40 lg:group-hover:bg-transparent transition-colors duration-500 z-10" />
                
                {/* Mobile: වර්ණවත් බව (grayscale-0) සහ පැහැදිලි බව (opacity-100)
                    Desktop (lg): කළු-සුදු (lg:grayscale) සහ බොඳ වීම (lg:opacity-70) 
                */}
                <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover filter grayscale-0 opacity-100 lg:grayscale lg:opacity-70 lg:group-hover:grayscale-0 lg:group-hover:opacity-100 transition-all duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-20 opacity-100 lg:opacity-90 lg:group-hover:opacity-100 transition-opacity duration-500" />

                {/* --- Responsive Social Icons Section --- */}
                {hasSocials && (
                    /* Mobile: Icons කෙලින්ම පේන්න තියෙනවා (opacity-100, translate-x-0)
                        Desktop (lg): Icons හැංගිලා තියෙන්නේ, Hover කරාම එනවා (lg:opacity-0 lg:translate-x-4)
                    */
                    <div className="absolute top-4 right-4 flex flex-col gap-3 z-30 opacity-100 translate-x-0 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all duration-500 delay-100">
                        
                        {socials.github && (
                            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-gray-200 hover:bg-red-500 hover:text-white transition-all duration-300 border border-white/20 hover:border-red-500 hover:scale-110">
                                <FaGithub size={18} />
                            </a>
                        )}

                        {socials.linkedin && (
                            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-gray-200 hover:bg-red-500 hover:text-white transition-all duration-300 border border-white/20 hover:border-red-500 hover:scale-110">
                                <FaLinkedinIn size={16} />
                            </a>
                        )}

                        {socials.twitter && (
                            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-gray-200 hover:bg-red-500 hover:text-white transition-all duration-300 border border-white/20 hover:border-red-500 hover:scale-110">
                                <FaXTwitter size={16} />
                            </a>
                        )}

                    </div>
                )}

                <div className="absolute bottom-0 left-0 w-full p-6 z-30">
                    <p className="text-red-500 font-mono text-xs tracking-widest uppercase mb-1 min-h-[16px]">
                        {isHovered ? `${displayedRole}_` : role}
                    </p>
                    <h3 className="text-2xl font-bold text-white min-h-[32px]">
                        {isHovered ? `${displayedName}|` : name}
                    </h3>
                </div>
            </div>
        </Tilt>
    );
}