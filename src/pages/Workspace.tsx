import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb, Layers, FileText, Users, Clapperboard, Camera,
  Volume2, DollarSign, Calendar, Image, Megaphone,
  ArrowLeft, RefreshCw, Save, FileDown,
} from "lucide-react";
import { getProject } from "@/lib/store";
import { Project, TabId } from "@/lib/types";
import ConceptModule from "@/components/workspace/ConceptModule";
import StructureModule from "@/components/workspace/StructureModule";
import ScreenplayModule from "@/components/workspace/ScreenplayModule";
import CharactersModule from "@/components/workspace/CharactersModule";
import ScenesModule from "@/components/workspace/ScenesModule";
import ShotsModule from "@/components/workspace/ShotsModule";
import SoundModule from "@/components/workspace/SoundModule";
import BudgetModule from "@/components/workspace/BudgetModule";
import ScheduleModule from "@/components/workspace/ScheduleModule";
import StoryboardModule from "@/components/workspace/StoryboardModule";
import MarketingModule from "@/components/workspace/MarketingModule";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "concept", label: "Concept", icon: Lightbulb },
  { id: "structure", label: "Structure", icon: Layers },
  { id: "screenplay", label: "Screenplay", icon: FileText },
  { id: "characters", label: "Characters", icon: Users },
  { id: "scenes", label: "Scenes", icon: Clapperboard },
  { id: "shots", label: "Shots", icon: Camera },
  { id: "sound", label: "Sound", icon: Volume2 },
  { id: "budget", label: "Budget", icon: DollarSign },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "storyboard", label: "Storyboard", icon: Image },
  { id: "marketing", label: "Marketing", icon: Megaphone },
];

const Workspace = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("concept");

  useEffect(() => {
    if (!id) return;
    const p = getProject(id);
    if (!p) {
      navigate("/");
      return;
    }
    setProject(p);
  }, [id, navigate]);

  if (!project) return null;

  const renderModule = () => {
    const m = project.modules;
    switch (activeTab) {
      case "concept": return <ConceptModule data={m.concept} />;
      case "structure": return <StructureModule data={m.structure} />;
      case "screenplay": return <ScreenplayModule data={m.screenplay} />;
      case "characters": return <CharactersModule data={m.characters} />;
      case "scenes": return <ScenesModule data={m.scenes} />;
      case "shots": return <ShotsModule data={m.shots} />;
      case "sound": return <SoundModule data={m.sound} />;
      case "budget": return <BudgetModule data={m.budget} />;
      case "schedule": return <ScheduleModule data={m.schedule} />;
      case "storyboard": return <StoryboardModule data={m.storyboard} />;
      case "marketing": return <MarketingModule data={m.marketing} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Toolbar */}
      <div className="h-14 flex items-center justify-between px-5 bg-card border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold truncate max-w-xs">{project.title}</h1>
          <span className="text-xs bg-secondary text-muted-foreground px-2.5 py-1 rounded-full">{project.genre}</span>
        </div>
        <div className="flex items-center gap-2">
          {[
            { icon: RefreshCw, label: "Regenerate" },
            { icon: Save, label: "Save" },
            { icon: FileDown, label: "Export" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 bg-card border-r border-border shrink-0 overflow-y-auto scrollbar-thin">
          <div className="p-3 space-y-0.5">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                    active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 gradient-primary rounded-xl"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                    />
                  )}
                  <tab.icon className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-8 max-w-5xl"
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Workspace;
