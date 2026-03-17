export interface GraphNode {
  id: string;
  label: string;
  type: 'project' | 'skill' | 'article' | 'core';
  color: string;
  val: number; // size/importance
}

export interface GraphLink {
  source: string;
  target: string;
}

export const graphData = {
  nodes: [
    { id: 'me', label: 'Suhaib', type: 'core', color: '#ffffff', val: 20 },
    
    // Skills
    { id: 'skill-ai', label: 'AI & LLMs', type: 'skill', color: '#256af4', val: 12 },
    { id: 'skill-react', label: 'React / Next.js', type: 'skill', color: '#61dafb', val: 10 },
    { id: 'skill-ts', label: 'TypeScript', type: 'skill', color: '#3178c6', val: 8 },
    { id: 'skill-py', label: 'Python', type: 'skill', color: '#ffde57', val: 8 },
    { id: 'skill-chrome', label: 'Chrome Extensions', type: 'skill', color: '#4285f4', val: 10 },

    // Projects
    { id: 'proj-infoblend', label: 'InfoBlend', type: 'project', color: '#256af4', val: 15 },
    { id: 'proj-subsentry', label: 'SubSentry', type: 'project', color: '#8b5cf6', val: 12 },
    { id: 'proj-jarvis', label: 'Jarvis', type: 'project', color: '#10b981', val: 10 },
    { id: 'proj-resume', label: 'Resume Agent', type: 'project', color: '#f59e0b', val: 10 },

    // Articles
    { id: 'art-network', label: 'Network Theory', type: 'article', color: '#ffffff', val: 10 },
    { id: 'art-chaos', label: 'Chaos Theory', type: 'article', color: '#ffffff', val: 10 },
  ] as const,
  links: [
    // Core connections
    { source: 'me', target: 'skill-ai' },
    { source: 'me', target: 'skill-react' },
    { source: 'me', target: 'skill-ts' },
    { source: 'me', target: 'skill-py' },
    { source: 'me', target: 'skill-chrome' },

    // Skill to Project connections
    { source: 'skill-ai', target: 'proj-infoblend' },
    { source: 'skill-ai', target: 'proj-jarvis' },
    { source: 'skill-ai', target: 'proj-resume' },
    { source: 'skill-chrome', target: 'proj-infoblend' },
    { source: 'skill-react', target: 'proj-subsentry' },
    { source: 'skill-ts', target: 'proj-subsentry' },
    { source: 'skill-py', target: 'proj-jarvis' },

    // Thematic connections
    { source: 'me', target: 'art-network' },
    { source: 'me', target: 'art-chaos' },
    { source: 'art-network', target: 'proj-infoblend' }, // Connections binding everything
    { source: 'art-chaos', target: 'skill-ai' },
  ] as const
};
