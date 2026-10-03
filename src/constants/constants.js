import stalight from '../assets/images/stalight.jpg';
import stalightlogo from '../assets/images/stalightlogo.png';
import crackthecampus from '../assets/images/crackthecampus.png';
import vyommaLogo from '../assets/images/vyomma.png';
import vyomaaProject from '../assets/images/vyomaa_project.png';
import neurocampus from '../assets/images/neurocampus.jpg';
import klabo from '../assets/images/klabo.png';
import shadowlock from '../assets/images/shadowlock.jpg';
import wheele from '../assets/images/Wheele.png';
import sleepicon from '../assets/images/sleepicon.png';
import teaicon from '../assets/images/teaicon.png';
import readingicon from '../assets/images/reading icon.png';
import cookingicon from '../assets/images/cookingicon.png';
import genai from '../assets/images/genai.png';
import bytedocker from '../assets/images/bytedocker.png';
import fitsync from '../assets/images/fitsync.png';
import neurosync from '../assets/images/neurosync.png';
import git from "../assets/images/git.png";
import javascript from "../assets/images/javascript.png";
import reactjs from "../assets/images/reactjs.png";
import tailwind from "../assets/images/tailwind.png";
import hackacityCert from '../assets/images/hackacity_cert.jpg';
import tjHackitCert from '../assets/images/tj_hackit_cert.png';
import capxCert from '../assets/images/capx_cert.png';
import castlerockinCert from '../assets/images/castlerockin_cert.png';
import mindmatrixCert from '../assets/images/mindmatrix_cert.jpg';
import mindmatrixLogo from '../assets/images/mindmatrix_logo.svg';
import infosysPythonCert from '../assets/images/infosys_python_cert.png';
import infosysAiCert from '../assets/images/infosys_ai_cert.png';

const education = [
  {
    title: "AMC Engineering College",
    degree: "B.E. in Computer Science & Engineering (AI / ML)",
    place_name: "Bengaluru, Karnataka",
    date: "Graduating Developer",
    grade: "Hands-on experience building complete production applications & AI systems"
  },
  {
    title: "Pre-University College (2nd PUC)",
    degree: "PCMB (Physics, Chemistry, Mathematics, Biology)",
    place_name: "Karnataka",
    date: "Class XII",
    grade: "Pre-University Education"
  }
];

const achievements = [
  {
    image: castlerockinCert,
    title: 'Software Development Internship',
    subtitle: 'Castlerockin Private Limited',
    text: 'Certificate of Internship for successful completion of the Software Development Internship Program.',
    date: 'Feb - May 2025',
    link: castlerockinCert
  },
  {
    image: mindmatrixCert,
    title: 'Android App Dev using GenAI',
    subtitle: 'MindMatrix & VTU (CL Infotech)',
    text: 'Internship Completion in Android App Development using GenAI (Kotlin, Jetpack Compose, AI Studio & Cloud). Rated EXCELLENT.',
    date: 'Feb - May 2026',
    link: mindmatrixCert
  },
  {
    image: tjHackitCert,
    title: 'TJhackIT-2024 (2nd Place)',
    subtitle: 'T. John Institute of Technology, Bengaluru',
    text: 'Secured 2nd Place in the 24-Hour Intercollegiate Hackathon "TJhackIT-2024" for innovative tech solutions.',
    date: 'June 2024',
    link: tjHackitCert
  },
  {
    image: hackacityCert,
    title: 'Hack-A-City 2.0 Hackathon',
    subtitle: 'City Engineering College, Bangalore',
    text: 'Certificate of Participation in Hack-A-City 2.0 Hackathon conducted by the Dept. of AI & ML.',
    date: 'June 2024',
    link: hackacityCert
  },
  {
    image: capxCert,
    title: 'Future of Tech: AI & LLMs',
    subtitle: 'Capx (Presented by Vaibhav Tyagi)',
    text: 'Technical masterclass certification on "Future of Tech: Artificial Intelligence & Large Language Models".',
    date: 'May 2024',
    link: capxCert
  },
  {
    image: infosysAiCert,
    title: 'Types of Artificial Intelligence',
    subtitle: 'Infosys Springboard',
    text: 'Course Completion Certificate in Artificial Intelligence: Types of Artificial Intelligence.',
    date: 'July 2024',
    link: infosysAiCert
  },
  {
    image: infosysPythonCert,
    title: 'Basics of Python',
    subtitle: 'Infosys Springboard',
    text: 'Course Completion Certificate for mastering foundational concepts in Basics of Python.',
    date: 'Dec 2023',
    link: infosysPythonCert
  }
];

const beyondCode = [
  {
    image: cookingicon,
    title: "Cooking & Music",
  },
  {
    image: readingicon,
    title: "Reading & Learning",
  },
  {
    image: sleepicon,
    title: "Sleep & Recharge",
  },
  {
    image: teaicon,
    title: "Chai",
  }
];

const coding = beyondCode;

const experience = [
  {
    image: stalightlogo,
    title: "Full Stack AI Developer",
    company: "Stalight Technologies",
    link: "https://www.stalight.in/",
    date: "Present",
    description: "Developing Stalight Campus ERP and AI automation systems covering student & faculty management, attendance, academic management, CO attainment, leave management, payments, dashboards, role-based access, AI/computer-vision attendance, and analytics."
  },
  {
    image: mindmatrixLogo,
    title: "Android App Dev (GenAI) Intern",
    company: "MindMatrix (VTU MoU Partner)",
    link: "https://mindmatrix.io/",
    date: "Feb 2026 - May 2026 · 4 mos",
    description: "Built Android applications with Kotlin and Jetpack Compose, integrating Google Cloud Labs, Google AI Studio GenAI capabilities, and Firebase workflows. Rated EXCELLENT."
  },
  {
    image: crackthecampus,
    title: "Frontend Developer Intern",
    company: "Crack The Campus (Castlerockin Private Limited)",
    link: "https://crackthecampus.com/",
    date: "Feb 2025 - May 2025 · 4 mos",
    description: "Developed and enhanced responsive web and mobile interfaces using React Native, React.js, Tailwind CSS, and frontend workflows on-site in Bengaluru, Karnataka."
  },
  {
    image: vyommaLogo,
    title: "Freelance Full-Stack Developer",
    company: "Vyomaa",
    link: "https://vyomaa.co.in/",
    date: "Feb 2020",
    description: "Architected and delivered an end-to-end e-commerce jewelry platform (vyomaa.co.in) featuring luxury product catalogs, order management, custom admin dashboards, REST APIs, and high-speed cloud deployment."
  }
];

const projects = [
  {
    title: 'NeuroCampus',
    image: neurocampus,
    github: 'https://github.com/raghupanchal/neurocampus',
    description: 'Full-Scale Smart Campus ERP & College Management System featuring 15+ integrated modules, role-based dashboards (Admin, Faculty, Student), AI facial-recognition & BLE attendance, automated CO-PO attainment, exam workflows, and real-time campus analytics.',
    tags: ["React", "TypeScript", "Django", "PostgreSQL", "Redis", "WebSockets", "OpenCV", "15+ Modules", "AI ERP"],
  },
  {
    title: 'KLABO Marketplace',
    image: klabo,
    github: 'https://github.com/raghupanchal/klabo-marketplace',
    description: 'A fully custom-built multi-vendor marketplace for handmade, personalized, and creator products, built from the ground up with dedicated customer, seller, and super admin experiences. Klabo enables sellers to manage their storefronts, products, inventory, orders, and business operations, while customers can discover products, place orders, and manage their purchases through a seamless shopping experience. The platform features secure role-based authentication, custom product workflows, seller and admin dashboards, and a scalable backend with PostgreSQL/Supabase and Cloudflare R2 for structured data and product media storage.',
    tags: ["React", "TypeScript", "PostgreSQL", "Supabase", "Cloudflare R2", "Multi-Vendor", "Dashboards", "Auth"],
  },
  {
    title: 'ShadowLock',
    image: shadowlock,
    github: 'https://github.com/raghupanchal/shadowlock',
    description: 'Security + AI image steganography platform combining AES encryption, hidden-message embedding, and real-time mood analysis.',
    tags: ["Python", "OpenCV", "AES Encryption", "AI / Steganography", "FastAPI"],
  },
  {
    title: 'Vyomaa (vyomaa.co.in)',
    image: vyomaaProject,
    github: 'https://vyomaa.co.in/',
    description: 'Production e-commerce jewelry platform built for a client, featuring an elegant digital storefront, custom product catalogs, cart & checkout workflows, and a comprehensive admin management portal for inventory, customer orders, and sales tracking.',
    tags: ["React", "Next.js", "Tailwind CSS", "REST APIs", "E-Commerce", "Admin Portal", "Freelance"],
  },
  {
    title: 'NeuroSync',
    image: neurosync,
    github: 'https://github.com/raghupanchal/neurosync',
    description: 'AI-driven real-time interview intelligence and student dashboard platform featuring interactive skills performance tracking, leaderboard analytics, and interview evaluation workflows.',
    tags: ["React", "TypeScript", "Python", "FastAPI", "AI Intelligence", "Analytics"],
  },
];

const technologies = [
  {
    name: "React",
    icon: reactjs,
    category: "Frontend",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "Frontend",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "Frontend",
  },
  {
    name: "Vite",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
    category: "Frontend",
  },
  {
    name: "shadcn/ui",
    icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' fill='none'><rect width='256' height='256' rx='40' fill='%23111827'/><path d='M208 128l-80 80M192 40L40 192' stroke='%23f59e0b' stroke-width='24' stroke-linecap='round'/></svg>",
    category: "Frontend",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Backend",
  },
  {
    name: "Django",
    icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'><path fill='%232ba97b' d='M57.6 0h20.5v85.9c-5.8 1.2-10.4 1.7-16.7 1.7-16.7 0-25.7-7.4-25.7-21.2 0-13.5 9.1-22.1 21.9-22.1 4.1 0 7.4.7 9.8 1.9V21.6c-2.7-.8-6.5-1.2-10.7-1.2-24.8 0-41.9 14.8-41.9 42.1 0 26.6 16.5 42 42.4 42 7.7 0 14.6-1 20.9-3.2v20.7H98V0H57.6zM113.8 46.2h20.5v57.8h-20.5V46.2zM113.8 20.5h20.5v15.4h-20.5V20.5z'/></svg>",
    category: "Backend",
  },
  {
    name: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    category: "Backend",
  },
  {
    name: "Flask",
    icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'><path fill='%23f3f4f6' d='M68.6 4.3v27.2c3.4 3.7 5.7 8.3 6.6 13.3l12.7 7.3c1.5.9 2.5 2.5 2.5 4.3v13.5c0 2.8-2.3 5.1-5.1 5.1H42.7c-2.8 0-5.1-2.3-5.1-5.1V56.4c0-1.8 1-3.4 2.5-4.3l12.7-7.3c.9-5 3.2-9.6 6.6-13.3V4.3c0-2.4 1.9-4.3 4.3-4.3h.6c2.4 0 4.3 1.9 4.3 4.3zM46.2 88.5h35.6v23.2H46.2V88.5zm49.1-13.7c1.7 0 3.3.7 4.5 1.9l21.2 21.2c2.4 2.4 2.4 6.4 0 8.8l-1.9 1.9c-2.4 2.4-6.4 2.4-8.8 0l-15-15v18.1c0 3.4-2.8 6.3-6.3 6.3H38.9c-3.4 0-6.3-2.8-6.3-6.3v-18.1l-15 15c-2.4 2.4-6.4 2.4-8.8 0l-1.9-1.9c-2.4-2.4-2.4-6.4 0-8.8L28.1 76.7c1.2-1.2 2.8-1.9 4.5-1.9h62.7z'/></svg>",
    category: "Backend",
  },
  {
    name: "WebSockets",
    icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2338bdf8' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 14a8 8 0 0 1 0-4'/><path d='M7 17a12 12 0 0 1 0-10'/><path d='M10 20a16 16 0 0 1 0-16'/><path d='M20 10a8 8 0 0 1 0 4'/><path d='M17 7a12 12 0 0 1 0 10'/><path d='M14 4a16 16 0 0 1 0 16'/></svg>",
    category: "Backend",
  },
  {
    name: "Celery",
    icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a3e635'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z'/></svg>",
    category: "Backend",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    category: "Cloud & DB",
  },
  {
    name: "Supabase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    category: "Cloud & DB",
  },
  {
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    category: "Cloud & DB",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
    category: "Cloud & DB",
  },
  {
    name: "Google APIs",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    category: "Cloud & DB",
  },
  {
    name: "Cloudflare R2",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg",
    category: "Cloud & DB",
  },
  {
    name: "Vercel",
    icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'><path d='M12 1L24 22H0L12 1Z'/></svg>",
    category: "Cloud & DB",
  },
  {
    name: "DigitalOcean",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg",
    category: "Cloud & DB",
  },
  {
    name: "OpenCV",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
    category: "AI & Tools",
  },
  {
    name: "TensorFlow",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    category: "AI & Tools",
  },
  {
    name: "Git",
    icon: git,
    category: "AI & Tools",
  },
];

export { education, experience, projects, coding, beyondCode, achievements, technologies };