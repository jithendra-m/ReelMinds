interface ShotData {
  scene: number; shot: string; angle: string; lens: string; movement: string; lighting: string; tone: string;
}

interface Props { data: ShotData[] }

const ShotsModule = ({ data }: Props) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold mb-1">Cinematic Shot List</h2>
      <p className="text-muted-foreground text-sm">Camera, lens, and lighting for every shot</p>
    </div>

    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
            <th className="text-left p-4">Scene</th>
            <th className="text-left p-4">Shot</th>
            <th className="text-left p-4">Angle</th>
            <th className="text-left p-4">Lens</th>
            <th className="text-left p-4">Movement</th>
            <th className="text-left p-4">Lighting</th>
            <th className="text-left p-4">Tone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s, i) => (
            <tr key={i} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
              <td className="p-4 font-mono font-bold text-primary">{s.scene}</td>
              <td className="p-4 font-mono">{s.shot}</td>
              <td className="p-4">{s.angle}</td>
              <td className="p-4 text-muted-foreground">{s.lens}</td>
              <td className="p-4 text-muted-foreground">{s.movement}</td>
              <td className="p-4 text-muted-foreground">{s.lighting}</td>
              <td className="p-4"><span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">{s.tone}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ShotsModule;
