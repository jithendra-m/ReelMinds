import { Project, ModuleData } from "./types";

const STORAGE_KEY = "scriptoria_projects";

export function getProjects(): Project[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveProject(project: Project): void {
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.push(project);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function deleteProject(id: string): void {
  const projects = getProjects().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProject(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}

export function createProject(title: string, idea: string, genre: string, audience: string, duration: string, budget: string): Project {
  const project: Project = {
    id: crypto.randomUUID(),
    title,
    idea,
    genre,
    audience,
    duration,
    budget,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    modules: generateMockModules(title, idea, genre),
  };
  saveProject(project);
  return project;
}

function generateMockModules(title: string, idea: string, genre: string): ModuleData {
  return {
    concept: {
      logline: `In a world where ${idea.slice(0, 60).toLowerCase()}, one person must confront their deepest fears to save everything they love.`,
      summary: `${title} is a ${genre.toLowerCase()} that explores the boundaries of human resilience. The story follows a protagonist thrust into extraordinary circumstances, where every decision carries weight and every relationship is tested. Set against a richly textured world, the narrative weaves together themes of identity, sacrifice, and redemption. As the stakes escalate, our hero must navigate a labyrinth of moral complexity, forging unlikely alliances and confronting enemies both external and internal. The film builds toward a climactic confrontation that challenges not just the characters, but the audience's own assumptions about courage and conviction.`,
    },
    structure: {
      act1: {
        title: "Setup — The Ordinary World",
        content: "We meet our protagonist in their everyday life, establishing the world, relationships, and the simmering tension beneath the surface. An inciting incident shatters their equilibrium, forcing them onto a path they never anticipated. By the end of Act 1, the protagonist makes a fateful decision that propels them into the unknown.",
      },
      act2: {
        title: "Confrontation — Rising Stakes",
        content: "The protagonist faces escalating challenges, encounters allies and adversaries, and undergoes a transformation. Midpoint reversal shifts their understanding. All hope seems lost as they face their darkest moment, but a crucial revelation provides the key to moving forward.",
      },
      act3: {
        title: "Resolution — The Final Stand",
        content: "Armed with new understanding, the protagonist confronts the central conflict head-on. The climax tests everything they've learned. Resolution brings closure to character arcs, and the denouement reveals how the world has changed.",
      },
    },
    screenplay: [
      { heading: "INT. ABANDONED WAREHOUSE — NIGHT", action: "Rain hammers against broken windows. Shafts of moonlight cut through the darkness, illuminating dust motes hanging in the air.", character: "ALEX", dialogue: "We don't have much time. If they find us here..." },
      { heading: "EXT. CITY ROOFTOP — DAWN", action: "The city stretches below, a tapestry of lights beginning to fade as the first rays of sun paint the skyline gold.", character: "MAYA", dialogue: "Look at it. All of it. That's what we're fighting for." },
      { heading: "INT. CONTROL ROOM — DAY", action: "Screens flicker with data streams. ALEX studies the monitors, tension visible in every line of their body.", character: "ALEX", dialogue: "There. That's our window. Sixty seconds, no more." },
    ],
    characters: [
      { name: "Alex Mercer", age: 34, role: "Protagonist", backstory: "Former intelligence analyst turned whistleblower", personality: "Methodical, haunted, quietly determined", flaw: "Inability to trust others fully", goal: "Expose the conspiracy before it's too late", arc: "Learns that vulnerability is strength", relationships: "Mentor to Maya, former partner of Director Kane" },
      { name: "Maya Chen", age: 27, role: "Deuteragonist", backstory: "Idealistic journalist who uncovered the first thread", personality: "Fearless, empathetic, sometimes reckless", flaw: "Believes she can save everyone", goal: "Tell the story the world needs to hear", arc: "Discovers that truth requires sacrifice", relationships: "Protégée of Alex, romantic tension with Kai" },
      { name: "Director Kane", age: 52, role: "Antagonist", backstory: "Architect of the system Alex seeks to destroy", personality: "Charismatic, calculating, believes the ends justify the means", flaw: "Hubris — cannot conceive of failure", goal: "Maintain control at any cost", arc: "Forced to confront the human cost of his vision", relationships: "Former mentor to Alex" },
    ],
    scenes: [
      { number: 1, location: "INT. Abandoned Warehouse", time: "Night", description: "Alex and Maya take shelter; exposition of the threat", duration: "4 min", cast: ["Alex", "Maya"] },
      { number: 2, location: "EXT. City Rooftop", time: "Dawn", description: "Maya's motivation revealed; city establishing shots", duration: "3 min", cast: ["Maya"] },
      { number: 3, location: "INT. Control Room", time: "Day", description: "Planning the infiltration; tension builds", duration: "5 min", cast: ["Alex", "Maya", "Kai"] },
      { number: 4, location: "EXT. Government Plaza", time: "Day", description: "Public confrontation; the stakes go public", duration: "6 min", cast: ["Alex", "Kane", "Maya"] },
      { number: 5, location: "INT. Server Vault", time: "Night", description: "Climactic heist sequence; data extraction", duration: "8 min", cast: ["Alex", "Maya"] },
    ],
    shots: [
      { scene: 1, shot: "1A", angle: "Wide establishing", lens: "24mm", movement: "Slow dolly in", lighting: "Low-key, moonlight shafts", tone: "Tense, claustrophobic" },
      { scene: 1, shot: "1B", angle: "Close-up", lens: "85mm", movement: "Static", lighting: "Side-lit, shadows on face", tone: "Intimate, vulnerable" },
      { scene: 2, shot: "2A", angle: "Crane shot", lens: "16mm", movement: "Rising crane", lighting: "Golden hour, backlit", tone: "Hopeful, epic" },
      { scene: 3, shot: "3A", angle: "Over-the-shoulder", lens: "50mm", movement: "Handheld", lighting: "Monitor glow", tone: "Urgent, technical" },
      { scene: 4, shot: "4A", angle: "Drone wide", lens: "35mm", movement: "Circling overhead", lighting: "Harsh daylight", tone: "Exposed, public" },
    ],
    sound: [
      { scene: 1, music: "Ambient electronic, low pulse", ambient: "Rain, distant thunder, dripping water", foley: "Footsteps on wet concrete, zipper, paper rustle", dialogue: "Close-mic, slight reverb for space", notes: "Build tension through silence and sudden sounds" },
      { scene: 2, music: "Swelling orchestral, hopeful theme", ambient: "Wind, distant city hum, birds", foley: "Gravel underfoot, fabric in wind", dialogue: "Natural outdoor acoustics", notes: "Let the music breathe; emotional peak" },
      { scene: 3, music: "Minimalist synth, ticking clock motif", ambient: "Server hum, cooling fans, electric buzz", foley: "Keyboard clicks, mouse, chair creaks", dialogue: "Tight, dry, no reverb", notes: "Rhythmic cutting between dialogue and silence" },
    ],
    budget: {
      currency: "USD",
      categories: [
        { name: "Cast", low: 50000, medium: 150000, high: 500000 },
        { name: "Crew", low: 30000, medium: 100000, high: 300000 },
        { name: "Equipment", low: 15000, medium: 50000, high: 150000 },
        { name: "Locations", low: 10000, medium: 40000, high: 120000 },
        { name: "Production Design", low: 8000, medium: 35000, high: 100000 },
        { name: "Post-Production", low: 20000, medium: 60000, high: 200000 },
        { name: "Music & Sound", low: 5000, medium: 25000, high: 80000 },
        { name: "Marketing", low: 10000, medium: 50000, high: 200000 },
      ],
    },
    schedule: [
      { day: 1, scenes: [1, 2], location: "Warehouse / Rooftop", callTime: "5:00 AM", wrapTime: "7:00 PM", notes: "Dawn shoot for Scene 2 — call early" },
      { day: 2, scenes: [3], location: "Control Room (Studio A)", callTime: "8:00 AM", wrapTime: "6:00 PM", notes: "Heavy dialogue day; run-through at 8:30" },
      { day: 3, scenes: [4], location: "Government Plaza", callTime: "7:00 AM", wrapTime: "5:00 PM", notes: "Permit required; crowd extras at 9 AM" },
      { day: 4, scenes: [5], location: "Server Vault (Studio B)", callTime: "9:00 AM", wrapTime: "9:00 PM", notes: "Complex lighting; stunt coordinator on set" },
      { day: 5, scenes: [], location: "Various", callTime: "8:00 AM", wrapTime: "6:00 PM", notes: "Pickup shots, B-roll, inserts" },
    ],
    storyboard: [
      { scene: 1, description: "Alex crouched behind crates in the abandoned warehouse, moonlight cutting through broken windows, rain visible outside" },
      { scene: 2, description: "Wide shot of Maya standing on rooftop edge, city sprawling below, golden sunrise behind her silhouette" },
      { scene: 3, description: "Over-the-shoulder shot of Alex studying multiple glowing monitors in a dark control room" },
      { scene: 4, description: "Aerial view of a confrontation in a sunlit government plaza, crowd gathering around two figures" },
      { scene: 5, description: "Alex navigating rows of illuminated server racks, blue light casting dramatic shadows" },
    ],
    marketing: {
      posterConcept: "A lone figure silhouetted against a wall of glowing data streams, the city skyline reflected in their eyes. The gradient moves from deep purple shadows to electric blue highlights. The title 'SCRIPTORIA' cuts across in bold, minimal typography.",
      tagline: "The truth doesn't hide. It waits.",
      pitch: "In a world drowning in information, one whistleblower discovers that the greatest threat isn't what's hidden — it's what's been in plain sight all along. A taut, visually stunning thriller that blends the intelligence of 'The Social Network' with the urgency of 'The Bourne Identity'.",
      ottSummary: "When a former intelligence analyst uncovers a conspiracy that reaches the highest levels of power, they must team up with an idealistic journalist to expose the truth before it's buried forever. A gripping thriller about courage, sacrifice, and the price of speaking truth to power.",
    },
  };
}
