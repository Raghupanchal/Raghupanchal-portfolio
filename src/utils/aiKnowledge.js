// RP High-Precision Semantic Knowledge Engine

export const RAGHU_PROFILE = {
  fullName: "Raghu Panchal",
  shortName: "Raghu",
  dob: "23 October 2004",
  native: "Khatak Chincholi, Bhalki, Bidar, Karnataka, India",
  currentLocation: "Bengaluru, Karnataka, India",
  field: "Computer Science & Engineering (AI / ML)",
  currentProfile: "Software Engineer | AI/ML",
  graduationYear: "2026",
  cgpa: "7.8",
  email: "raghupanchal21@gmail.com",
  phone: "+91 9380937502",
  github: "https://github.com/raghupanchal",
  linkedin: "https://www.linkedin.com/in/raghuveer-panchal-27093428a/",
  instagram: "https://www.instagram.com/raghu.panchal/",
  whatsapp: "https://wa.me/919380937502"
};

export const QUICK_PROMPTS = [
  "Who is Raghu?",
  "What projects has Raghu built?",
  "Is Raghu currently working?",
  "Tell me about Raghu's childhood",
  "What are his reading interests?",
  "How can I contact Raghu?"
];

// Slang, Typos, and Shorthand Resolver
const DICTIONARY_MAP = {
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
  'fav': 'favorite',
  'fave': 'favorite',
  'favourite': 'favorite',
  'favourate': 'favorite',
  'secrtet': 'secret',
  'secert': 'secret',
  'secreat': 'secret',
  'screet': 'secret',
  'scrt': 'secret',
  'clg': 'college',
  'colg': 'college',
  'sch': 'school',
  'schl': 'school',
  'proj': 'project',
  'projs': 'projects',
  'exp': 'experience',
  'exprnc': 'experience',
  'edu': 'education',
  'bday': 'birthday',
  'boss': 'raghu',
  'creator': 'raghu',
  'master': 'raghu',
  'founder': 'raghu',
  'developer': 'raghu',
  'coder': 'raghu',
  'technolgy': 'technology',
  'techs': 'tech',
  'wrk': 'work',
  'wrking': 'working'
};

// Common stop words to exclude from keyword trigger collisions
const STOP_WORDS = new Set([
  'is', 'he', 'she', 'it', 'they', 'the', 'a', 'an', 'and', 'or', 'do',
  'does', 'did', 'doing', 'done', 'are', 'was', 'were', 'been', 'being',
  'have', 'has', 'had', 'having', 'in', 'on', 'at', 'to', 'for', 'of',
  'with', 'by', 'from', 'about', 'as', 'into', 'like', 'through', 'after',
  'over', 'between', 'out', 'up', 'down', 'then', 'so', 'can', 'could',
  'will', 'would', 'shall', 'should', 'may', 'might', 'must', 'please',
  'tell', 'me', 'us', 'him', 'her', 'them', 'my', 'your', 'his', 'their',
  'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am'
]);

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

// Check exact multi-word phrase or token presence
function matchIntent(parsed, requiredKeywords = [], phrases = []) {
  const { text, tokens, meaningful } = parsed;

  // 1. Check exact phrase matches (e.g. "where does he work")
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) {
      return true;
    }
  }

  // 2. Check meaningful keyword tokens
  for (const kw of requiredKeywords) {
    const k = kw.toLowerCase();
    if (tokens.includes(k) || meaningful.includes(k)) {
      return true;
    }
  }

  return false;
}

export function getRPResponse(rawInput) {
  if (!rawInput || !rawInput.trim()) {
    return "🙏 **ನಮಸ್ಕಾರ್ರೀ ದೊಡ್ಡಮಂದಿಗೆ!** I am **RP**, Raghu Panchal's personal AI representative. How can I help you today?";
  }

  const parsed = normalizeQuery(rawInput);
  const { tokens, text } = parsed;

  // 1. Strict Security & Confidentiality Guardrail
  if (
    matchIntent(
      parsed,
      ['password', 'passwords', 'token', 'otp', 'credentials'],
      ['api key', 'private key', 'bank account', 'account number', 'credit card', 'auth token']
    )
  ) {
    return "I cannot share private credentials, tokens, or confidential keys. You can reach Raghu directly at [raghupanchal21@gmail.com](mailto:raghupanchal21@gmail.com).";
  }

  // 2. Inappropriate, NSFW, Adult & Vulgar Questions Guardrail
  if (
    matchIntent(
      parsed,
      [
        'virgin', 'virginity', 'porn', 'sex', 'sexy', 'nude', 'nudes', 'naked', 'fuck', 'fucking',
        'bitch', 'boobs', 'dick', 'pussy', 'hookup', 'kiss', 'blowjob', 'horny', 'adult', 'xx', 'xxx',
        'girlfriend', 'dating', 'crush', 'salary', 'income', 'networth', 'ex'
      ],
      [
        'is he virgin', 'is he a virgin', 'watch porn', 'have sex', 'send nudes', 'dirty talk',
        'is he single', 'does he have girlfriend', 'relationship status', 'how much he earn', 'marital status'
      ]
    )
  ) {
    return `⚠️ **Please don't ask inappropriate or stupid questions!**

I am **RP**, Raghu Panchal's professional AI representative. Let's keep this conversation clean and professional.

Feel free to ask about his **software projects (KLABO, Stalight, NeuroCampus)**, **technical skills**, **work experience**, or **contact details**! 💼🚀`;
  }

  // 3. Secret / Easter Egg / Classified
  if (
    matchIntent(
      parsed,
      ['secret', 'secrets', 'mystery', 'classified', 'easteregg', 'ರಹಸ್ಯ'],
      [
        'secret',
        'secrets',
        'secret file',
        'tell me a secret',
        'what is your secret',
        'what is his secret',
        'raghu secret',
        'secret about raghu'
      ]
    )
  ) {
    return `🤫 **Shhh… you really found the secret file?**

Raghu’s biggest secret is that he can turn a simple idea into a full-blown project before anyone realizes what happened. 😄

☕ **Fuel:** Chai + homemade food
📚 **Escape:** Kannada novels & stories — especially Kuvempu and Ravi Belagere
💻 **Superpower:** Turning random ideas into working software
🌙 **Hidden mode:** Late-night coding when everyone else is asleep
🔐 **Golden rule:** \`.env\` stays out of GitHub. Always. 😎

But there’s one secret I’m **not allowed to reveal**…

**Raghu himself would probably say: “Ask me something else, maga!” 😂**`;
  }

  // 4. Working Status / Current Job / Employment
  if (
    matchIntent(
      parsed,
      ['working', 'employed', 'employment', 'stalight', 'job', 'workplace'],
      [
        'is he working',
        'is raghu working',
        'where does he work',
        'where is he working',
        'current job',
        'current company',
        'current role',
        'what is his job',
        'student or working',
        'where he works'
      ]
    )
  ) {
    return `**Raghu's Current Working Status:**
- **Current Role**: **Full-Stack AI Developer** at **Stalight Technologies** (*Present*).
- **What he is building**: Leading development of the **Stalight Campus ERP** and AI automation workflows.
- **Academics**: Concurrently in final year B.E. in Computer Science & Engineering (AI / ML) at AMC Engineering College, Bengaluru (Graduating 2026).`;
  }

  // 5. Favorite Friends, Best Friends & Social Circle
  if (
    matchIntent(
      parsed,
      ['friend', 'friends', 'bestie', 'besties', 'bff', 'gang', 'dost', 'dosth', 'ಸ್ನೇಹಿತರು', 'ಗೆಳೆಯರು'],
      [
        'favorite friends',
        'favourite friends',
        'best friends',
        'best friend',
        'who are his friends',
        'who is his best friend',
        'raghu friends',
        'friend circle',
        'circle of friends'
      ]
    )
  ) {
    return "Raghu keeps his circle small. He doesn't have a huge list of 'best friends' — he values a few genuine, quality people he can trust, laugh with, and count on. 😄🤝 He prefers keeping their names private, though!";
  }

  // 6. Personality, Nature, Introvert & Selective Circle
  if (
    matchIntent(
      parsed,
      ['introvert', 'introverted', 'personality', 'selective', 'attitude', 'behavior', 'extrovert', 'ಸ್ವಭಾವ'],
      ['how is raghu', 'personality trait', 'selective circle', 'nature of raghu', 'what kind of person', 'introvert or extrovert']
    )
  ) {
    return `**Raghu's Personality & Nature:**
- Raghu is naturally **introverted, calm, and selective** about his circle.
- He values genuine, deep connections and prefers investing his focus and energy into **deep work, product development, software architecture, and reading Kannada literature**.
- While quiet and selective socially, he is highly collaborative, humble, and professional when engineering systems and building products.`;
  }

  // 7. Childhood, Schooling & Early Education
  if (
    matchIntent(
      parsed,
      ['childhood', 'school', 'schooling', 'gurukul', 'nvp', 'btvp', 'kid', 'bidar', 'bhalki', 'chincholi', 'ಶಾಲೆ', 'ಬಾಲ್ಯ', 'ಗುರುಕುಲ'],
      [
        'primary school',
        'high school',
        'khatak chincholi',
        'class 10',
        'class 12',
        '10th',
        '12th',
        'puc',
        'early life',
        'where did he study',
        'grow up',
        'grew up',
        'born and raised'
      ]
    )
  ) {
    return `**Raghu's Childhood & Schooling:**
- **Primary & High School**: Completed at **NVP Gurukul School, Khatak Chincholi, Bhalki, Bidar, Karnataka**.
- **Pre-University (PUC)**: Completed in Science stream (PCMB) at **BtVP Science College**.
- Raghu grew up in Bidar district, Karnataka, with an early curiosity for science and technology before moving to Bengaluru to pursue Computer Science & Engineering.`;
  }

  // 8. Likes, Calm & Peaceful Places, Leisure Preferences
  if (
    matchIntent(
      parsed,
      ['peace', 'calm', 'serene', 'serenity', 'relax', 'peaceful', 'quietness', 'ಶಾಂತಿ'],
      [
        'what does he like',
        'what raghu likes',
        'likes most',
        'what he likes',
        'peace and calm',
        'calm places',
        'peaceful places',
        'favorite environment',
        'favourite place',
        'whats like'
      ]
    )
  ) {
    return `**What Raghu Likes Most:**
- **Peace & Calm**: Raghu deeply loves **peaceful, quiet, and calm environments**.
- **Deep Focus**: He values serene, distraction-free spaces where he can focus on deep work, programming, and architecture.
- **Reading Literature**: He enjoys spending quiet time reading **Kannada novels and literature** (works by Kuvempu and Ravi Belagere).
- **Homely Lifestyle**: He appreciates simple, traditional homemade food and genuine, close-knit interactions.`;
  }

  // 9. Reading Interests, Kannada Literature, Authors
  if (
    matchIntent(
      parsed,
      ['reading', 'book', 'books', 'novel', 'novels', 'literature', 'author', 'authors', 'writer', 'writers', 'kuvempu', 'belagere', 'stories', 'poem', 'poetry', 'ಸಾಹಿತ್ಯ', 'ಕಾದಂಬರಿ', 'ಪುಸ್ತಕ', 'ಕುವೆಂಪು', 'ರವಿ ಬೆಳಗೆರೆ', 'ಓದು'],
      ['ravi belagere', 'kannada literature', 'kannada novel', 'kannada story', 'favorite author', 'favorite book', 'reading interest']
    )
  ) {
    return `**Raghu's Reading & Literary Interests:**
- Raghu has a strong fondness for reading **Kannada novels, literature, and stories**.
- He is particularly inspired by works and writings associated with **Rashtrakavi Kuvempu** and the prolific writer **Ravi Belagere**.
- Reading Kannada literature is his primary leisure pursuit to explore authentic storytelling and cultural thought.`;
  }

  // 10. Food Preferences & Home Cooked Dishes
  if (
    matchIntent(
      parsed,
      ['food', 'dishes', 'cuisine', 'cooking', 'cook', 'meal', 'meals', 'lunch', 'dinner', 'breakfast', 'diet', 'eating', 'hungry', 'taste', 'ಊಟ', 'ತಿಂಡಿ', 'ಆಹಾರ'],
      ['favorite food', 'prefer food', 'home food', 'homemade', 'home-cooked', 'traditional food', 'what does he eat', 'food preference', 'ಮನೆ ಊಟ', 'what he eats']
    )
  ) {
    return `**Raghu's Food Preferences:**
- Raghu generally prefers **homemade / traditional home-cooked food** and enjoys a comforting variety of authentic, homely Karnataka dishes.`;
  }

  // 11. Native Place, Hometown & Location
  if (
    matchIntent(
      parsed,
      ['hometown', 'native', 'origin', 'roots', 'location', 'bengaluru', 'bangalore', 'bidar', 'ಬೆಂಗಳೂರು', 'ಬೀದರ್'],
      ['native place', 'where is he from', 'where is raghu from', 'where does he live', 'based in', 'which city', 'where from', 'ಯಾವ ಊರು', 'ಎಲ್ಲಿ ವಾಸ', 'where is he located']
    )
  ) {
    return "Raghu originally hails from **Khatak Chincholi, Bhalki, Bidar district, Karnataka**, and currently resides and works in **Bengaluru, Karnataka, India**.";
  }

  // 12. Specific Projects
  if (matchIntent(parsed, ['klabo'], ['multi vendor', 'marketplace', 'creator marketplace', 'klabo marketplace'])) {
    return getKlaboInfo();
  }
  if (matchIntent(parsed, ['stalight'], ['stalight campus', 'stalight sync', 'campus erp'])) {
    return getStalightInfo();
  }
  if (matchIntent(parsed, ['neurocampus'], ['facial recognition attendance', 'co-po attainment'])) {
    return getNeuroCampusInfo();
  }
  if (matchIntent(parsed, ['neurosync'], ['interview intelligence', 'interview proctoring'])) {
    return "**NeuroSync** is a remote AI-powered interview intelligence and proctoring platform focused on online candidate evaluation workflows, student performance analytics, and automated proctoring intelligence.";
  }
  if (matchIntent(parsed, ['shadowlock'], ['steganography', 'aes encryption', 'hidden data', 'image security'])) {
    return "**ShadowLock** is a cybersecurity and computer vision application combining **AES encryption**, image-based **steganography** (concealed data embedding), and real-time **mood analysis** using Python, OpenCV, and FastAPI.";
  }
  if (matchIntent(parsed, ['vyomaa'], ['jewelry', 'jewellery', 'freelance project', 'vyomaa platform'])) {
    return "**Vyomaa (vyomaa.co.in)** is a full-featured production online jewelry e-commerce platform custom-engineered by Raghu, featuring custom catalog browsing, admin inventory control, and responsive modern UI.";
  }

  // 13. General Projects / Portfolio
  if (
    matchIntent(
      parsed,
      ['projects', 'portfolio', 'built', 'creations'],
      ['what did he build', 'what has he built', 'list of projects', 'project list', 'show projects', 'what projects', 'his projects', 'ಮಾಡಿದ ಪ್ರಾಜೆಕ್ಟ್']
    )
  ) {
    return `Raghu has engineered several end-to-end production applications and systems:
- **KLABO Marketplace**: Custom-built multi-vendor marketplace with customer, creator/seller, and super-admin workflows.
- **Stalight Campus ERP**: Complete smart campus ERP platform digitizing 15+ academic and administrative operations.
- **Stalight Sync**: Career preparation, technical placement, and learning platform.
- **NeuroCampus AI**: AI-driven smart campus with facial-recognition attendance, BLE, and automated CO-PO attainment.
- **NeuroSync**: AI interview evaluation, proctoring, and student performance dashboard.
- **ShadowLock**: Security & steganography suite with AES encryption and OpenCV vision.
- **Vyomaa (vyomaa.co.in)**: Production jewelry e-commerce platform and admin portal.`;
  }

  // 14. Higher Education / College / Degree / CGPA
  if (
    matchIntent(
      parsed,
      ['education', 'college', 'degree', 'engineering', 'amc', 'cgpa', 'grade', 'marks', 'graduation', 'university', 'academics', 'qualification', 'ಕಾಲೇಜು', 'ಶಿಕ್ಷಣ'],
      ['amc engineering college', 'b.e', 'btech', 'degree details', 'academic background', 'which college']
    )
  ) {
    return `**Raghu's Academic Background:**
- **Degree**: B.E. in Computer Science & Engineering (AI / ML)
- **Institution**: AMC Engineering College, Bengaluru, Karnataka
- **Graduation Year**: 2026
- **CGPA**: 7.8 / 10.0
- **Pre-University (PUC)**: BtVP Science College (Science - PCMB)
- **Schooling**: NVP Gurukul School, Khatak Chincholi, Bhalki, Bidar`;
  }

  // 15. Skills & Tech Stack
  if (
    matchIntent(
      parsed,
      ['skills', 'technologies', 'technology', 'stack', 'languages', 'frameworks', 'databases', 'frontend', 'backend', 'python', 'react', 'typescript', 'javascript', 'kotlin', 'ಕೌಶಲ್ಯ'],
      ['tech stack', 'what technologies', 'technical stack', 'what does he code in', 'coding skills', 'programming languages']
    )
  ) {
    return `**Raghu's Technical Stack:**
- **Languages**: Python, JavaScript, TypeScript, Kotlin
- **Frontend**: React, Next.js, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Django REST Framework, FastAPI, Flask
- **Databases**: PostgreSQL, Supabase, Redis, Firebase
- **AI/ML & Vision**: Python, OpenCV, PyTorch, TensorFlow/Keras, dlib
- **Cloud & DevOps**: Google Cloud, Vercel, Cloudflare R2, Docker
- **APIs & Tools**: REST APIs, WebSockets, Git, GitHub, npm, pnpm`;
  }

  // 16. Experience & Internships
  if (
    matchIntent(
      parsed,
      ['experience', 'intern', 'internship', 'internships', 'career', 'ಅನುಭವ'],
      ['work history', 'work experience', 'where has he worked', 'job history', 'past work', 'past experience']
    )
  ) {
    return `**Raghu's Professional Experience:**
1. **Stalight Technologies** (*Present*): Full-Stack AI Developer building Stalight Campus ERP and AI automation systems.
2. **MindMatrix & VTU** (*Feb - May 2026*): Android App Dev (GenAI) Intern — built Kotlin/Jetpack Compose apps with Google Cloud & AI Studio. Rated EXCELLENT.
3. **Castlerockin Pvt Ltd / Crack The Campus** (*Feb - May 2025*): Frontend Developer Intern — developed responsive web & mobile UI using React Native & React.
4. **Vyomaa** (*Freelance*): Built and delivered full production jewelry e-commerce platform (vyomaa.co.in).`;
  }

  // 17. Contact, Email, Phone, Socials & Hiring
  if (
    matchIntent(
      parsed,
      ['contact', 'email', 'phone', 'mobile', 'call', 'number', 'hire', 'reach', 'message', 'linkedin', 'github', 'whatsapp', 'instagram', 'connect', 'mail', 'telephone', 'chat', 'ಸಂಪರ್ಕ'],
      ['reach out', 'contact details', 'how to contact', 'get in touch', 'contact raghu', 'send message']
    )
  ) {
    return `You can connect with Raghu directly via:
- 📧 **Email**: [raghupanchal21@gmail.com](mailto:raghupanchal21@gmail.com)
- 📱 **WhatsApp / Phone**: [+91 9380937502](https://wa.me/919380937502)
- 💼 **LinkedIn**: [Raghuveer Panchal](https://www.linkedin.com/in/raghuveer-panchal-27093428a/)
- 💻 **GitHub**: [github.com/raghupanchal](https://github.com/raghupanchal)
- 📸 **Instagram**: [@raghu.panchal](https://www.instagram.com/raghu.panchal/)`;
  }

  // 18. Personal Profile / Who is Raghu / Summary
  if (
    matchIntent(
      parsed,
      ['introduce', 'bio', 'summary', 'profile', 'engineer', 'ಯಾರು'],
      ['who is raghu', 'about raghu', 'tell me about raghu', 'who are you', 'about yourself', 'who is raghu panchal', 'tell me about him', 'tell me about your boss']
    )
  ) {
    return "**Raghu Panchal** is a Software Engineer specializing in full-stack web applications, AI/ML systems, and scalable product architecture based in Bengaluru, Karnataka (originally from Bidar). He is a product builder who focuses on turning ideas into functional, real-world digital solutions.";
  }

  // 19. Age / Date of Birth
  if (matchIntent(parsed, ['dob', 'birthday', 'born'], ['date of birth', 'when was he born', 'how old is raghu', 'birth date'])) {
    return "Raghu Panchal was born on **23 October 2004** in Karnataka, India.";
  }

  // 20. Standalone Greetings Check
  if (
    tokens.some((t) =>
      ['hi', 'hello', 'hey', 'namaskara', 'namaskar', 'namasthe', 'namaste', 'vanakkam', 'sup', 'ನಮಸ್ಕಾರ', 'ನಮಸ್ಕಾರ್ರೀ', 'ಹಲೋ', 'ಹಾಯ್'].includes(t)
    ) && tokens.length <= 3
  ) {
    return "🙏 **ನಮಸ್ಕಾರ್ರೀ ದೊಡ್ಡಮಂದಿಗೆ!** I'm **RP**, Raghu Panchal's personal AI representative. How can I assist you today?";
  }

  // Fallback response for unlisted / off-topic queries
  return "I don't have that specific information about Raghu yet. How can I assist you with his background, skills, or projects?";
}

function getKlaboInfo() {
  return `**KLABO Marketplace** is a fully custom-coded multi-vendor marketplace for handmade, personalized, and creator products.

**Key Highlights:**
- **Custom Architecture**: Built completely from the ground up (it is **NOT** a template or Shopify store).
- **Multi-Tier Workflows**: Dedicated customer, creator/seller, and super-admin portals.
- **Core Features**: Role-based authentication, product customization workflows, inventory/order tracking, and seller analytics dashboards.
- **Tech Stack**: React, TypeScript, Tailwind CSS, PostgreSQL / Supabase backend, and Cloudflare R2 for media storage.`;
}

function getStalightInfo() {
  return `**Stalight Campus ERP & Stalight Sync:**
- **Stalight Campus**: An all-in-one smart campus ERP digitizing academic & administrative operations including student/faculty management, attendance, exam workflows, leave tracking, and role-based access across 15+ modules.
- **Stalight Sync**: A specialized learning and placement platform for student career readiness and technical programming content.`;
}

function getNeuroCampusInfo() {
  return `**NeuroCampus** is an AI-first smart campus management platform featuring:
- AI facial-recognition & BLE attendance
- Automated CO-PO attainment calculation
- Role-based dashboards (Admin, Faculty, Student)
- Real-time campus safety analytics and interview intelligence
- **Tech Stack**: React, TypeScript, Django REST Framework, PostgreSQL, Redis, WebSockets, Python, OpenCV, and TensorFlow/Keras.`;
}
