import { ImageIcon } from "lucide-react";

interface StoryboardFrame {
  scene: number; description: string; imageUrl?: string;
}

interface Props { data: StoryboardFrame[] }

const StoryboardModule = ({ data }: Props) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold mb-1">Storyboard</h2>
      <p className="text-muted-foreground text-sm">Visual frame references for each scene</p>
    </div>

    <div className="space-y-5">
      {data.map((frame) => (
        <div key={frame.scene} className="bg-card border border-border rounded-2xl p-6 flex gap-6 items-start">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Scene {frame.scene}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{frame.description}</p>
          </div>
          <div className="w-64 h-40 bg-secondary rounded-xl flex items-center justify-center shrink-0 border border-border">
            {frame.imageUrl ? (
              <img src={frame.imageUrl} alt={`Scene ${frame.scene}`} className="w-full h-full object-cover rounded-xl" />
            ) : (
              <div className="text-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <button className="text-xs text-primary font-medium hover:underline">Generate Image</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default StoryboardModule;
