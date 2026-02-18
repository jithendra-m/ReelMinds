interface Props {
  data: {
    act1: { title: string; content: string };
    act2: { title: string; content: string };
    act3: { title: string; content: string };
  };
}

const acts = ["act1", "act2", "act3"] as const;
const actColors = ["from-primary/20 to-primary/5", "from-accent/20 to-accent/5", "from-primary/20 to-accent/5"];

const StructureModule = ({ data }: Props) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold mb-1">3-Act Structure</h2>
      <p className="text-muted-foreground text-sm">The dramatic architecture of your story</p>
    </div>

    <div className="space-y-5">
      {acts.map((key, i) => {
        const act = data[key];
        return (
          <div key={key} className={`bg-gradient-to-br ${actColors[i]} border border-border rounded-2xl p-7`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">ACT {i + 1}</span>
              <h3 className="font-semibold">{act.title}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">{act.content}</p>
          </div>
        );
      })}
    </div>
  </div>
);

export default StructureModule;
