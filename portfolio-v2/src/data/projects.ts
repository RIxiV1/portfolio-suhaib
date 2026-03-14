export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Suhaib's Portfolio - Refined",
    description: "A professional, high-performance developer portfolio built with modern web technologies, focusing on refined UI/UX and smooth animations.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    thumbnail: "https://lh3.googleusercontent.com/aida/AOfcidVTdBUWxTB_mqqPWDTcGbFoULbpMck3sqOVQM_v0wp2J9ObBOrI25-pEn05kmP8u2QXMNQOMI3EERSR42fsPzv9ZBuQapj6lw2mQXOqYw2bsyqgv-uqn6uJNmvY-C-Sr20bSwaj8W9ci5XwpqjPy8Ic7EWn_L6qaLFFUUwI2hXvRc1YH1--HIxTgctx8pvx29KZVn3NTOb_J7-ndb8L8dOjCAyneoGUGGAF6xpcs3PU2poA69yEVG_SS0Ux",
    link: "#"
  },
  {
    id: "2",
    title: "AI Project Manager",
    description: "An intelligent dashboard for managing software projects, featuring real-time collaboration and automated task scoring.",
    tags: ["React", "TypeScript", "Node.js"],
    thumbnail: "https://lh3.googleusercontent.com/aida/AOfcidUOhRquqwc8dJ-D2vH13Jp0mEzDTLCAqRSNwln95aqe1udVrHJ_QZjhDSMVhfurrlmZEU4Q-VZbgiCgzRbXwG6EMOBtWuzoNcFyvSZzDBnH-6YvTN2dgObfwsmKBLxMrUEZAWt26tQoKDeyCGWjtAbJwZbhK5k43SsYB9XBIQiazHxFdnfLXjZGAsbhQ4Ys-GyfPtX3YEP9sWgg9wWgAKv6OpFXqODKKTi73W1SRIERRfcqiJ9gClDfY8U",
    link: "#"
  },
  {
    id: "3",
    title: "Cloud Infrastructure Visualizer",
    description: "Real-time 3D visualization of complex cloud architectures, helping teams understand their systems at a glance.",
    tags: ["Three.js", "AWS", "Go"],
    thumbnail: "https://lh3.googleusercontent.com/aida/AOfcidWgTg3RmuQaZ_Ejnf_uPm9SrSv2pcIDzoWfVUlBdKaJmz3KQS96QCab39husWAmwGUHWgg-bRJt0Ift7dLObg7PpnjteH0q3hDIV6_l0E2qXsUTpgPyoIgDBB8JVI0DLg-xj7G8IaCg5ITdFy8osl2OPKZutVhmKBlFEqsEE8aaCXwxPMtzDO483pAUxWWHZ85kXl4LC_Sf9GLS1idiCGXz3JgvcJ0OsobA70X3UOcnZVP_JJIhkYKRzOb2",
    link: "#"
  }
];
