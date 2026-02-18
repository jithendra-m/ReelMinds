import { Palette, MessageSquareQuote, Mic2, Tv } from "lucide-react";

interface Props {
  data: { posterConcept: string; tagline: string; pitch: string; ottSummary: string };
}

const MarketingModule = ({ data }: Props) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold mb-1">Marketing Kit</h2>
      <p className="text-muted-foreground text-sm">Everything you need to pitch and promote</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {[
        { icon: Palette, title: "Poster Concept", content: data.posterConcept },
        { icon: MessageSquareQuote, title: "Tagline", content: data.tagline },
        { icon: Mic2, title: "30-Second Pitch", content: data.pitch },
        { icon: Tv, title: "OTT Summary", content: data.ottSummary },
      ].map(({ icon: Icon, title, content }) => (
        <div key={title} className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Icon className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">{title}</h3>
          </div>
          <p className={`text-muted-foreground leading-relaxed ${title === "Tagline" ? "text-xl font-semibold gradient-text" : "text-sm"}`}>
            {content}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default MarketingModule;
