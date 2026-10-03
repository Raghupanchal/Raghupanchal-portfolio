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
            url: "https://github.com/raghupanchal",
            icon: <GitHubIcon fontSize="small" />,
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/raghuveer-panchal-27093428a/",
            icon: <LinkedInIcon fontSize="small" />,
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/raghu.panchal/",
            icon: <InstagramIcon fontSize="small" />,
        },
        {
            name: "WhatsApp",
            url: "https://wa.me/919380937502",
            icon: <WhatsAppIcon fontSize="small" />,
        }
    ];

    return (
        <div className="relative bg-[#0b0a08] text-neutral-300 border-t border-neutral-800/80 overflow-hidden font-sans">
            {/* Subtle Ambient Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <footer className="relative max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 pt-8 sm:pt-12 pb-16 xs:pb-14 sm:pb-8 z-20">
                {/* 2-Column Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-10 pb-6 sm:pb-8 border-b border-neutral-800/80 items-start justify-between">
                    
                    {/* Left Column: Developer Brand & Bio */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
                                <div className="p-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center shadow-sm">
                                    <CodeIcon fontSize="small" />
                                </div>
                                <span className="text-lg sm:text-xl font-bold text-[#F3EEDF] tracking-wide font-mono">
                                    &lt;RaghuPanchal /&gt;
                                </span>
                            </div>
                            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 max-w-md">
                                Full-Stack & AI/ML Software Engineer crafting high-performance web systems, computer vision models, and scalable architectures.
                            </p>
                        </div>

                        {/* Location & Email Pills */}
                        <div className="flex flex-wrap gap-2 text-xs text-neutral-300">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16130e] border border-neutral-800/80 text-neutral-300">
                                <LocationOnIcon style={{ fontSize: 14 }} className="text-amber-400 flex-shrink-0" />
                                <span>Bengaluru, India</span>
                            </div>
                            <a
                                href="mailto:raghupanchal21@gmail.com"
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16130e] border border-neutral-800/80 hover:border-amber-400/50 text-amber-300 hover:text-amber-200 transition-all"
                            >
                                <EmailIcon style={{ fontSize: 14 }} className="text-amber-400 flex-shrink-0" />
                                <span>raghupanchal21@gmail.com</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Connect Social Networks */}
                    <div className="flex flex-col md:items-end justify-start">
                        <div className="w-full max-w-full md:max-w-[280px]">
                            <div className="text-[11px] uppercase tracking-widest text-amber-300/90 font-bold mb-2.5 font-mono">
                                Connect
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#14120e] hover:bg-[#1d1912] border border-[#464335]/40 hover:border-amber-400/70 text-neutral-300 hover:text-white transition-all duration-200 group shadow-sm active:scale-95"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-amber-300/90 group-hover:text-amber-300 group-hover:scale-110 transition-transform flex items-center">
                                                {React.cloneElement(social.icon, { style: { fontSize: 16 } })}
                                            </span>
                                            <span className="text-xs font-semibold text-[#E0DBCB] group-hover:text-amber-300 transition-colors">
                                                {social.name}
                                            </span>
                                        </div>
                                        <NorthEastIcon style={{ fontSize: 11 }} className="text-neutral-500 group-hover:text-amber-300 transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Back to Top */}
                <div className="pt-5 sm:pt-6 flex flex-col-reverse xs:flex-row items-center justify-between gap-3 text-xs text-neutral-400 font-sans">
                    <p className="text-center xs:text-left text-[11px] sm:text-xs text-neutral-400 max-w-xs xs:max-w-none">
                        © {new Date().getFullYear()} Raghu Panchal. All rights reserved.
                    </p>

                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#14120e] hover:bg-amber-400/15 border border-[#464335]/60 hover:border-amber-400/70 text-amber-300 transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
                        title="Back to Top"
                        aria-label="Back to Top"
                    >
                        <KeyboardArrowUpIcon fontSize="small" className="group-hover:-translate-y-0.5 transition-transform" />
                        <span className="font-semibold text-xs">Back to top</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
