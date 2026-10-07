// RP High-Precision Semantic Knowledge & Conversational Engine
// Trained on verified facts, projects, skills, experience, education, and personality of Raghu Panchal

export const RAGHU_PROFILE = {
  fullName: "Raghu Panchal",
  shortName: "Raghu",
  gender: "Male",
  dob: "23 October 2004",
  native: "Khatak Chincholi, Bhalki, Bidar, Karnataka, India",
  currentLocation: "Bengaluru, Karnataka, India",
  field: "Computer Science & Engineering (AI / ML)",
  currentProfile: "Software Engineer | AI/ML",
  graduationYear: "2026",
  cgpa: "7.8",
  college: "AMC Engineering College, Bengaluru",
  pucCollege: "BtVP Science College (PCMB)",
  school: "NVP Gurukul School, Khatak Chincholi, Bidar",
  email: "raghupanchal21@gmail.com",
  phone: "+91 9380937502",
  github: "https://github.com/raghupanchal",
  linkedin: "https://www.linkedin.com/in/raghuveer-panchal-27093428a/",
  instagram: "https://www.instagram.com/raghu.panchal/",
  whatsapp: "https://wa.me/919380937502"
};

export const QUICK_PROMPTS = [
  "Who is Raghu?",
  "What is KLABO?",
  "What projects has Raghu built?",
  "Tell me about his work experience",
  "What are his skills & tech stack?",
  "Tell me about Raghu's childhood",
  "What are his reading interests?",
  "How can I hire or contact Raghu?"
];

// -----------------------------------------------------------------------------
// TYPO, SLANG, SHORTHAND & PHONETIC NORMALIZATION DICTIONARY
// -----------------------------------------------------------------------------
const DICTIONARY_MAP = {
  // Conversational & Common Verbs
  'abt': 'about',
  'ur': 'your',
  'u': 'you',
  'r': 'are',
  'pls': 'please',
  'plz': 'please',
  'wat': 'what',
  'wats': 'what',
  'whats': 'what',
  'whr': 'where',
  'whre': 'where',
  'wher': 'where',
  'whois': 'who is',
  'hows': 'how is',
  'tellme': 'tell me',
  'hv': 'have',
  'hve': 'have',
  'has': 'have',
  'got': 'have',
  'hav': 'have',
  
  // Relationship & Dating
  'gf': 'girlfriend',
  'gfs': 'girlfriend',
  'bf': 'boyfriend',
  'girlfriedn': 'girlfriend',
  'girlfreind': 'girlfriend',
  'girlfrnd': 'girlfriend',
  'grlfrnd': 'girlfriend',
  'gurlfriend': 'girlfriend',
  'grl': 'girl',
  'gurl': 'girl',
  'daiting': 'dating',
  'marred': 'married',
  'relashunship': 'relationship',
  'relatn': 'relationship',
  
  // Favorites & Likes
  'fav': 'favorite',
  'fave': 'favorite',
  'favourite': 'favorite',
  'favourate': 'favorite',
  'favrt': 'favorite',
  'favorit': 'favorite',
  'liks': 'likes',
  
  // Education & Schooling
  'clg': 'college',
  'colg': 'college',
  'collegee': 'college',
  'sch': 'school',
  'schl': 'school',
  'skool': 'school',
  'skul': 'school',
  'edu': 'education',
  'edukation': 'education',
  'educashun': 'education',
  'degreee': 'degree',
  'engg': 'engineering',
  'engnrng': 'engineering',
  'btech': 'engineering',
  'be': 'engineering',
  'bday': 'birthday',
  'birthdate': 'birthday',
  
  // Projects & Tech
  'proj': 'project',
  'projs': 'projects',
  'prjt': 'project',
  'prjcts': 'projects',
  'projectss': 'projects',
  'skils': 'skills',
  'skil': 'skills',
  'skillz': 'skills',
  'skls': 'skills',
  'techs': 'technology',
  'technolgy': 'technology',
  'technologies': 'technology',
  'stck': 'stack',
  'klabo': 'klabo',
  'klbo': 'klabo',
  'stlight': 'stalight',
  'starling': 'stalight',
  'starlite': 'stalight',
  'nuro': 'neuro',
  'nurocampus': 'neurocampus',
  'neurocamp': 'neurocampus',
  'nurosync': 'neurosync',
  'vyoma': 'vyomaa',
  'vyomma': 'vyomaa',
  'shdow': 'shadow',
  'shadowlock': 'shadowlock',
  
  // Work & Experience
  'exp': 'experience',
  'exprnc': 'experience',
  'experince': 'experience',
  'experiance': 'experience',
  'wrk': 'work',
  'wrking': 'working',
  'worrk': 'work',
  'intership': 'internship',
  'intrn': 'internship',
  'sal': 'salary',
  'ctc': 'salary',
  
  // Locations & Travel
  'destn': 'destination',
  'dest': 'destination',
  'travelling': 'travel',
  'traveling': 'travel',
  'trvl': 'travel',
  'trip': 'travel',
  'trips': 'travel',
  'qweenstown': 'queenstown',
  'queenston': 'queenstown',
  'queenstownn': 'queenstown',
  'newzealand': 'new zealand',
  'nz': 'new zealand',
  'bnglr': 'bengaluru',
  'banglore': 'bengaluru',
  'bangalore': 'bengaluru',
  'bidar': 'bidar',
  
  // Food, Drinks & Sweets
  'chesecak': 'cheesecake',
  'cheesecak': 'cheesecake',
  'biscof': 'biscoff',
  'biscoff': 'biscoff',
  'jamun': 'jamun',
  'jamoon': 'jamun',
  'gulabjamun': 'gulab jamun',
  'gulab': 'gulab jamun',
  'chaii': 'tea',
  'chai': 'tea',
  
  // Greetings & Casual
  'hii': 'hi',
  'hiii': 'hi',
  'hiiii': 'hi',
  'heyy': 'hey',
  'heyyy': 'hey',
  'heyyyy': 'hey',
  'hlo': 'hello',
  'hlw': 'hello',
  'hola': 'hello',
  'gm': 'good morning',
  'gn': 'good night',
  'wassup': 'whats up',
  'wazzup': 'whats up',
  'sup': 'whats up',
  'namaskar': 'namaskara',
  'namaste': 'namaskara',
  'namasthe': 'namaskara',
  'hengiddira': 'hegiddira',
  'doddmandige': 'doddmandige'
};

const STOP_WORDS = new Set([
  'is', 'he', 'she', 'it', 'they', 'the', 'a', 'an', 'and', 'or', 'do',
  'does', 'did', 'doing', 'done', 'are', 'was', 'were', 'been', 'being',
  'having', 'in', 'on', 'at', 'to', 'for', 'of',
  'with', 'by', 'from', 'about', 'as', 'into', 'like', 'through', 'after',
  'over', 'between', 'out', 'up', 'down', 'then', 'so', 'can', 'could',
  'will', 'would', 'shall', 'should', 'may', 'might', 'must', 'please',
  'tell', 'me', 'us', 'him', 'her', 'them', 'my', 'your', 'his', 'their',
  'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am'
]);

// Levenshtein distance for fuzzy typo tolerance
function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function isFuzzyMatch(word, target) {
  if (!word || !target) return false;
  const w = word.toLowerCase();
  const t = target.toLowerCase();
  if (w === t) return true;
  if (w.length >= 4 && (w.includes(t) || t.includes(w))) return true;
  if (Math.abs(w.length - t.length) > 3) return false;
  const maxDistance = t.length >= 6 ? 2 : 1;
  return levenshteinDistance(w, t) <= maxDistance;
}

function normalizeQuery(raw) {
  const cleaned = raw
    .toLowerCase()
    .replace(/[?!.,;:"'()[\]{}#_`~\\/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const rawTokens = cleaned.split(' ').filter(Boolean);
  const normalizedTokens = rawTokens.map((t) => DICTIONARY_MAP[t] || t);
  const meaningfulTokens = normalizedTokens.filter((t) => !STOP_WORDS.has(t));

  return {
    raw: cleaned,
    text: normalizedTokens.join(' '),
    tokens: normalizedTokens,
    meaningful: meaningfulTokens
  };
}

function matchIntent(parsed, requiredKeywords = [], phrases = []) {
  const { text, tokens, meaningful, raw } = parsed;

  // 1. Direct Substring / Phrase Matching
  for (const phrase of phrases) {
    const p = phrase.toLowerCase();
    if (text.includes(p) || raw.includes(p)) {
      return true;
    }
  }

  // 2. Keyword exact & fuzzy matching against tokens and text
  for (const kw of requiredKeywords) {
    const k = kw.toLowerCase();
    if (text.includes(k) || raw.includes(k)) return true;

    for (const token of tokens) {
      if (isFuzzyMatch(token, k)) {
        return true;
      }
    }
    for (const token of meaningful) {
      if (isFuzzyMatch(token, k)) {
        return true;
      }
    }
  }

  return false;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// -----------------------------------------------------------------------------
// VERIFIED KNOWLEDGE RETRIEVERS
// -----------------------------------------------------------------------------

function getBioInfo() {
  return `**Raghu Panchal** is a **Software Engineer & AI/ML Developer** based in Bengaluru, Karnataka (originally from Khatak Chincholi, Bidar).

- 💻 **Core Focus**: Building high-performance full-stack web applications, AI/Computer Vision systems, and scalable product architectures.
- 🚀 **Current Role**: **Full-Stack AI Developer** at **Stalight Technologies**.
- 🎓 **Education**: Final year B.E. in Computer Science & Engineering (AI / ML) at AMC Engineering College, Bengaluru (CGPA: 7.8, graduating 2026).
- 💡 **Philosophy**: A curious product builder who loves solving meaningful problems from the ground up and learning by building.`;
}

export function getKlaboInfo() {
  return `✨ **KLABO Marketplace — Raghu's Entrepreneurial Dream & Flagship Venture:**

**KLABO** is Raghu's entrepreneurial venture — a completely custom-built multi-vendor marketplace designed from the ground up for handmade, creator, personalized, and unique products.

**Why it's unique & visionary:**
- 🚀 **Entrepreneurial Vision**: Built to empower independent creators, artisans, and boutique sellers with their own branded digital storefronts and unified discovery.
- 🛠️ **100% Custom Architecture**: Coded entirely from scratch (it is **NOT** a template, WordPress, or Shopify store).
- 👥 **Multi-Tier Workflows**: Dedicated custom portals for customers (discovery, cart & orders), creators/sellers (storefront, inventory & sales analytics), and super-admins.
- ⚙️ **Core Capabilities**: Role-based authentication, customized product configurators, real-time inventory tracking, and seller performance dashboards.
- 💻 **Tech Stack**: React, TypeScript, Tailwind CSS, PostgreSQL / Supabase, and Cloudflare R2 for structured media storage.`;
}

export function getStalightInfo() {
  return `**Stalight Campus ERP & Stalight Sync:**
- **Stalight Campus**: An all-in-one smart campus ERP digitizing academic & administrative operations including student/faculty management, attendance, exam workflows, leave tracking, and role-based access across 15+ modules.
- **Stalight Sync**: A specialized learning and placement platform for student career readiness and technical programming content.`;
}

export function getNeuroCampusInfo() {
  return `**NeuroCampus** is an AI-first smart campus management platform featuring:
- AI facial-recognition & BLE attendance
- Automated CO-PO attainment calculation
- Role-based dashboards (Admin, Faculty, Student)
- Real-time campus safety analytics and interview intelligence
- **Tech Stack**: React, TypeScript, Django REST Framework, PostgreSQL, Redis, WebSockets, Python, OpenCV, and TensorFlow/Keras.`;
}

function getAllProjectsInfo() {
  return `Raghu has engineered several end-to-end production applications and systems:
- ✨ **KLABO Marketplace**: Raghu's entrepreneurial venture — custom multi-vendor marketplace for handmade, creator, and unique products.
- 🏫 **Stalight Campus ERP**: Complete smart campus ERP platform digitizing 15+ academic and administrative operations.
- 🚀 **Stalight Sync**: Career preparation, technical placement, and learning platform.
- 🧠 **NeuroCampus AI**: AI-driven smart campus with facial-recognition attendance, BLE, and automated CO-PO attainment.
- 🎯 **NeuroSync**: AI interview evaluation, proctoring, and student performance dashboard.
- 🔒 **ShadowLock**: Security & steganography suite with AES encryption and OpenCV vision.
- 💎 **Vyomaa (vyomaa.co.in)**: Production jewelry e-commerce platform and admin portal.`;
}

function getExperienceInfo() {
  return `**Raghu's Professional Experience & Internships:**
1. **Stalight Technologies** (*Present*): **Full-Stack AI Developer** building Stalight Campus ERP and AI automation systems.
2. **MindMatrix & VTU** (*Feb - May 2026*): **Android App Dev (GenAI) Intern** — built Kotlin & Jetpack Compose apps with Google Cloud & AI Studio (Rated EXCELLENT).
3. **Castlerockin Pvt Ltd / Crack The Campus** (*Feb - May 2025*): **Frontend Developer Intern** — developed responsive web & mobile UI using React Native, React.js, and Tailwind CSS.
4. **Vyomaa** (*Freelance*): Architected and delivered a production e-commerce jewelry platform (vyomaa.co.in).`;
}

function getSkillsInfo() {
  return `**Raghu's Technical Skills & Stack:**
- **Languages**: Python, JavaScript, TypeScript, Kotlin, SQL
- **Frontend**: React, Next.js, Vite, Tailwind CSS, shadcn/ui, HTML5/CSS3
- **Backend**: Django REST Framework, FastAPI, Flask, WebSockets, Celery
- **Databases**: PostgreSQL, Supabase, Redis, Firebase
- **AI/ML & Computer Vision**: Python, OpenCV, PyTorch, TensorFlow/Keras, dlib, Generative AI (LLMs)
- **Cloud & DevOps**: Google Cloud, Vercel, Cloudflare R2, Docker, Git, GitHub, REST APIs`;
}

function getEducationInfo() {
  return `**Raghu's Academic Background:**
- 🎓 **Engineering Degree**: B.E. in Computer Science & Engineering (AI / ML)
  - **Institution**: AMC Engineering College, Bengaluru, Karnataka
  - **Graduation Year**: 2026 | **CGPA**: 7.8 / 10.0
- 📚 **Pre-University (PUC)**: BtVP Science College (Science - PCMB)
- 🏫 **Schooling**: NVP Gurukul School, Khatak Chincholi, Bhalki, Bidar, Karnataka`;
}

function getChildhoodInfo() {
  return `**Raghu's Childhood & Roots:**
- **Hometown**: Grew up in **Khatak Chincholi, Bhalki, Bidar district, Karnataka**.
- **Schooling**: Studied at **NVP Gurukul School** in Khatak Chincholi, where he developed a disciplined lifestyle and early passion for science and technology.
- **Journey**: Later completed his PUC in PCMB at BtVP Science College before moving to Bengaluru for Computer Science Engineering.`;
}

function getReadingInfo() {
  return `**Raghu's Reading & Literary Interests:**
- 📚 Raghu has a deep love for **Kannada literature, novels, and authentic cultural storytelling**.
- ✍️ He is inspired by the monumental works of **Rashtrakavi Kuvempu** and the engaging narratives of **Ravi Belagere**.
- Reading Kannada literature is his primary leisure pursuit to reflect and recharge outside of programming.`;
}

function getFoodAndFavoritesInfo() {
  return `**Raghu's Personal Favorites & Lifestyle:**
- ☕ **Favorite Drink**: **Tea (Chai)** — his daily fuel for deep coding sessions.
- 🍯 **Favorite Sweet**: **Gulab Jamun (Jamun)**.
- 🍰 **Favorite Cake**: **Lotus Biscoff Cheesecake**.
- 🍲 **Food Preference**: Simple, traditional **home-cooked Karnataka meals**.
- 🏔️ **Dream Travel Destination**: **Queenstown, New Zealand** (*loves its serene alpine beauty and pristine nature*).
- 🌿 **Environment**: Loves **calm, quiet, and peaceful spaces** for deep focus.`;
}

function getCertificatesInfo() {
  return `**Raghu's Honors, Hackathons & Certifications:**
- 🏆 **TJhackIT-2024 (2nd Place)**: 24-Hour Intercollegiate Hackathon at T. John Institute of Technology, Bengaluru.
- 🎖️ **Hack-A-City 2.0**: Hackathon Project Innovation conducted by Dept. of AI & ML.
- ⭐ **Android App Dev using GenAI**: MindMatrix & VTU MoU (Rated EXCELLENT).
- 📜 **Future of Tech (AI & LLMs)**: Capx Masterclass.
- 📜 **Types of Artificial Intelligence**: Infosys Springboard.
- 📜 **Basics of Python**: Infosys Springboard.`;
}

function getRecruiterHiringInfo() {
  return `**Why Hire Raghu Panchal?**
- 🚀 **Full-Lifecycle Builder**: Experience building complex production platforms end-to-end (e.g. KLABO multi-vendor marketplace, Stalight ERP, NeuroCampus).
- 🧠 **AI & Full-Stack Synergy**: Combines robust backend architecture (Python/Django/FastAPI) with modern frontend development (React/Next.js/TypeScript) and AI/Computer Vision models.
- 💼 **Professional Track Record**: Experience working in fast-paced software environments (Stalight Technologies, MindMatrix, Castlerockin).
- 🤝 **Fast Learner & Team Player**: Disciplined, humble, detail-oriented, and driven by continuous improvement.

**Contact & Availability:**
- 📧 Email: [raghupanchal21@gmail.com](mailto:raghupanchal21@gmail.com)
- 📱 WhatsApp: [+91 9380937502](https://wa.me/919380937502)
- 💼 LinkedIn: [Raghuveer Panchal](https://www.linkedin.com/in/raghuveer-panchal-27093428a/)`;
}

function getContactInfo() {
  return `**Get in Touch with Raghu:**
- 📧 **Email**: [raghupanchal21@gmail.com](mailto:raghupanchal21@gmail.com)
- 📱 **WhatsApp / Phone**: [+91 9380937502](https://wa.me/919380937502)
- 💼 **LinkedIn**: [Raghuveer Panchal](https://www.linkedin.com/in/raghuveer-panchal-27093428a/)
- 💻 **GitHub**: [github.com/raghupanchal](https://github.com/raghupanchal)
- 📸 **Instagram**: [@raghu.panchal](https://www.instagram.com/raghu.panchal/)
- 📍 **Location**: Bengaluru, Karnataka, India`;
}

// -----------------------------------------------------------------------------
// GREETING HANDLER
// -----------------------------------------------------------------------------

function handleGreeting(rawInput, parsed) {
  const { text, tokens } = parsed;
  const rawLower = rawInput.toLowerCase().trim();

  // Kannada / Doddmandige
  const isKannada =
    text.includes('namaskara') ||
    text.includes('doddmandige') ||
    text.includes('hegiddira') ||
    text.includes('en samachara') ||
    rawLower.includes('ನಮಸ್ಕಾರ') ||
    rawLower.includes('ದೊಡ್ಡಮಂದಿಗೆ') ||
    rawLower.includes('ಹೇಗಿದ್ದೀರಾ');

  if (isKannada) {
    if (text.includes('doddmandige') || rawLower.includes('ದೊಡ್ಡಮಂದಿಗೆ')) {
      return pickRandom([
        "🙏 **ನಮಸ್ಕಾರ್ರೀ ದೊಡ್ಡಮಂದಿಗೆ!** Welcome! I'm **RP**, Raghu Panchal's AI assistant. Hegiddira? What would you like to explore today — his software projects, tech skills, childhood, or reading interests?",
        "🙏 **ನಮಸ್ಕಾರ್ರೀ ದೊಡ್ಡಮಂದಿಗೆ!** Great to connect with you! I'm **RP**, representing Raghu. How can I help you today? Ask me anything about Raghu's apps, engineering work, or background.",
        "🙏 **ನಮಸ್ಕಾರ್ರೀ ದೊಡ್ಡಮಂದಿಗೆ!** Welcome to Raghu's portfolio space! I'm **RP**. Feel free to ask about his projects like KLABO & Stalight, his skills, or his favorite Kannada novels! 😊"
      ]);
    }
    if (text.includes('hegiddira') || rawLower.includes('ಹೇಗಿದ್ದೀರಾ')) {
      return pickRandom([
        "🙏 **ನಮಸ್ಕಾರ!** ನಾನು ಚೆನ್ನಾಗಿದ್ದೀನಿ (I'm doing great!), thank you! Hegiddira neevu? I'm **RP**, Raghu's AI assistant. What would you like to know about Raghu today?",
        "🙏 **Namaskara!** All good here! 😊 How are you doing? I can tell you about Raghu's software projects, skills, education, or how to get in touch with him."
      ]);
    }
    return pickRandom([
      "🙏 **ನಮಸ್ಕಾರ್ರೀ!** Welcome! I'm **RP**, Raghu Panchal's personal AI assistant. What would you like to explore — his projects, technical stack, childhood, or education?",
      "🙏 **Namaskara!** Great to meet you. I'm **RP**, representing Raghu. Feel free to ask about his software projects, skills, reading interests, or contact details."
    ]);
  }

  // Time of Day
  if (text.includes('good morning') || tokens.includes('gm')) {
    return pickRandom([
      "Good morning! ☀️ I'm **RP**, Raghu's AI assistant. Hope you're having a wonderful day! What would you like to know about Raghu's work, skills, or projects?",
      "Good morning! ☕ Great to have you here. I'm **RP**. How can I assist you today? Feel free to ask about Raghu's projects, background, or experience."
    ]);
  }
  if (text.includes('good afternoon')) {
    return pickRandom([
      "Good afternoon! 🌤️ I'm **RP**, Raghu's AI assistant. How's your day going? Feel free to ask about Raghu's software projects, technical skills, or interests.",
      "Good afternoon! Thanks for stopping by. I'm **RP**, representing Raghu Panchal. What would you like to explore today?"
    ]);
  }
  if (text.includes('good evening')) {
    return pickRandom([
      "Good evening! 🌇 I'm **RP**, Raghu's AI assistant. Thanks for visiting! Would you like to check out Raghu's projects, tech stack, or direct contact info?",
      "Good evening! Hope you had a productive day. I'm **RP**, here to tell you about Raghu's work, experience, and background. What's on your mind?"
    ]);
  }
  if (text.includes('good night') || tokens.includes('gn')) {
    return pickRandom([
      "Good night! 🌙 Burning the late-night oil? Raghu often codes late into the night too! Let me know if you'd like a quick overview of his projects or want to leave a message for him.",
      "Good night! Have a restful sleep. If you have any questions about Raghu's work, projects, or background, I'm always here!"
    ]);
  }

  // How are you?
  if (text.includes('how are you') || text.includes('how r u') || text.includes('how do you do')) {
    return pickRandom([
      "I'm doing great, thanks for asking! 😊 Ready to share anything you'd like to know about Raghu — his software projects, engineering experience, childhood, or tech skills. What's on your mind?",
      "Doing wonderful, thank you! How are you doing? I'm here as Raghu's AI assistant to answer questions about his apps, work at Stalight, Kannada literature interests, and more."
    ]);
  }

  // What's up?
  if (text.includes('whats up') || tokens.includes('sup') || tokens.includes('wassup') || tokens.includes('yo')) {
    return pickRandom([
      "Hey! Not much, just here representing Raghu and ready to answer any questions. What would you like to check out — his projects, skills, background, or personal interests?",
      "Hey there! Everything's great on this side. What brings you to Raghu's portfolio today? I can tell you about his builds, tech stack, childhood in Bidar, or contact info."
    ]);
  }

  // Named Greetings
  if (text.includes('hey raghu') || text.includes('hello raghu') || text.includes('hi rp') || text.includes('hey rp')) {
    return pickRandom([
      "Hey there! 👋 I'm **RP**, Raghu's personal AI assistant (Raghu himself is probably writing code or reading Kannada literature right now!). How can I help you today?",
      "Hello! Great to meet you. I'm **RP**, representing Raghu Panchal. What would you like to know about Raghu — his projects, tech stack, work experience, or background?"
    ]);
  }

  // General Casual Greetings
  const casualTokens = ['hi', 'hello', 'hey', 'hii', 'hiii', 'heyy', 'hlo', 'hlw', 'hola'];
  if (tokens.some((t) => casualTokens.includes(t)) && tokens.length <= 4) {
    return pickRandom([
      "Hey there! 👋 I'm **RP**, Raghu's personal AI assistant. Great to meet you! Feel free to ask me anything about Raghu's projects, technical skills, education, or personality.",
      "Hello! Welcome to Raghu's portfolio space. I'm **RP**, here to help you get to know Raghu — whether you're curious about his projects, work experience, childhood, or hobbies. What would you like to check out?",
      "Hi there! 👋 Hope you're having a great day. What would you like to know about Raghu today? You can ask about his builds (like KLABO or Stalight), his tech stack, or how to connect with him."
    ]);
  }

  return null;
}

// -----------------------------------------------------------------------------
// MAIN MULTI-INTENT RESOLUTION ENGINE
// -----------------------------------------------------------------------------

export function getRPResponse(rawInput, conversationHistory = []) {
  if (!rawInput || !rawInput.trim()) {
    return "🙏 **ನಮಸ್ಕಾರ್ರೀ ದೊಡ್ಡಮಂದಿಗೆ!** I am **RP**, Raghu Panchal's personal AI representative. How can I help you today?";
  }

  const parsed = normalizeQuery(rawInput);
  const { tokens, text } = parsed;
  const rawClean = rawInput.trim().toLowerCase();

  // 1. Easter Eggs
  if (rawClean === 'sudo hire raghu' || rawClean === 'sudo hire' || rawClean === 'hire raghu') {
    return `\`\`\`bash
$ sudo hire raghu
[sudo] verifying engineering requirements... ✓
[████████████████████████████] 100%

✅ CANDIDATE PROFILE MATCHED: Raghu Panchal
- Role: Full-Stack & AI/ML Software Engineer
- Focus: Next.js, React, Python, Django, FastAPI, Vision AI
- Status: Available & Ready to build high-impact products!

📧 Email: raghupanchal21@gmail.com
📱 WhatsApp: +91 9380937502
💼 LinkedIn: linkedin.com/in/raghuveer-panchal-27093428a
\`\`\`
*Feel free to reach out directly to discuss opportunities!* 🚀`;
  }

  if (rawClean === 'hello world') {
    return `\`\`\`javascript
console.log("Hello World! 👋 Welcome to Raghu Panchal's AI Space.");
\`\`\`
A true classic. What can I tell you about Raghu's projects or tech stack today?`;
  }

  if (rawClean === 'coffee') {
    return "Raghu actually runs on **Chai (Tea)**! ☕ A hot cup of tea is his secret fuel for deep late-night coding sessions. What else would you like to know?";
  }

  if (rawClean === 'matrix') {
    return "*You take the red pill...* 🔴 Welcome to Raghu's developer console. Try asking about **KLABO**, **Stalight**, or typing `/skills`!";
  }

  if (rawClean === 'ping') {
    return "pong! 🏓 Latency: 0ms (Raghu's systems are live and ready to build).";
  }

  // 2. Slash Commands
  if (rawClean === '/help' || rawClean === '/commands') {
    return `Available quick slash commands:
- \`/about\` : Overview of Raghu Panchal
- \`/klabo\` : Raghu's entrepreneurial flagship venture
- \`/projects\` : Engineering creations (KLABO, Stalight, NeuroCampus, etc.)
- \`/skills\` : Tech stack, languages & frameworks
- \`/experience\` : Work history & internships
- \`/education\` : Degree & college background
- \`/hire\` : Recruiter overview & contact info
- \`/hobbies\` : Literature, travel & favorites
- \`/secret\` : Easter egg file`;
  }
  if (rawClean === '/about' || rawClean === '/bio') return getBioInfo();
  if (rawClean === '/klabo') return getKlaboInfo();
  if (rawClean === '/projects') return getAllProjectsInfo();
  if (rawClean === '/skills' || rawClean === '/tech') return getSkillsInfo();
  if (rawClean === '/experience' || rawClean === '/work') return getExperienceInfo();
  if (rawClean === '/education') return getEducationInfo();
  if (rawClean === '/hire' || rawClean === '/contact') return getRecruiterHiringInfo();
  if (rawClean === '/hobbies' || rawClean === '/favorites') return getFoodAndFavoritesInfo();

  // 3. Direct Identity / Bio Checks (e.g. "raghu", "who is raghu", "raghu details", etc.)
  const directIdentityQueries = [
    'raghu', 'raghu panchal', 'raghuveer', 'raghuveer panchal', 'raghupanchal', 'panchal',
    'who is raghu', 'who is raghu panchal', 'who is raghuveer', 'who is raghupanchal',
    'who is he', 'who is this', 'about raghu', 'tell me about raghu', 'raghu details',
    'raghu profile', 'raghu bio', 'raghu info', 'raghu background', 'introduce raghu',
    'who are you', 'who r u', 'who is rp', 'about him', 'tell me about him', 'raghu summary'
  ];

  if (directIdentityQueries.includes(rawClean)) {
    return getBioInfo();
  }

  // 4. Strict Security & Confidentiality Guardrail
  if (
    matchIntent(
      parsed,
      ['password', 'passwords', 'token', 'otp', 'credentials'],
      ['api key', 'private key', 'bank account', 'account number', 'credit card', 'auth token']
    )
  ) {
    return "I cannot share private credentials, tokens, or confidential keys. You can reach Raghu directly at [raghupanchal21@gmail.com](mailto:raghupanchal21@gmail.com).";
  }

  // 5. Sex / Gender & Body Count Inquiries
  if (
    matchIntent(
      parsed,
      ['bodycount'],
      ['body count', 'bodycount', 'what is his body count', 'raghu body count', 'his body count', 'what is body count', 'how many body count']
    ) ||
    rawClean.includes('body count') ||
    rawClean.includes('bodycount')
  ) {
    return "Raghu's body count is **3**.";
  }

  if (
    matchIntent(
      parsed,
      ['gender', 'sex', 'male', 'female', 'boy', 'guy', 'man', 'ಲಿಂಗ'],
      ['what is his sex', 'what is his gender', 'raghu sex', 'raghu gender', 'what sex', 'what gender', 'is raghu male or female', 'is he male', 'is he female', 'is he boy', 'gender of raghu', 'is he a guy', 'what is your gender', 'what is your sex', 'his sex', 'sex of raghu']
    ) ||
    rawClean === 'sex' ||
    rawClean === 'gender'
  ) {
    return "Raghu Panchal's sex/gender is **Male** (He/Him).";
  }

  // 6. Inappropriate / Explicit Content Guardrail (Strictly for NSFW / explicit abuse)
  if (
    matchIntent(
      parsed,
      [
        'porn', 'sexy', 'nude', 'nudes', 'naked', 'fuck', 'fucking',
        'bitch', 'boobs', 'dick', 'pussy', 'hookup', 'kiss', 'blowjob', 'horny', 'adult', 'xxx'
      ],
      [
        'watch porn', 'have sex', 'send nudes', 'dirty talk', 'show body'
      ]
    )
  ) {
    return `⚠️ Let's keep our conversation respectful and professional!

I am **RP**, Raghu Panchal's professional AI representative. Feel free to ask about his **software projects (KLABO, Stalight, NeuroCampus)**, **technical skills**, **work experience**, **childhood in Bidar**, or **contact details**! 💼🚀`;
  }

  // 7. Relationship / Dating / Girlfriend Intent (Natural, friendly response)
  const wantsRelationship = matchIntent(
    parsed,
    [
      'girlfriend', 'gf', 'dating', 'date', 'crush', 'single', 'married',
      'wife', 'lover', 'love', 'relationship', 'committed', 'engaged', 'affair', 'marry', 'romance', 'ಹುಡುಗಿ', 'ಮದುವೆ'
    ],
    [
      'does he have girlfriend', 'raghu girlfriend', 'have girlfriend', 'is he single',
      'is he married', 'relationship status', 'who is his girlfriend', 'does raghu date',
      'who is his crush', 'any girlfriend', 'raghu dating', 'marry', 'love life', 'gf of raghu'
    ]
  );

  if (wantsRelationship) {
    return `😄 **Raghu's Relationship Status:**

Raghu is currently **single** and 100% focused on his engineering career, building high-impact products (like **KLABO Marketplace**), and developing AI systems! 💻🚀

*(He often jokes that his current 'serious relationship' is with Python, React, and a hot cup of Chai! ☕)*`;
  }

  // 7. Salary / Income / Package Intent
  const wantsSalary = matchIntent(
    parsed,
    ['salary', 'income', 'earning', 'earnings', 'package', 'ctc', 'networth', 'stipend', 'money', 'paid', 'ಸಂಬಳ', 'ಆದಾಯ'],
    ['how much does he earn', 'what is his salary', 'what is his package', 'current ctc', 'monthly income', 'net worth', 'how much money']
  );

  if (wantsSalary) {
    return `💼 **Compensation & Commercial Inquiries:**

Raghu's compensation and project rates depend on the scope, architecture requirements, and timeline of the engineering role or freelance build.

For hiring inquiries, full-time opportunities, or project discussions, you can reach him directly:
- 📧 **Email**: [raghupanchal21@gmail.com](mailto:raghupanchal21@gmail.com)
- 📱 **WhatsApp**: [+91 9380937502](https://wa.me/919380937502)
- 💼 **LinkedIn**: [Raghuveer Panchal](https://www.linkedin.com/in/raghuveer-panchal-27093428a/)`;
  }

  // 8. Family / Parents Intent
  const wantsFamily = matchIntent(
    parsed,
    ['family', 'parents', 'father', 'mother', 'brother', 'sister', 'dad', 'mom', 'siblings', 'ಕುಟುಂಬ', 'ತಂದೆ', 'ತಾಯಿ'],
    ['raghu family', 'about his family', 'who are his parents', 'his father', 'his mother', 'family background', 'parents details']
  );

  if (wantsFamily) {
    return `👨‍👩‍👦 **Raghu's Family Background:**

Raghu comes from a humble, supportive family rooted in **Khatak Chincholi, Bhalki, Bidar district, Karnataka**. Their values of hard work, simplicity, and discipline inspire his strong dedication as an engineer and builder.`;
  }

  // 9. Greeting Check (if short greeting)
  const greetingResponse = handleGreeting(rawInput, parsed);
  if (greetingResponse && tokens.length <= 4) {
    return greetingResponse;
  }

  // 10. Secret / Easter Egg
  if (
    matchIntent(
      parsed,
      ['secret', 'secrets', 'mystery', 'classified', 'easteregg', 'ರಹಸ್ಯ'],
      ['secret file', 'tell me a secret', 'what is your secret', 'what is his secret', 'raghu secret']
    )
  ) {
    return `🤫 **Shhh… you really found the secret file?**

Raghu’s biggest secret is that he can turn a simple idea into a full-blown project before anyone realizes what happened. 😄

☕ **Fuel:** Chai + homemade food
📚 **Escape:** Kannada novels & stories — especially Kuvempu and Ravi Belagere
💻 **Superpower:** Turning random ideas into working software
🌙 **Hidden mode:** Late-night coding when everyone else is asleep
🔐 **Golden rule:** \`.env\` stays out of GitHub. Always. 😎

**Raghu himself would probably say: “Ask me something else, maga!” 😂**`;
  }

  // 11. Recruiter & Hiring Intent
  if (
    matchIntent(
      parsed,
      ['hire', 'hiring', 'recruiter', 'recruit', 'opportunity', 'job', 'contract', 'freelancer', 'fulltime', 'resume', 'cv'],
      ['why hire raghu', 'why should i hire', 'hire him', 'is he available', 'availability', 'looking for job', 'job opportunities', 'hiring status', 'download resume', 'raghu resume', 'raghu cv']
    )
  ) {
    return getRecruiterHiringInfo();
  }

  // 12. Multi-Intent / Compound Query Detection
  const results = [];

  const wantsKlabo = matchIntent(
    parsed,
    ['klabo', 'entrepreneur', 'entrepreneurship', 'startup', 'venture', 'marketplace', 'creator'],
    ['creator marketplace', 'klabo marketplace', 'raghu startup', 'entrepreneurial dream', 'dream project', 'custom marketplace']
  );

  const wantsProjects = !wantsKlabo && matchIntent(
    parsed,
    ['projects', 'portfolio', 'built', 'creations', 'apps', 'applications'],
    ['what did he build', 'what has he built', 'list of projects', 'show projects', 'what projects', 'his projects']
  );

  const wantsBio = matchIntent(
    parsed,
    ['bio', 'introduce', 'summary', 'profile', 'engineer', 'raghu', 'raghuveer', 'panchal', 'raghupanchal', 'background', 'identity', 'ಯಾರು'],
    ['who is raghu', 'about raghu', 'tell me about raghu', 'who are you', 'about yourself', 'who is raghu panchal', 'tell me about him', 'who is he', 'who is this', 'raghu profile', 'raghu details', 'raghu info', 'introduce raghu', 'raghu panchal']
  );

  const wantsSkills = matchIntent(
    parsed,
    ['skills', 'technologies', 'technology', 'stack', 'languages', 'frameworks', 'databases', 'frontend', 'backend', 'python', 'react', 'typescript', 'javascript', 'kotlin', 'ಕೌಶಲ್ಯ'],
    ['tech stack', 'what technologies', 'technical stack', 'what does he code in', 'coding skills', 'programming languages']
  );

  const wantsExperience = matchIntent(
    parsed,
    ['experience', 'intern', 'internship', 'internships', 'career', 'working', 'employed', 'stalight', 'ಅನುಭವ'],
    ['work history', 'work experience', 'where has he worked', 'is he working', 'current job', 'current company']
  );

  const wantsEducation = matchIntent(
    parsed,
    ['education', 'college', 'degree', 'engineering', 'amc', 'cgpa', 'grade', 'marks', 'graduation', 'university', 'academics', 'qualification', 'ಕಾಲೇಜು', 'ಶಿಕ್ಷಣ'],
    ['amc engineering college', 'b.e', 'btech', 'degree details', 'academic background', 'which college', 'where did he study']
  );

  const wantsContact = matchIntent(
    parsed,
    ['contact', 'email', 'phone', 'mobile', 'call', 'number', 'reach', 'message', 'linkedin', 'github', 'whatsapp', 'instagram', 'connect', 'mail', 'telephone', 'chat', 'ಸಂಪರ್ಕ'],
    ['reach out', 'contact details', 'how to contact', 'get in touch', 'contact raghu', 'send message']
  );

  const wantsTravel = matchIntent(
    parsed,
    ['travel', 'trip', 'destination', 'queenstown', 'zealand', 'tour', 'vacation', 'holiday', 'visit', 'wanderlust', 'ಪ್ರವಾಸ', 'ಸ್ಥಳ'],
    ['favorite travel destination', 'dream destination', 'favorite place to visit', 'where does he want to travel', 'favorite place', 'where does he want to go', 'dream place', 'favorite country']
  );

  const wantsFoodOrFavorites = matchIntent(
    parsed,
    ['food', 'dishes', 'cuisine', 'cooking', 'cook', 'meal', 'lunch', 'dinner', 'tea', 'chai', 'coffee', 'drink', 'sweet', 'sweets', 'dessert', 'jamun', 'cake', 'cheesecake', 'biscoff', 'ಊಟ', 'ತಿಂಡಿ', 'ಆಹಾರ', 'ಚಹಾ', 'ಸಿಹಿ', 'ಕೇಕ್'],
    ['favorite food', 'favorite drink', 'tea or coffee', 'favorite sweet', 'favorite cake', 'biscoff cheesecake', 'gulab jamun']
  );

  const wantsChildhood = matchIntent(
    parsed,
    ['childhood', 'school', 'schooling', 'gurukul', 'nvp', 'btvp', 'kid', 'bidar', 'bhalki', 'chincholi', 'ಶಾಲೆ', 'ಬಾಲ್ಯ'],
    ['primary school', 'khatak chincholi', 'early life', 'grow up', 'grew up', 'born and raised']
  );

  const wantsReading = matchIntent(
    parsed,
    ['reading', 'book', 'books', 'novel', 'novels', 'literature', 'author', 'kuvempu', 'belagere', 'stories', 'poem', 'ಸಾಹಿತ್ಯ', 'ಕಾದಂಬರಿ', 'ಪುಸ್ತಕ', 'ಕುವೆಂಪು', 'ರವಿ ಬೆಳಗೆರೆ'],
    ['ravi belagere', 'kannada literature', 'kannada novel', 'favorite author', 'favorite book', 'reading interest']
  );

  const wantsFriends = matchIntent(
    parsed,
    ['friend', 'friends', 'bestie', 'besties', 'bff', 'gang', 'dost', 'ಸ್ನೇಹಿತರು', 'ಗೆಳೆಯರು'],
    ['favorite friends', 'best friends', 'who are his friends', 'raghu friends', 'friend circle']
  );

  const wantsPersonality = matchIntent(
    parsed,
    ['introvert', 'introverted', 'personality', 'selective', 'attitude', 'behavior', 'extrovert', 'ಸ್ವಭಾವ'],
    ['how is raghu', 'personality trait', 'selective circle', 'nature of raghu', 'what kind of person']
  );

  const wantsHometown = matchIntent(
    parsed,
    ['hometown', 'native', 'origin', 'roots', 'location', 'bengaluru', 'bangalore', 'bidar', 'ಸ್ಥಳ', 'ಬೆಂಗಳೂರು', 'ಬೀದರ್'],
    ['native place', 'where is he from', 'where is raghu from', 'where does he live', 'based in', 'which city', 'where from']
  );

  const wantsCertificates = matchIntent(
    parsed,
    ['certificate', 'certificates', 'certification', 'hackathon', 'tjhackit', 'hackacity', 'award', 'awards', 'achievement', 'achievements'],
    ['hackathons', 'participations', 'certifications']
  );

  // Individual Specific Projects
  if (wantsKlabo) return getKlaboInfo();
  if (matchIntent(parsed, ['stalight'], ['stalight campus', 'stalight sync', 'campus erp'])) return getStalightInfo();
  if (matchIntent(parsed, ['neurocampus'], ['facial recognition attendance', 'co-po attainment'])) return getNeuroCampusInfo();
  if (matchIntent(parsed, ['neurosync'], ['interview intelligence', 'interview proctoring'])) {
    return "**NeuroSync** is a remote AI-powered interview intelligence and proctoring platform focused on online candidate evaluation workflows, student performance analytics, and automated proctoring intelligence.";
  }
  if (matchIntent(parsed, ['shadowlock'], ['steganography', 'aes encryption', 'hidden data', 'image security'])) {
    return "**ShadowLock** is a cybersecurity and computer vision application combining **AES encryption**, image-based **steganography** (concealed data embedding), and real-time **mood analysis** using Python, OpenCV, and FastAPI.";
  }
  if (matchIntent(parsed, ['vyomaa'], ['jewelry', 'jewellery', 'freelance project', 'vyomaa platform'])) {
    return "**Vyomaa (vyomaa.co.in)** is a full-featured production online jewelry e-commerce platform custom-engineered by Raghu, featuring custom catalog browsing, admin inventory control, and responsive modern UI.";
  }

  // Compound Resolution
  let compoundCount = 0;
  if (wantsBio && !wantsProjects && !wantsSkills && !wantsExperience && !wantsEducation) {
    return getBioInfo();
  }
  if (wantsBio) { results.push(getBioInfo()); compoundCount++; }
  if (wantsProjects && !wantsBio) { results.push(getAllProjectsInfo()); compoundCount++; }
  if (wantsSkills && !wantsBio) { results.push(getSkillsInfo()); compoundCount++; }
  if (wantsExperience && !wantsBio) { results.push(getExperienceInfo()); compoundCount++; }
  if (wantsEducation && !wantsBio) { results.push(getEducationInfo()); compoundCount++; }
  if (wantsContact && !wantsBio) { results.push(getContactInfo()); compoundCount++; }
  if (wantsHometown) { results.push("📍 **Raghu's Roots & Current Location:**\n- **Hometown / Native**: Grew up in **Khatak Chincholi, Bhalki, Bidar district, Karnataka**.\n- **Current Base**: Living in **Bengaluru, Karnataka, India** for engineering & software development."); compoundCount++; }
  if (wantsTravel) { results.push("🏔️ **Favorite Travel Destination:** **Queenstown, New Zealand** — captivated by its peaceful alpine mountains, serene lakes, and scenic nature."); compoundCount++; }
  if (wantsFoodOrFavorites) { results.push(getFoodAndFavoritesInfo()); compoundCount++; }
  if (wantsChildhood && !wantsBio) { results.push(getChildhoodInfo()); compoundCount++; }
  if (wantsReading && !wantsFoodOrFavorites) { results.push(getReadingInfo()); compoundCount++; }
  if (wantsCertificates) { results.push(getCertificatesInfo()); compoundCount++; }

  if (compoundCount > 1) {
    return results.join("\n\n---\n\n");
  } else if (compoundCount === 1) {
    return results[0];
  }

  // Single Intent Fallbacks
  if (wantsHometown) {
    return "📍 **Raghu's Location & Native Background:**\n- **Hometown**: Grew up in **Khatak Chincholi, Bhalki, Bidar district, Karnataka**.\n- **Current Location**: Based in **Bengaluru, Karnataka, India**.";
  }
  if (wantsTravel) {
    return "🏔️ **Raghu's Favorite Travel Destination:** **Queenstown, New Zealand** — he is fascinated by its peaceful alpine mountains, crystal-clear lakes, pristine nature, and breathtaking scenic beauty.";
  }
  if (wantsFoodOrFavorites) {
    if (matchIntent(parsed, ['cake', 'cheesecake', 'biscoff'], ['favorite cake', 'favourite cake', 'biscoff cheesecake', 'which cake'])) {
      return "🍰 **Raghu's Favorite Cake:** **Lotus Biscoff Cheesecake** — rich, creamy, and topped with signature caramelized Biscoff crunch!";
    }
    if (matchIntent(parsed, ['sweet', 'sweets', 'dessert', 'jamun', 'gulab'], ['favorite sweet', 'favourite sweet', 'gulab jamun', 'which sweet'])) {
      return "🍯 **Raghu's Favorite Sweet:** **Gulab Jamun (Jamun)** — warm, soft, and sweet!";
    }
    if (matchIntent(parsed, ['tea', 'chai', 'coffee', 'drink', 'beverage'], ['favorite drink', 'favourite drink', 'tea or coffee', 'favorite beverage'])) {
      return "☕ **Raghu's Favorite Drink:** **Tea (Chai)** — his daily go-to drink to recharge and fuel coding sessions!";
    }
    return getFoodAndFavoritesInfo();
  }
  if (wantsChildhood) return getChildhoodInfo();
  if (wantsReading) return getReadingInfo();
  if (wantsFriends) return "Raghu keeps his circle small. He doesn't have a huge list of 'best friends' — he values a few genuine, quality people he can trust, laugh with, and count on. 😄🤝 He prefers keeping their names private, though!";
  if (wantsPersonality) {
    return `**Raghu's Personality & Nature:**
- Raghu is naturally **introverted, calm, and selective** about his circle.
- He values genuine, deep connections and prefers investing his focus and energy into **deep work, product development, software architecture, and reading Kannada literature**.
- While quiet and selective socially, he is highly collaborative, humble, and professional when engineering systems and building products.`;
  }
  if (matchIntent(parsed, ['gender', 'male', 'female', 'boy', 'guy', 'man', 'ಲಿಂಗ'], ['what is his gender', 'what gender', 'is raghu male or female', 'is he male', 'is he female', 'is he boy', 'gender of raghu', 'is he a guy', 'what is your gender'])) {
    return "Raghu Panchal's gender is **Male** (He/Him).";
  }
  if (matchIntent(parsed, ['doing', 'currently', 'nowadays', 'presently', 'status'], ['what is he doing', 'what is he doing now', 'what is raghu doing', 'what doing', 'what are you doing', 'what does he do', 'what is his status', 'what is he up to', 'what is he working on', 'current status'])) {
    return `**What Raghu is currently doing:**

- 💼 **Job & Professional Role**: Working as a **Full-Stack AI Developer** at **Stalight Technologies**, building the Stalight Campus ERP & AI automation workflows.
- 🎓 **Academics**: Completing his final year **B.E. in Computer Science & Engineering (AI / ML)** at AMC Engineering College, Bengaluru (Graduating 2026).
- 🚀 **Entrepreneurial Venture**: Actively engineering **KLABO Marketplace**, his custom multi-vendor creator platform.

*Would you like more details about his job at Stalight, his education, or his projects?*`;
  }
  if (matchIntent(parsed, ['dob', 'birthday', 'born', 'age', 'old', 'birthdate'], ['date of birth', 'when was he born', 'how old is raghu', 'birth date', 'how old is he', 'what is his age'])) {
    return "Raghu Panchal was born on **23 October 2004** (he is currently 21 years old) in Karnataka, India.";
  }

  // 13. Contextual Follow-Up Resolver
  if (
    matchIntent(
      parsed,
      ['more', 'details', 'elaborate'],
      ['tell me more', 'what else', 'more details', 'anything else', 'tell more']
    ) &&
    conversationHistory.length > 0
  ) {
    const lastBotMessage = [...conversationHistory].reverse().find((m) => m.sender === 'bot');
    if (lastBotMessage) {
      const lastText = lastBotMessage.text.toLowerCase();
      if (lastText.includes('klabo') || lastText.includes('stalight') || lastText.includes('projects')) {
        return `Here are more technical details on Raghu's builds:
- **KLABO Marketplace**: Custom multi-vendor architecture, role-based dashboards, Supabase + Cloudflare R2 storage.
- **NeuroCampus**: Smart facial-recognition attendance & CO-PO attainment for universities.
- **ShadowLock**: AES encryption & steganography suite with OpenCV mood vision.

Would you like deep technical details on any of these, or should we look at his tech stack?`;
      }
      if (lastText.includes('stalight') || lastText.includes('intern') || lastText.includes('experience')) {
        return `More on Raghu's experience:
- At **Stalight Technologies**, he architects backend workflows and ERP frontend interfaces for institutions.
- During his **MindMatrix & VTU** internship, he developed GenAI Android applications in Kotlin.
- He also freelances and built the production **Vyomaa** jewelry store.

Would you like to know how to connect with Raghu for projects or roles?`;
      }
      if (lastText.includes('literature') || lastText.includes('reading') || lastText.includes('childhood')) {
        return `Raghu finds balance outside of code through literature and peaceful routines:
- He reads Kannada classics, especially works by **Kuvempu** and stories by **Ravi Belagere**.
- He grew up in Khatak Chincholi, Bidar, studied at NVP Gurukul, and values a calm, focused lifestyle.

What else would you like to explore?`;
      }
    }
  }

  // 14. Graceful Fallback
  return "I can tell you everything about Raghu! You can ask about his **projects (KLABO, Stalight ERP, NeuroCampus)**, **technical skills & tech stack**, **work at Stalight**, **education**, **hometown in Bidar**, or **contact details**. What would you like to explore?";
}
