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
  'wrking': 'working',
  'destn': 'destination',
  'dest': 'destination',
  'travelling': 'travel',
  'traveling': 'travel',
  'trvl': 'travel',
  'hii': 'hi',
  'hiii': 'hi',
  'hiiii': 'hi',
  'heyy': 'hey',
  'heyyy': 'hey',
  'heyyyy': 'hey',
  'hlo': 'hello',
  'hlw': 'hello',
  'gm': 'good morning',
  'gn': 'good night'
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

  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) {
      return true;
    }
  }

  for (const kw of requiredKeywords) {
    const k = kw.toLowerCase();
    if (tokens.includes(k) || meaningful.includes(k)) {
      return true;
    }
  }

  return false;
}

// Random selector helper
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Dedicated Greeting Handler
function handleGreeting(rawInput, parsed) {
  const { text, tokens } = parsed;
  const rawLower = rawInput.toLowerCase().trim();

  // 1. Kannada / Doddmandige Greetings
  const isKannadaGreeting =
    text.includes('namaskara') ||
    text.includes('namaskar') ||
    text.includes('namaste') ||
    text.includes('namasthe') ||
    text.includes('doddmandige') ||
    text.includes('dodd mandige') ||
    text.includes('hengiddira') ||
    text.includes('hegiddira') ||
    text.includes('en samachara') ||
    text.includes('yen samachara') ||
    text.includes('ootha') ||
    rawLower.includes('ನಮಸ್ಕಾರ') ||
    rawLower.includes('ನಮಸ್ಕಾರ್ರೀ') ||
    rawLower.includes('ದೊಡ್ಡಮಂದಿಗೆ') ||
    rawLower.includes('ಹೇಗಿದ್ದೀರಾ');

  if (isKannadaGreeting) {
    if (text.includes('doddmandige') || text.includes('dodd mandige') || rawLower.includes('ದೊಡ್ಡಮಂದಿಗೆ')) {
      return pickRandom([
        "🙏 **ನಮಸ್ಕಾರ್ರೀ ದೊಡ್ಡಮಂದಿಗೆ!** Welcome! I'm **RP**, Raghu Panchal's AI assistant. Hegiddira? What would you like to explore today — his software projects, tech skills, childhood, or reading interests?",
        "🙏 **ನಮಸ್ಕಾರ್ರೀ ದೊಡ್ಡಮಂದಿಗೆ!** Great to connect with you! I'm **RP**, representing Raghu. How can I help you today? Ask me anything about Raghu's apps, engineering work, or background.",
        "🙏 **ನಮಸ್ಕಾರ್ರೀ ದೊಡ್ಡಮಂದಿಗೆ!** Welcome to Raghu's portfolio space! I'm **RP**. Feel free to ask about his projects like KLABO & Stalight, his skills, or his favorite Kannada novels! 😊"
      ]);
    }

    if (text.includes('hengiddira') || text.includes('hegiddira') || rawLower.includes('ಹೇಗಿದ್ದೀರಾ')) {
      return pickRandom([
        "🙏 **ನಮಸ್ಕಾರ!** ನಾನು ಚೆನ್ನಾಗಿದ್ದೀನಿ (I'm doing great!), thank you! Hegiddira neevu? I'm **RP**, Raghu's AI assistant. What would you like to know about Raghu today?",
        "🙏 **Namaskara!** All good here! 😊 How are you doing? I can tell you about Raghu's software projects, skills, education, or how to get in touch with him."
      ]);
    }

    if (text.includes('en samachara') || text.includes('yen samachara')) {
      return pickRandom([
        "🙏 **Namaskara ri!** All good here, just helping visitors learn more about Raghu and his work! What's on your mind today — his projects, tech stack, or background?",
        "🙏 **Namaskara!** En samachara? I'm **RP**, Raghu's AI rep. Ready to answer anything about Raghu's builds, skills, or stories!"
      ]);
    }

    return pickRandom([
      "🙏 **ನಮಸ್ಕಾರ್ರೀ!** Welcome! I'm **RP**, Raghu Panchal's personal AI assistant. What would you like to explore — his projects, technical stack, childhood, or education?",
      "🙏 **Namaskara!** Great to meet you. I'm **RP**, representing Raghu. Feel free to ask about his software projects, skills, reading interests, or contact details.",
      "🙏 **ನಮಸ್ಕಾರ!** Welcome to Raghu's portfolio! How can I help you today? Ask away about his latest projects, background, or personality."
    ]);
  }

  // 2. Time-Based Greetings
  if (text.includes('good morning') || tokens.includes('gm') || text.includes('shubhodaya')) {
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

  // 3. "How are you?" / "How're you doing?"
  if (
    text.includes('how are you') ||
    text.includes('how r u') ||
    text.includes('how do you do') ||
    text.includes('how are you doing') ||
    text.includes('hows it going') ||
    text.includes('how is it going') ||
    text.includes('hows you')
  ) {
    return pickRandom([
      "I'm doing great, thanks for asking! 😊 Ready to share anything you'd like to know about Raghu — his software projects, engineering experience, childhood, or tech skills. What's on your mind?",
      "Doing wonderful, thank you! How are you doing? I'm here as Raghu's AI assistant to answer questions about his apps, work at Stalight, Kannada literature interests, and more.",
      "All systems running smoothly! 🚀 Appreciate you asking. What would you like to explore about Raghu today — projects, skills, background, or personal interests?"
    ]);
  }

  // 4. "What's up?" / Casual Slang
  if (
    text.includes('whats up') ||
    text.includes('what up') ||
    text.includes('what s up') ||
    tokens.includes('sup') ||
    tokens.includes('wassup') ||
    tokens.includes('yo')
  ) {
    return pickRandom([
      "Hey! Not much, just here representing Raghu and ready to answer any questions. What would you like to check out — his projects, skills, background, or personal interests?",
      "Hey there! Everything's great on this side. What brings you to Raghu's portfolio today? I can tell you about his builds, tech stack, childhood in Bidar, or contact info.",
      "Yo! Welcome to the space. I'm **RP**, Raghu's AI assistant. Ask away about his projects, coding stack, or favorite Kannada novels! 🚀"
    ]);
  }

  // 5. Named Greetings (Hey Raghu, Hello RP, etc.)
  if (
    text.includes('hey raghu') ||
    text.includes('hello raghu') ||
    text.includes('hi raghu') ||
    text.includes('hi rp') ||
    text.includes('hey rp') ||
    text.includes('hello rp')
  ) {
    return pickRandom([
      "Hey there! 👋 I'm **RP**, Raghu's personal AI assistant (Raghu himself is probably writing code or reading Kannada literature right now!). How can I help you today?",
      "Hello! Great to meet you. I'm **RP**, representing Raghu Panchal. What would you like to know about Raghu — his projects, tech stack, work experience, or background?",
      "Hi! 👋 Welcome. I'm **RP**, ready to assist you. Feel free to ask about Raghu's software creations, skills, education, or how to connect directly."
    ]);
  }

  // 6. General / Casual Greetings (Hi, Hello, Hey, Hii, Hlo, Heyy, etc.)
  const greetingTokens = ['hi', 'hello', 'hey', 'hii', 'hiii', 'heyy', 'heyyy', 'hlo', 'hlw', 'hola'];
  const isCasualGreeting = tokens.some((t) => greetingTokens.includes(t)) && tokens.length <= 4;

  if (isCasualGreeting) {
    return pickRandom([
      "Hey there! 👋 I'm **RP**, Raghu's personal AI assistant. Great to meet you! Feel free to ask me anything about Raghu's projects, technical skills, education, or personality.",
      "Hello! Welcome to Raghu's portfolio space. I'm **RP**, here to help you get to know Raghu — whether you're curious about his projects, work experience, childhood, or hobbies. What would you like to check out?",
      "Hi there! 👋 Hope you're having a great day. What would you like to know about Raghu today? You can ask about his builds (like KLABO or Stalight), his tech stack, or how to connect with him.",
      "Hey! Thanks for stopping by. I'm **RP**, Raghu's AI representative. Let me know what you'd like to explore — skills, projects, education, or even his favorite books!"
    ]);
  }

  return null;
}

export function getRPResponse(rawInput, conversationHistory = []) {
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
    return `⚠️ **Please don't ask inappropriate or personal gossip questions!**

I am **RP**, Raghu Panchal's professional AI representative. Let's keep this conversation clean and professional.

Feel free to ask about his **software projects (KLABO, Stalight, NeuroCampus)**, **technical skills**, **work experience**, or **contact details**! 💼🚀`;
  }

  // 3. Natural Greeting Check (Prioritized first for greetings)
  const greetingResponse = handleGreeting(rawInput, parsed);
  if (greetingResponse) {
    return greetingResponse;
  }

  // 4. Secret / Easter Egg / Classified
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

  // 5. Working Status / Current Job / Employment
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

  // 6. Favorite Friends, Best Friends & Social Circle
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

  // 7. Personality, Nature, Introvert & Selective Circle
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

  // 8. Childhood, Schooling & Early Education
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

  // 9. Likes, Calm & Peaceful Places, Leisure Preferences
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

  // 10. Reading Interests, Kannada Literature, Authors
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

  // 11. Food, Drinks, Sweets & Cake Preferences
  if (
    matchIntent(
      parsed,
      ['food', 'dishes', 'cuisine', 'cooking', 'cook', 'meal', 'meals', 'lunch', 'dinner', 'breakfast', 'diet', 'eating', 'hungry', 'taste', 'tea', 'chai', 'coffee', 'drink', 'beverage', 'sweet', 'sweets', 'dessert', 'jamun', 'gulab', 'cake', 'cheesecake', 'biscoff', 'ಊಟ', 'ತಿಂಡಿ', 'ಆಹಾರ', 'ಚಹಾ', 'ಸಿಹಿ', 'ಕೇಕ್'],
      ['favorite food', 'prefer food', 'home food', 'homemade', 'home-cooked', 'traditional food', 'what does he eat', 'food preference', 'favorite drink', 'favourite drink', 'favorite beverage', 'tea or coffee', 'favorite sweet', 'favourite sweet', 'favorite cake', 'favourite cake', 'biscoff cheesecake', 'gulab jamun', 'what he eats']
    )
  ) {
    if (matchIntent(parsed, ['cake', 'cheesecake', 'biscoff'], ['favorite cake', 'favourite cake', 'biscoff cheesecake', 'which cake'])) {
      return "🍰 **Raghu's Favorite Cake:** **Lotus Biscoff Cheesecake** — rich, creamy, and topped with signature caramelized Biscoff crunch!";
    }
    if (matchIntent(parsed, ['sweet', 'sweets', 'dessert', 'jamun', 'gulab'], ['favorite sweet', 'favourite sweet', 'gulab jamun', 'which sweet'])) {
      return "🍯 **Raghu's Favorite Sweet:** **Gulab Jamun (Jamun)** — warm, soft, and sweet!";
    }
    if (matchIntent(parsed, ['tea', 'chai', 'coffee', 'drink', 'beverage'], ['favorite drink', 'favourite drink', 'tea or coffee', 'favorite beverage'])) {
      return "☕ **Raghu's Favorite Drink:** **Tea (Chai)** — his daily go-to drink to recharge and fuel coding sessions!";
    }
    return `**Raghu's Food & Taste Preferences:**
- 🍲 **Food**: Generally prefers **homemade / traditional home-cooked food** and comforting authentic Karnataka dishes.
- ☕ **Favorite Drink**: **Tea (Chai)**.
- 🍯 **Favorite Sweet**: **Gulab Jamun (Jamun)**.
- 🍰 **Favorite Cake**: **Lotus Biscoff Cheesecake**.`;
  }

  // 12. Favorite Travel Destination & Places
  if (
    matchIntent(
      parsed,
      [
        'travel', 'trip', 'trips', 'destination', 'destinations', 'queenstown', 'zealand',
        'tour', 'tourism', 'tourist', 'vacation', 'vacations', 'holiday', 'holidays',
        'visit', 'wanderlust', 'place', 'places', 'country', 'flight', 'explore',
        'ಪ್ರವಾಸ', 'ಸ್ಥಳ', 'ಊರು', 'ದೇಶ'
      ],
      [
        'favorite travel destination',
        'favourite travel destination',
        'favorite destination',
        'favourite destination',
        'dream destination',
        'dream place',
        'favorite place to visit',
        'favourite place to visit',
        'where does he want to travel',
        'where does he like to travel',
        'where he wants to go',
        'where does he want to go',
        'where would he like to go',
        'favorite place',
        'favourite place',
        'favorite country',
        'favourite country',
        'favorite city',
        'favourite city',
        'places he likes to visit',
        'where to travel',
        'dream travel',
        'favorite tourist spot',
        'favourite tourist spot',
        'travel spot',
        'best travel destination',
        'travel preference',
        'travel wish',
        'travel bucket list',
        'bucket list place',
        'bucket list destination',
        'queenstown',
        'new zealand'
      ]
    )
  ) {
    return "🏔️ **Raghu's Favorite Travel Destination:** **Queenstown, New Zealand** — he is fascinated by its peaceful alpine mountains, crystal-clear lakes, pristine nature, and breathtaking scenic beauty.";
  }

  // 13. Native Place, Hometown & Location
  if (
    matchIntent(
      parsed,
      ['hometown', 'native', 'origin', 'roots', 'location', 'bengaluru', 'bangalore', 'bidar', 'ಬೆಂಗಳೂರು', 'ಬೀದರ್'],
      ['native place', 'where is he from', 'where is raghu from', 'where does he live', 'based in', 'which city', 'where from', 'ಯಾವ ಊರು', 'ಎಲ್ಲಿ ವಾಸ', 'where is he located']
    )
  ) {
    return "Raghu originally hails from **Khatak Chincholi, Bhalki, Bidar district, Karnataka**, and currently resides and works in **Bengaluru, Karnataka, India**.";
  }

  // 13. Specific Projects & Entrepreneurial Venture (KLABO)
  if (
    matchIntent(
      parsed,
      ['klabo', 'entrepreneur', 'entrepreneurship', 'startup', 'venture', 'marketplace', 'creator', 'handmade'],
      ['multi vendor', 'creator marketplace', 'klabo marketplace', 'raghu startup', 'entrepreneurial dream', 'dream project', 'flagship project', 'custom marketplace', 'unique products', 'handmade products']
    )
  ) {
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

  // 14. General Projects / Portfolio
  if (
    matchIntent(
      parsed,
      ['projects', 'portfolio', 'built', 'creations'],
      ['what did he build', 'what has he built', 'list of projects', 'project list', 'show projects', 'what projects', 'his projects', 'ಮಾಡಿದ ಪ್ರಾಜೆಕ್ಟ್']
    )
  ) {
    return `Raghu has engineered several end-to-end production applications and systems:
- **KLABO Marketplace**: Raghu's entrepreneurial venture — custom multi-vendor marketplace for handmade, creator, and unique products.
- **Stalight Campus ERP**: Complete smart campus ERP platform digitizing 15+ academic and administrative operations.
- **Stalight Sync**: Career preparation, technical placement, and learning platform.
- **NeuroCampus AI**: AI-driven smart campus with facial-recognition attendance, BLE, and automated CO-PO attainment.
- **NeuroSync**: AI interview evaluation, proctoring, and student performance dashboard.
- **ShadowLock**: Security & steganography suite with AES encryption and OpenCV vision.
- **Vyomaa (vyomaa.co.in)**: Production jewelry e-commerce platform and admin portal.`;
  }

  // 15. Higher Education / College / Degree / CGPA
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

  // 16. Skills & Tech Stack
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

  // 17. Experience & Internships
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

  // 18. Contact, Email, Phone, Socials & Hiring
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

  // 19. Personal Profile / Who is Raghu / Summary
  if (
    matchIntent(
      parsed,
      ['introduce', 'bio', 'summary', 'profile', 'engineer', 'ಯಾರು'],
      ['who is raghu', 'about raghu', 'tell me about raghu', 'who are you', 'about yourself', 'who is raghu panchal', 'tell me about him', 'tell me about your boss']
    )
  ) {
    return "**Raghu Panchal** is a Software Engineer specializing in full-stack web applications, AI/ML systems, and scalable product architecture based in Bengaluru, Karnataka (originally from Bidar). He is a product builder who focuses on turning ideas into functional, real-world digital solutions.";
  }

  // 20. Age / Date of Birth
  if (matchIntent(parsed, ['dob', 'birthday', 'born'], ['date of birth', 'when was he born', 'how old is raghu', 'birth date'])) {
    return "Raghu Panchal was born on **23 October 2004** in Karnataka, India.";
  }

  // 21. Contextual Follow-up Handler ("tell me more", "what else", "more details")
  if (
    matchIntent(
      parsed,
      ['more', 'details', 'elaborate'],
      ['tell me more', 'what else', 'more details', 'anything else', 'tell more']
    ) &&
    conversationHistory.length > 0
  ) {
    // Look at previous bot message to see what was discussed
    const lastBotMessage = [...conversationHistory].reverse().find((m) => m.sender === 'bot');
    if (lastBotMessage) {
      const lastText = lastBotMessage.text.toLowerCase();
      if (lastText.includes('klabo') || lastText.includes('stalight') || lastText.includes('projects')) {
        return `Here are more details about Raghu's software creations:
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

  // Fallback response for unlisted / off-topic queries
  return "I don't have that specific information about Raghu yet. I can tell you all about his **software projects**, **tech stack**, **experience at Stalight**, **education**, or **personal interests**. What would you like to check out?";
}

function getKlaboInfo() {
  return `✨ **KLABO Marketplace — Raghu's Entrepreneurial Dream & Flagship Venture:**

**KLABO** is Raghu's entrepreneurial venture — a completely custom-built multi-vendor marketplace designed from the ground up for handmade, creator, personalized, and unique products.

**Key Highlights:**
- 🚀 **Entrepreneurial Vision**: Built to empower independent creators, artisans, and boutique sellers with their own branded digital storefronts and unified discovery.
- 🛠️ **100% Custom Architecture**: Coded entirely from scratch (it is **NOT** a template, WordPress, or Shopify store).
- 👥 **Multi-Tier Workflows**: Dedicated custom portals for customers (discovery, cart & orders), creators/sellers (storefront, inventory & sales analytics), and super-admins.
- ⚙️ **Core Capabilities**: Role-based authentication, customized product configurators, real-time inventory tracking, and seller performance dashboards.
- 💻 **Tech Stack**: React, TypeScript, Tailwind CSS, PostgreSQL / Supabase, and Cloudflare R2 for structured media storage.`;
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
