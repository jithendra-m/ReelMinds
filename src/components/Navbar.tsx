import { Link } from "react-router-dom";
import { Film, Plus } from "lucide-react";

interface NavbarProps {
  onNewProject?: () => void;
  showNew?: boolean;
}

const Navbar = ({ onNewProject, showNew = true }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between h-16 px-6 bg-card border-b border-border backdrop-blur-sm">
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="gradient-primary p-2 rounded-lg">
          <Film className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold tracking-tight gradient-text">Scriptoria</span>
      </Link>
      {showNew && onNewProject && (
        <button
          onClick={onNewProject}
          className="gradient-primary text-primary-foreground px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:scale-105 transition-transform duration-200 glow-primary"
        >
          <Plus className="h-4 w-4" />
          New Project
        </button>
      )}
    </nav>
  );
};

export default Navbar;
