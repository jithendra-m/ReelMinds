export interface Project {
  id: string;
  title: string;
  idea: string;
  genre: string;
  audience: string;
  duration: string;
  budget: string;
  createdAt: string;
  updatedAt: string;
  modules: ModuleData;
}

export interface ModuleData {
  concept: {
    logline: string;
    summary: string;
  };
  structure: {
    act1: { title: string; content: string };
    act2: { title: string; content: string };
    act3: { title: string; content: string };
  };
  screenplay: Array<{
    heading: string;
    action: string;
    character: string;
    dialogue: string;
  }>;
  characters: Array<{
    name: string;
    age: number;
    role: string;
    backstory: string;
    personality: string;
    flaw: string;
    goal: string;
    arc: string;
    relationships: string;
  }>;
  scenes: Array<{
    number: number;
    location: string;
    time: string;
    description: string;
    duration: string;
    cast: string[];
  }>;
  shots: Array<{
    scene: number;
    shot: string;
    angle: string;
    lens: string;
    movement: string;
    lighting: string;
    tone: string;
  }>;
  sound: Array<{
    scene: number;
    music: string;
    ambient: string;
    foley: string;
    dialogue: string;
    notes: string;
  }>;
  budget: {
    currency: string;
    categories: Array<{
      name: string;
      low: number;
      medium: number;
      high: number;
    }>;
  };
  schedule: Array<{
    day: number;
    scenes: number[];
    location: string;
    callTime: string;
    wrapTime: string;
    notes: string;
  }>;
  storyboard: Array<{
    scene: number;
    description: string;
    imageUrl?: string;
  }>;
  marketing: {
    posterConcept: string;
    tagline: string;
    pitch: string;
    ottSummary: string;
  };
}

export type TabId =
  | "concept"
  | "structure"
  | "screenplay"
  | "characters"
  | "scenes"
  | "shots"
  | "sound"
  | "budget"
  | "schedule"
  | "storyboard"
  | "marketing";
