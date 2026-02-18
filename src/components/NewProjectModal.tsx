import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    title: string;
    idea: string;
    genre: string;
    audience: string;
    duration: string;
    budget: string;
  }) => void;
}

const GENRES = ["Thriller", "Drama", "Sci-Fi", "Horror", "Comedy", "Romance", "Action", "Documentary", "Fantasy", "Mystery"];
const DURATIONS = ["Short Film", "Feature Film", "Limited Series"];
const BUDGETS = ["Low Budget", "Medium Budget", "High Budget"];

const NewProjectModal = ({ open, onClose, onCreate }: NewProjectModalProps) => {
  const [title, setTitle] = useState("");
  const [idea, setIdea] = useState("");
  const [genre, setGenre] = useState(GENRES[0]);
  const [audience, setAudience] = useState("");
  const [duration, setDuration] = useState(DURATIONS[1]);
  const [budget, setBudget] = useState(BUDGETS[1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !idea.trim()) return;
    onCreate({ title, idea, genre, audience, duration, budget });
    setTitle("");
    setIdea("");
    setAudience("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="bg-card border border-border rounded-2xl w-full max-w-lg p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-bold mb-1">New Blueprint</h2>
            <p className="text-muted-foreground text-sm mb-6">Describe your story idea and let AI craft the production plan.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Project Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Last Signal"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Story Idea</label>
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="A former spy discovers that the AI system they helped build is now targeting them..."
                  rows={3}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Genre</label>
                  <select value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    {GENRES.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Target Audience</label>
                  <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Adults 18-35" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Duration</label>
                  <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    {DURATIONS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Budget Tier</label>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full gradient-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform duration-200 glow-primary mt-2"
              >
                <Sparkles className="h-4 w-4" />
                Generate Blueprint
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewProjectModal;
