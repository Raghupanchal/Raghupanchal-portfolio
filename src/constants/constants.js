import stalight from '../assets/images/stalight.jpg';
import stalightlogo from '../assets/images/stalightlogo.png';
import crackthecampus from '../assets/images/crackthecampus.png';
import vyommaLogo from '../assets/images/vyomma.png';
import vyomaaProject from '../assets/images/vyomaa_project.png';
import neurocampus from '../assets/images/neurocampus.jpg';
import klabo from '../assets/images/klabo.jpg';
import shadowlock from '../assets/images/shadowlock.jpg';
import wheele from '../assets/images/Wheele.png';
import leetcode from '../assets/images/leetcode.png';
import github from '../assets/images/github.png';
import codechef from '../assets/images/codechef.jpeg';
import codeforces from '../assets/images/codeforces.png';
import webdevudemy from '../assets/images/webdevudemy.jpg';
import genai from '../assets/images/genai.png';
import bytedocker from '../assets/images/bytedocker.png';
import fitsync from '../assets/images/fitsync.png';
import geocrisis from '../assets/images/Geocrisis.png';
import climate from '../assets/images/climate.png';
import alleviate from '../assets/images/alleviate.png';
import git from "../assets/images/git.png";
import javascript from "../assets/images/javascript.png";
import reactjs from "../assets/images/reactjs.png";
import tailwind from "../assets/images/tailwind.png";

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
    image: stalight,
    title: 'Stalight Campus ERP',
    subtitle: 'Smart Campus Production SaaS',
    text: 'Multi-role Smart Campus ERP featuring AI attendance tracking, academic CO attainment, leave management, and analytics.',
    date: '2024',
    link: 'https://github.com/raghupanchal'
  },
  {
    image: neurocampus,
    title: 'NeuroCampus Platform',
    subtitle: 'Major AI Engineering Platform',
    text: 'Facial recognition, BLE attendance, academic management, CO automation, interview intelligence, and safety analytics.',
    date: '2024',
    link: 'https://github.com/raghupanchal'
  },
  {
    image: klabo,
    title: 'KLABO Marketplace',
    subtitle: 'Multi-Vendor Product Marketplace',
    text: 'Multi-vendor marketplace for handmade products with seller studio workflows, creator roles, Supabase, and Shopify integrations.',
    date: '2024',
    link: 'https://github.com/raghupanchal'
  },
  {
    image: shadowlock,
    title: 'ShadowLock Security',
    subtitle: 'Steganography & AI Security Platform',
    text: 'AES encryption, image steganography message embedding, and real-time AI mood analysis.',
    date: '2024',
    link: 'https://github.com/raghupanchal'
  },
  {
    image: webdevudemy,
    title: 'Full-Stack Development Mastery',
    subtitle: 'React, TypeScript, Django & FastAPI',
    link: 'https://github.com/raghupanchal'
  },
  {
    image: genai,
    title: 'AI / Computer Vision Systems',
    subtitle: 'OpenCV, dlib, TensorFlow & OCR',
    link: 'https://github.com/raghupanchal'
  }
];

const coding = [
  {
    image: github,
    title: "GitHub",
    description: "Raghu Panchal | Full-Stack, AI/ML & Product Repos",
    url: "https://github.com/raghupanchal"
  },
  {
    image: leetcode,
    title: "LeetCode",
    description: "Raghu Panchal | Data Structures & Algorithms",
    url: "https://leetcode.com/u/raghupanchal/"
  },
  {
    image: codechef,
    title: "CodeChef",
    description: "Raghu Panchal | Competitive Programming & Logic",
    url: "https://www.codechef.com/users/raghupanchal"
  },
  {
    image: codeforces,
    title: "Codeforces",
    description: "Raghu Panchal | Algorithmic Problem Solving",
    url: "https://codeforces.com/profile/raghupanchal"
  }
];

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
    date: "2023 - Present",
    description: "Delivering complete production applications for clients including Vyomaa (vyomaa.co.in). Built performant web applications with responsive UI/UX, REST APIs, fast backend processing, and scalable deployment."
  },
  {
    image: klabo,
    title: "Product & Marketplace Architect",
    company: "KLABO Marketplace",
    link: "https://github.com/raghupanchal/klabo-marketplace",
    date: "2023 - 2024",
    description: "Built a multi-vendor marketplace for handmade products showcasing product/startup thinking. Worked with React, TypeScript, Supabase, Shopify, Google Auth, seller/customer/admin roles, product management, creator workflows, and cloud storage."
  }
];

const projects = [
  {
    title: 'Stalight Campus',
    image: stalight,
    github: 'https://github.com/raghupanchal/stalight-campus',
    description: 'A Smart Campus ERP covering student & faculty management, attendance, academic management, CO attainment, leave management, payments, dashboards, role-based access, AI/computer-vision attendance, and analytics.',
    tags: ["React", "TypeScript", "Django", "PostgreSQL", "OpenCV", "Redis", "SaaS ERP"],
  },
  {
    title: 'NeuroCampus',
    image: neurocampus,
    github: 'https://github.com/raghupanchal/neurocampus',
    description: 'AI-first campus platform featuring facial-recognition attendance, BLE attendance, academic management, CO automation, interview intelligence, safety analytics, and role-based dashboards.',
    tags: ["React", "TypeScript", "Django", "PostgreSQL", "Redis", "WebSockets", "OpenCV", "dlib", "TensorFlow"],
  },
  {
    title: 'KLABO Marketplace',
    image: klabo,
    github: 'https://github.com/raghupanchal/klabo-marketplace',
    description: 'Multi-vendor marketplace for handmade products with seller/customer/admin roles, product management, creator/seller workflows, Supabase data, Shopify integration, Google Auth, and Cloud storage.',
    tags: ["React", "TypeScript", "Supabase", "Shopify", "Google Auth", "Cloud Storage", "Marketplace"],
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
    description: 'Production freelance client project built for digital experience, custom backend APIs, performance optimization, and sleek modern UI.',
    tags: ["React", "Next.js", "Tailwind CSS", "FastAPI", "Freelance"],
  },
  {
    title: 'NeuroSync',
    image: fitsync,
    github: 'https://github.com/raghupanchal/neurosync',
    description: 'AI-driven real-time synchronization engine for multi-agent tasks, real-time data streaming, and automated intelligence processing.',
    tags: ["Python", "WebSockets", "Celery", "Redis", "AI Automation"],
  },
  {
    title: 'Madhu Marga',
    image: geocrisis,
    github: 'https://github.com/raghupanchal/madhu-marga',
    description: 'Intelligent route optimization and logistics data analytics portal designed for supply distribution and tracking.',
    tags: ["React", "Django", "PostgreSQL", "Google APIs"],
  },
  {
    title: 'Mirage',
    image: climate,
    github: 'https://github.com/raghupanchal/mirage',
    description: 'Computer vision visual effects & background manipulation engine leveraging real-time facial keypoints and segmentation.',
    tags: ["Python", "OpenCV", "dlib", "TensorFlow"],
  },
  {
    title: 'DefendAI',
    image: alleviate,
    github: 'https://github.com/raghupanchal/defend-ai',
    description: 'AI security & threat analysis suite detecting visual anomalies, suspicious activities, and OCR / intelligent data processing.',
    tags: ["Python", "OpenCV", "Keras", "OCR", "FastAPI"],
  },
];

const technologies = [
  {
    name: "React",
    icon: reactjs,
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
  },
  {
    name: "Vite",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "shadcn/ui",
    icon: reactjs,
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    name: "Django",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
  },
  {
    name: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"
  },
  {
    name: "Flask",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg"
  },
  {
    name: "WebSockets",
    icon: javascript,
  },
  {
    name: "Celery",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
  },
  {
    name: "Supabase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg"
  },
  {
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg"
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg"
  },
  {
    name: "Google APIs",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
  },
  {
    name: "Cloudflare R2",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg"
  },
  {
    name: "Vercel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg"
  },
  {
    name: "DigitalOcean",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg"
  },
  {
    name: "OpenCV",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg"
  },
  {
    name: "TensorFlow",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
  },
  {
    name: "Git",
    icon: git,
  },
];

export { education, experience, projects, coding, achievements, technologies };