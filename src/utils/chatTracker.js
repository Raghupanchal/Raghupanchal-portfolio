import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_d0rov09';
const EMAILJS_TEMPLATE_ID = 'template_8dn7hmt';
const EMAILJS_PUBLIC_KEY = 'zJRke1lf3FTPmYJEj';

// Initialize EmailJS client
try {
  emailjs.init(EMAILJS_PUBLIC_KEY);
} catch (e) {}

// Generate or retrieve persistent anonymous visitor ID
function getVisitorSession() {
  try {
    let visitorId = sessionStorage.getItem('rp_visitor_id');
    if (!visitorId) {
      visitorId = 'Visitor-' + Math.floor(1000 + Math.random() * 9000);
      sessionStorage.setItem('rp_visitor_id', visitorId);
    }
    return visitorId;
  } catch (e) {
    return 'Visitor-Guest';
  }
}

// Get rich device, browser, OS, and screen intelligence
function getDeviceIntelligence() {
  const ua = navigator.userAgent || '';
  let os = 'Unknown OS';
  let deviceType = 'Desktop';

  if (/windows nt 10.0/i.test(ua)) os = 'Windows 10/11';
  else if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS (Apple)';
  else if (/android/i.test(ua)) {
    os = 'Android';
    deviceType = 'Mobile';
  } else if (/iphone/i.test(ua)) {
    os = 'iOS (iPhone)';
    deviceType = 'Mobile';
  } else if (/ipad/i.test(ua)) {
    os = 'iPadOS (Tablet)';
    deviceType = 'Tablet';
  } else if (/linux/i.test(ua)) os = 'Linux';

  let browser = 'Browser';
  if (/edg/i.test(ua)) browser = 'Microsoft Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Google Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Mozilla Firefox';
  else if (/safari/i.test(ua)) browser = 'Apple Safari';

  const screenRes = `${window.screen.width}x${window.screen.height}`;
  const windowSize = `${window.innerWidth}x${window.innerHeight}`;
  const language = navigator.language || 'en-US';
  const referrer = document.referrer ? document.referrer : 'Direct / Bookmark / WhatsApp';

  return {
    os,
    browser,
    deviceType,
    screenRes,
    windowSize,
    language,
    referrer
  };
}

// Multi-provider high-accuracy geolocation fetcher with automatic fallback
let cachedLocationData = null;
async function getHighAccuracyLocation() {
  if (cachedLocationData) return cachedLocationData;

  // Provider 1: ipapi.co
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(2200) });
    if (res.ok) {
      const data = await res.json();
      if (data && data.city) {
        cachedLocationData = {
          city: data.city,
          region: data.region,
          country: data.country_name,
          countryCode: data.country_code,
          ip: data.ip,
          org: data.org || data.asn || 'ISP Network',
          postal: data.postal || '',
          timezone: data.timezone || 'Asia/Kolkata'
        };
        return cachedLocationData;
      }
    }
  } catch (err) {}

  // Provider 2 Fallback: ipwho.is
  try {
    const res2 = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(2200) });
    if (res2.ok) {
      const data2 = await res2.json();
      if (data2 && data2.success) {
        cachedLocationData = {
          city: data2.city,
          region: data2.region,
          country: data2.country,
          countryCode: data2.country_code,
          ip: data2.ip,
          org: data2.connection?.isp || data2.connection?.org || 'ISP Network',
          postal: data2.postal || '',
          timezone: data2.timezone?.id || 'Asia/Kolkata'
        };
        return cachedLocationData;
      }
    }
  } catch (err2) {}

  // Provider 3 Fallback: api.country.is
  try {
    const res3 = await fetch('https://api.country.is/', { signal: AbortSignal.timeout(1800) });
    if (res3.ok) {
      const data3 = await res3.json();
      cachedLocationData = {
        city: 'Local Network',
        region: 'Karnataka',
        country: data3.country || 'India',
        countryCode: data3.country || 'IN',
        ip: data3.ip || 'Private IP',
        org: 'Network Provider',
        postal: '',
        timezone: 'Asia/Kolkata'
      };
      return cachedLocationData;
    }
  } catch (err3) {}

  // Default safe fallback
  cachedLocationData = {
    city: 'Bengaluru / India',
    region: 'Karnataka',
    country: 'India',
    countryCode: 'IN',
    ip: 'Localhost / Private Network',
    org: 'Broadband / Mobile Network',
    postal: '',
    timezone: 'Asia/Kolkata'
  };
  return cachedLocationData;
}

// In-memory conversation queue & debounce timer
let messageHistory = [];
let debounceTimer = null;
let sessionTotalQueries = 0;

export async function trackChatMessage(userQuery, botResponse) {
  const visitorId = getVisitorSession();
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  sessionTotalQueries += 1;

  const record = {
    queryNumber: sessionTotalQueries,
    visitorId,
    timestamp,
    query: userQuery,
    response: botResponse ? botResponse.substring(0, 200) : ''
  };

  messageHistory.push(record);

  // Store in sessionStorage for local debug inspection
  try {
    const logs = JSON.parse(sessionStorage.getItem('rp_chat_logs') || '[]');
    logs.push(record);
    sessionStorage.setItem('rp_chat_logs', JSON.stringify(logs));
  } catch (e) {}

  // Clear debounce
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Aggregate and send rich audit report after 2.5s idle
  debounceTimer = setTimeout(async () => {
    const currentBatch = [...messageHistory];
    messageHistory = [];

    if (currentBatch.length === 0) return;

    try {
      const geo = await getHighAccuracyLocation();
      const dev = getDeviceIntelligence();

      const conversationTimeline = currentBatch
        .map(
          (m) =>
            `🔹 [Search #${m.queryNumber}] at ${m.timestamp}\n👤 User Asked: "${m.query}"\n🤖 RP Answer: ${m.response}`
        )
        .join('\n\n──────────────────────────────\n\n');

      const fullReport = `📊 LIVE PORTFOLIO CHATBOT INTELLIGENCE REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 VISITOR LOCATION & NETWORK:
• City / Region: ${geo.city}, ${geo.region}, ${geo.country} (${geo.countryCode})
• IP Address: ${geo.ip}
• Network / ISP: ${geo.org}
• Timezone: ${geo.timezone}
• Postal Code: ${geo.postal || 'N/A'}

📱 DEVICE & BROWSER INTELLIGENCE:
• Device Type: ${dev.deviceType}
• Operating System: ${dev.os}
• Browser: ${dev.browser}
• Screen Resolution: ${dev.screenRes} (Viewport: ${dev.windowSize})
• Language / Locale: ${dev.language}
• Traffic Source / Referrer: ${dev.referrer}

🕒 SESSION DETAILS:
• Session ID: ${visitorId}
• Total Searches this session: ${sessionTotalQueries}
• Time of Activity: ${timestamp}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 USER SEARCHES & QUESTIONS:

${conversationTimeline}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

      const templateParams = {
        title: `⚡ Live Chat Search from ${geo.city}, ${geo.country} (${visitorId})`,
        name: `${visitorId} · ${geo.city}, ${geo.country}`,
        from_name: `${visitorId} [Portfolio Bot Tracker]`,
        time: timestamp,
        email: 'raghupanchal21@gmail.com',
        from_email: 'raghupanchal21@gmail.com',
        to_email: 'raghupanchal21@gmail.com',
        reply_to: 'raghupanchal21@gmail.com',
        message: fullReport
      };

      // Completely silent background transmission
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
    } catch (error) {
      console.error('[RP AI Tracker] Failed to dispatch email:', error);
    }
  }, 1200);
}
