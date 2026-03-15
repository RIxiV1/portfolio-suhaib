export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  link: string;
  codeSnippet?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "InfoBlend",
    description: "Chrome extension (Manifest V3). AI-powered in-page definitions, page summaries, ad blocking, intelligent form auto-fill. All client-side.",
    tags: ["JavaScript", "Chrome API", "AI"],
    thumbnail: "https://lh3.googleusercontent.com/aida/AOfcidVTdBUWxTB_mqqPWDTcGbFoULbpMck3sqOVQM_v0wp2J9ObBOrI25-pEn05kmP8u2QXMNQOMI3EERSR42fsPzv9ZBuQapj6lw2mQXOqYw2bsyqgv-uqn6uJNmvY-C-Sr20bSwaj8W9ci5XwpqjPy8Ic7EWn_L6qaLFFUUwI2hXvRc1YH1--HIxTgctx8pvx29KZVn3NTOb_J7-ndb8L8dOjCAyneoGUGGAF6xpcs3PU2poA69yEVG_SS0Ux",
    link: "https://github.com/RIxiV1",
    codeSnippet: `// Chrome Extension Manifest V3 Logic
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    const text = document.body.innerText;
    ai.generateSummary(text).then(summary => {
      sendResponse({ summary });
    });
    return true; // Keep channel open
  }
});`
  },
  {
    id: "2",
    title: "SubSentry",
    description: "Subscription tracker. Your fin-bestie for tracking subs. Stop letting them ghost your bank account.",
    tags: ["TypeScript", "Frontend"],
    thumbnail: "https://lh3.googleusercontent.com/aida/AOfcidUOhRquqwc8dJ-D2vH13Jp0mEzDTLCAqRSNwln95aqe1udVrHJ_QZjhDSMVhfurrlmZEU4Q-VZbgiCgzRbXwG6EMOBtWuzoNcFyvSZzDBnH-6YvTN2dgObfwsmKBLxMrUEZAWt26tQoKDeyCGWjtAbJwZbhK5k43SsYB9XBIQiazHxFdnfLXjZGAsbhQ4Ys-GyfPtX3YEP9sWgg9wWgAKv6OpFXqODKKTi73W1SRIERRfcqiJ9gClDfY8U",
    link: "https://github.com/RIxiV1",
    codeSnippet: `// TypeScript Interface & State Management
interface Subscription {
  id: string;
  name: string;
  price: number;
  frequency: 'monthly' | 'yearly';
}

const calculateMonthlyTotal = (subs: Subscription[]) => {
  return subs.reduce((acc, sub) => 
    acc + (sub.frequency === 'monthly' ? sub.price : sub.price / 12), 0
  );
};`
  },
  {
    id: "3",
    title: "Jarvis",
    description: "Voice-activated AI assistant. Speech recognition + OpenAI. Plays music, opens websites, answers questions.",
    tags: ["Python", "OpenAI", "Speech Recognition"],
    thumbnail: "https://lh3.googleusercontent.com/aida/AOfcidWgTg3RmuQaZ_Ejnf_uPm9SrSv2pcIDzoWfVUlBdKaJmz3KQS96QCab39husWAmwGUHWgg-bRJt0Ift7dLObg7PpnjteH0q3hDIV6_l0E2qXsUTpgPyoIgDBB8JVI0DLg-xj7G8IaCg5ITdFy8osl2OPKZutVhmKBlFEqsEE8aaCXwxPMtzDO483pAUxWWHZ85kXl4LC_Sf9GLS1idiCGXz3JgvcJ0OsobA70X3UOcnZVP_JJIhkYKRzOb2",
    link: "https://github.com/RIxiV1",
    codeSnippet: `def listen_and_act():
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)
        try:
            text = recognizer.recognize_google(audio)
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "user", "content": text}]
            )
            speak(response.choices[0].message.content)
        except Exception as e:
            print(f"Error: {e}")`
  },
  {
    id: "4",
    title: "Resume Screening Agent",
    description: "AI resume screener built with n8n + Lovable. PDF upload, LLM scoring, structured match report.",
    tags: ["TypeScript", "n8n", "LLMs"],
    thumbnail: "https://lh3.googleusercontent.com/aida/AOfcidUOhRquqwc8dJ-D2vH13Jp0mEzDTLCAqRSNwln95aqe1udVrHJ_QZjhDSMVhfurrlmZEU4Q-VZbgiCgzRbXwG6EMOBtWuzoNcFyvSZzDBnH-6YvTN2dgObfwsmKBLxMrUEZAWt26tQoKDeyCGWjtAbJwZbhK5k43SsYB9XBIQiazHxFdnfLXjZGAsbhQ4Ys-GyfPtX3YEP9sWgg9wWgAKv6OpFXqODKKTi73W1SRIERRfcqiJ9gClDfY8U",
    link: "https://github.com/RIxiV1",
    codeSnippet: `// Workflow Transformation Utility
export const transformResumeData = (data: any) => {
  return {
    relevance_score: data.llm_response.score,
    skills_found: data.llm_response.skills,
    missing_critical: data.job_requirements.filter(
      req => !data.llm_response.skills.includes(req)
    )
  };
};`
  }
];
