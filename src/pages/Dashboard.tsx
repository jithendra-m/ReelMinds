import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Film, Clock, ArrowRight, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import NewProjectModal from "@/components/NewProjectModal";
import { getProjects, createProject, deleteProject } from "@/lib/store";
import { Project } from "@/lib/types";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleCreate = (data: { title: string; idea: string; genre: string; audience: string; duration: string; budget: string }) => {
    const project = createProject(data.title, data.idea, data.genre, data.audience, data.duration, data.budget);
    setModalOpen(false);
    navigate(`/project/${project.id}`);
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    setProjects(getProjects());
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNewProject={() => setModalOpen(true)} />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Project Vault</h1>
          <p className="text-muted-foreground mt-2">Manage your AI production blueprints</p>
        </div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-16 text-center max-w-xl mx-auto"
          >
            <div className="gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Film className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No projects yet</h2>
            <p className="text-muted-foreground mb-8 text-sm max-w-sm mx-auto">
              Start by creating your first AI-powered production blueprint. Describe your story idea and let Scriptoria build the plan.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:scale-105 transition-transform duration-200 glow-primary"
            >
              Create your first blueprint
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-2xl p-6 group hover:border-primary/30 transition-colors duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(project.id); }}
                    className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">{project.idea}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Open <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <NewProjectModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreate} />
    </div>
  );
};

export default Dashboard;
