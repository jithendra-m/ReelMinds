import { User } from "lucide-react";

interface CharacterData {
  name: string; age: number; role: string; backstory: string;
  personality: string; flaw: string; goal: string; arc: string; relationships: string;
}

interface Props { data: CharacterData[] }

const CharactersModule = ({ data }: Props) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold mb-1">Character Bible</h2>
      <p className="text-muted-foreground text-sm">Deep profiles for every character</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {data.map((c) => (
        <div key={c.name} className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="gradient-primary w-10 h-10 rounded-xl flex items-center justify-center">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-xs text-muted-foreground">{c.role} · Age {c.age}</p>
            </div>
          </div>
          {[
            ["Backstory", c.backstory],
            ["Personality", c.personality],
            ["Internal Flaw", c.flaw],
            ["External Goal", c.goal],
            ["Arc", c.arc],
            ["Relationships", c.relationships],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs font-semibold text-primary mb-0.5">{label}</p>
              <p className="text-sm text-muted-foreground">{value}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default CharactersModule;
