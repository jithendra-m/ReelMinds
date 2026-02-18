import { Music, Wind, Mic, SlidersHorizontal } from "lucide-react";

interface SoundData {
  scene: number; music: string; ambient: string; foley: string; dialogue: string; notes: string;
}

interface Props { data: SoundData[] }

const icons = [Music, Wind, Mic, SlidersHorizontal];
const labels = ["Music", "Ambient", "Foley", "Dialogue"];

const SoundModule = ({ data }: Props) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold mb-1">Sound Design</h2>
      <p className="text-muted-foreground text-sm">Audio landscape for each scene</p>
    </div>

    <div className="space-y-5">
      {data.map((s) => (
        <div key={s.scene} className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Scene {s.scene}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {[s.music, s.ambient, s.foley, s.dialogue].map((val, i) => {
              const Icon = icons[i];
              return (
                <div key={i} className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">{labels[i]}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{val}</p>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground italic">💡 {s.notes}</p>
        </div>
      ))}
    </div>
  </div>
);

export default SoundModule;
