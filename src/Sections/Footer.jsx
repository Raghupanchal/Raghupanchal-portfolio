import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CodeIcon from '@mui/icons-material/Code';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NorthEastIcon from '@mui/icons-material/NorthEast';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socials = [
        {
            name: "GitHub",
            handle: "raghupanchal",
            url: "https://github.com/raghupanchal",
            icon: <GitHubIcon fontSize="small" />,
        },
        {
            name: "LinkedIn",
            handle: "Raghuveer Panchal",
            url: "https://www.linkedin.com/in/raghuveer-panchal-27093428a/",
            icon: <LinkedInIcon fontSize="small" />,
        },
        {
            name: "Instagram",
            handle: "@raghu.panchal",
            url: "https://www.instagram.com/raghu.panchal/",
            icon: <InstagramIcon fontSize="small" />,
        },
        {
            name: "WhatsApp",
            handle: "Chat",
            url: "https://wa.me/919380937502",
            icon: <WhatsAppIcon fontSize="small" />,
        }
    ];

    return (
        <div className="relative bg-[#090806] text-neutral-300 border-t border-neutral-800/80 overflow-hidden font-sans">
            {/* Subtle Gold Ambient Glow */}
            <div className="absolute top-0 left-1/3 w-80 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <footer className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-10 pb-8 z-20">
                {/* 2-Side Balanced Grid (Left: Brand/Bio, Right: Connect/Socials, Middle: Blank) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-8 border-b border-neutral-800/80 items-center justify-between">
                    
                    {/* Left Column: Developer Brand & Bio */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2.5">
                                <div className="p-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300">
                                    <CodeIcon fontSize="small" />
                                </div>
                                <span className="text-lg font-bold text-[#F3EEDF] tracking-wide font-mono">
                                    &lt;RaghuPanchal /&gt;
                                </span>
                            </div>
                            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 max-w-md">
                                Full-Stack & AI/ML Software Engineer crafting high-performance web systems, computer vision models, and scalable architectures.
                            </p>
                        </div>

                        <div className="space-y-1.5 text-xs text-neutral-400">
                            <div className="flex items-center gap-1.5">
                                <LocationOnIcon style={{ fontSize: 14 }} className="text-amber-400" />
                                <span>Bengaluru, Karnataka, India</span>
                            </div>
                            <div>
                                <a
                                    href="mailto:raghupanchal21@gmail.com"
                                    className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors"
                                >
                                    <EmailIcon style={{ fontSize: 14 }} className="text-amber-400" />
                                    <span>raghupanchal21@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Connect Social Networks (Single Column, Cute & Aesthetic) */}
                    <div className="flex flex-col md:items-end justify-center">
                        <div className="w-full max-w-[190px]">
                            <div className="text-[11px] uppercase tracking-widest text-amber-300/90 font-bold mb-2.5 font-mono">
                                Connect
                            </div>
                            <div className="flex flex-col gap-1.5">
                                {socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#14120e] hover:bg-[#1d1912] border border-[#464335]/40 hover:border-amber-400/70 text-neutral-300 hover:text-white transition-all duration-200 group shadow-sm hover:translate-x-0.5"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-amber-300/90 group-hover:text-amber-300 group-hover:scale-110 transition-transform flex items-center">
                                                {React.cloneElement(social.icon, { style: { fontSize: 15 } })}
                                            </span>
                                            <span className="text-xs font-medium text-[#E0DBCB] group-hover:text-amber-300 transition-colors">
                                                {social.name}
                                            </span>
                                        </div>
                                        <NorthEastIcon style={{ fontSize: 10 }} className="text-neutral-500 group-hover:text-amber-300 transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Top Button */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 font-sans">
                    <p>© {new Date().getFullYear()} Raghu Panchal. All rights reserved.</p>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-1 px-3 py-1 rounded-lg bg-[#14120e] hover:bg-amber-400/20 border border-[#464335]/60 hover:border-amber-400/70 text-amber-300 transition-all duration-200"
                        title="Back to Top"
                    >
                        <KeyboardArrowUpIcon fontSize="small" className="group-hover:-translate-y-0.5 transition-transform" />
                        <span className="font-semibold text-[11px]">Back to top</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
