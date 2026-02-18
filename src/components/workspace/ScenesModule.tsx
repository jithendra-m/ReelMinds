interface SceneData {
  number: number; location: string; time: string; description: string; duration: string; cast: string[];
}

interface Props { data: SceneData[] }

const ScenesModule = ({ data }: Props) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold mb-1">Scene Breakdown</h2>
      <p className="text-muted-foreground text-sm">Every scene mapped and organized</p>
    </div>

    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
            <th className="text-left p-4">#</th>
            <th className="text-left p-4">Location</th>
            <th className="text-left p-4">Time</th>
            <th className="text-left p-4">Description</th>
            <th className="text-left p-4">Duration</th>
            <th className="text-left p-4">Cast</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s) => (
            <tr key={s.number} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
              <td className="p-4 font-mono font-bold text-primary">{s.number}</td>
              <td className="p-4 font-medium">{s.location}</td>
              <td className="p-4 text-muted-foreground">{s.time}</td>
              <td className="p-4 text-muted-foreground max-w-xs">{s.description}</td>
              <td className="p-4 text-muted-foreground">{s.duration}</td>
              <td className="p-4">
                <div className="flex gap-1 flex-wrap">
                  {s.cast.map((c) => (
                    <span key={c} className="text-xs bg-secondary text-foreground px-2 py-0.5 rounded-md">{c}</span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ScenesModule;
