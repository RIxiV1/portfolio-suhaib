export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  category: string;
  thumbnail: string;
  link: string;
  featured?: boolean;
  codeSnippet?: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "infoblend",
    title: "InfoBlend",
    tagline: "AI-powered in-page intelligence.",
    description: "Chrome extension (Manifest V3). AI-powered in-page definitions, page summaries, ad blocking, and intelligent form auto-fill. All client-side, all private.",
    tags: ["JavaScript", "Chrome API", "AI", "Manifest V3"],
    category: "AI",
    thumbnail: "https://lh3.googleusercontent.com/aida/ADBb0ujksiin_bPXCOP-b3JS0kmDfvBPSUFW683FGg8v4NXNlO0Y9JC8z9unD5qdiLUwk3i9HzaAdvmsjoN9RJwEr-3TVr0V7XG113rTJ8_AYezdiiZ-ffzFTts-7JFhRl8XbfTAauXwYW7WLkj9zKDGyDdiHD6wqeNYPqeyCk_GbBQRiyLa3KTvAnk-bv9jSQ_Nx2CaX3l8cFSyujOwCYDbRRrR4yj-gefgUV4kk0_wpytQ6bUM8TEotEBvxIM",
    link: "https://github.com/RIxiV1",
    featured: true,
    color: "#256af4",
    codeSnippet: `chrome.runtime.onMessage.addListener((req, _, sendResponse) => {
  if (req.action === "summarize") {
    ai.summarize(document.body.innerText)
      .then(s => sendResponse({ summary: s }));
    return true; // keep channel open
  }
});`
  },
  {
    id: "subsentry",
    title: "SubSentry",
    tagline: "Your fin-bestie for subscription tracking.",
    description: "Stop letting subscriptions ghost your bank account. SubSentry tracks, categorizes, and alerts you before renewals hit.",
    tags: ["TypeScript", "React", "Finance"],
    category: "Frontend",
    thumbnail: "https://lh3.googleusercontent.com/aida/ADBb0ui31wPU8hsdI_TGSp20DcYtDeYmFHCAwmLUHrvUuMCBKI82zhEZefdpCMSRnt44y76pyMWFWdM528q3zrOvZ9k0u1-Y7hIHWJJqRfuluya3mQVjVpU7Ldap-xMNbsWxOvCfYq0Tzi2Irao5MJwv43gaB8OyBzoj8jkqpLzPDac1Vi_HC1hEwv02jOPX1-8KjDlqmPoBzk5V83knTWQzoRDrDd7copYYHdYplT2O2EcotFX2vTKFcv1Ca0g",
    link: "https://github.com/RIxiV1",
    featured: true,
    color: "#8b5cf6",
    codeSnippet: `const calcMonthly = (subs: Subscription[]) =>
  subs.reduce((acc, s) =>
    acc + (s.frequency === 'monthly' ? s.price : s.price / 12)
  , 0);`
  },
  {
    id: "jarvis",
    title: "Jarvis",
    tagline: "Voice-activated AI assistant.",
    description: "Speech recognition + OpenAI. Plays music, opens websites, answers questions. Built in Python.",
    tags: ["Python", "OpenAI", "Speech Recognition"],
    category: "AI",
    thumbnail: "https://lh3.googleusercontent.com/aida/ADBb0ugW2uQ0jTi1uAO7qj72tDC73O2qDdAExcFYIUW6VkaOJGFd0THut2cSvKA9sNP5DnNKjgi8j9TIRpaV_xNJ30HxDIAWfaK45yGUPMoGbhOz6N2bvuNqrcpF7f8uHJCFs0Uvxaw1emQq2LLeQTO1Tj1xMZc7NB6GuDo4_JsfKyE35MXFpdKit3XNjjKz-5wbwdkZ5CeJo70l4zWd1ySxTLnCof7a-jhEqX2wN3IanQDg4BhM-tEa3iZvIvA",
    link: "https://github.com/RIxiV1",
    color: "#10b981",
    codeSnippet: `def listen_and_act():
    audio = recognizer.listen(mic)
    text = recognizer.recognize_google(audio)
    response = openai.chat(text)
    speak(response)`
  },
  {
    id: "resume-agent",
    title: "Resume Screening Agent",
    tagline: "AI-powered applicant filtering.",
    description: "n8n + Lovable. PDF upload → LLM scoring → structured match report. Designed to cut hiring noise.",
    tags: ["TypeScript", "n8n", "LLMs"],
    category: "AI",
    thumbnail: "https://lh3.googleusercontent.com/aida/ADBb0ujRL5OL2qNFuHSvwWQXvzmsvME6CXRhKwj-kvRjoh6gpS9oVcL50Lqi9Nz5EAoFVYRG84rEDvpkhf_xeamO4Lyo5_pnwyCl_P3hW-mexcXhR2cR6VRilPeRRRLLIH3MAyaYEn7PzSV2kVWLJC-ZY-_w5CxkETEubSxQIUKGjbD5fEdCkBnDmWdybHVGtJWHLMD8lSaCUR8iHGRHJqAP5bFA-46uLa9hRLwBTpNbP07oE_RbvdXeVL7Wb5g",
    link: "https://github.com/RIxiV1",
    color: "#f59e0b",
    codeSnippet: `const score = await llm.score({
  resume: parsePDF(file),
  requirements: jobSpec.criteria,
  format: 'structured'
});`
  }
];
