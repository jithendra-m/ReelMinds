import { Sparkles, Quote } from "lucide-react";

interface Props {
  data: { logline: string; summary: string };
}

const ConceptModule = ({ data }: Props) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold mb-1">Concept</h2>
      <p className="text-muted-foreground text-sm">The core vision of your film</p>
    </div>

    <div className="gradient-border bg-card rounded-2xl p-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Logline</h3>
      </div>
      <p className="text-foreground text-lg leading-relaxed italic">{data.logline}</p>
    </div>

    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center gap-2 mb-4">
        <Quote className="h-5 w-5 text-accent" />
        <h3 className="font-semibold text-lg">Cinematic Summary</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
    </div>
  </div>
);

export default ConceptModule;
