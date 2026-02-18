interface Props {
  data: Array<{ heading: string; action: string; character: string; dialogue: string }>;
}

const ScreenplayModule = ({ data }: Props) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold mb-1">Screenplay</h2>
      <p className="text-muted-foreground text-sm">Formatted screenplay pages</p>
    </div>

    <div className="bg-card border border-border rounded-2xl p-10 max-w-3xl mx-auto">
      <div className="font-mono text-sm space-y-8">
        {data.map((block, i) => (
          <div key={i} className="space-y-3">
            <p className="font-bold text-foreground tracking-wide">{block.heading}</p>
            <p className="text-muted-foreground leading-relaxed">{block.action}</p>
            <p className="text-center font-bold text-foreground mt-4">{block.character}</p>
            <p className="text-center text-muted-foreground max-w-md mx-auto">{block.dialogue}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ScreenplayModule;
