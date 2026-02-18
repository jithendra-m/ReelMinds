interface BudgetCategory {
  name: string; low: number; medium: number; high: number;
}

interface Props { data: { currency: string; categories: BudgetCategory[] } }

const fmt = (n: number) => `$${n.toLocaleString()}`;

const BudgetModule = ({ data }: Props) => {
  const totals = {
    low: data.categories.reduce((s, c) => s + c.low, 0),
    medium: data.categories.reduce((s, c) => s + c.medium, 0),
    high: data.categories.reduce((s, c) => s + c.high, 0),
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-1">Budget Estimation</h2>
        <p className="text-muted-foreground text-sm">Cost breakdown across tiers</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-2">
        {(["low", "medium", "high"] as const).map((tier) => (
          <div key={tier} className={`rounded-2xl p-6 text-center ${tier === "medium" ? "gradient-primary glow-primary" : "bg-card border border-border"}`}>
            <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${tier === "medium" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{tier} Budget</p>
            <p className={`text-2xl font-bold ${tier === "medium" ? "text-primary-foreground" : "text-foreground"}`}>{fmt(totals[tier])}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
              <th className="text-left p-4">Category</th>
              <th className="text-right p-4">Low</th>
              <th className="text-right p-4">Medium</th>
              <th className="text-right p-4">High</th>
            </tr>
          </thead>
          <tbody>
            {data.categories.map((c) => (
              <tr key={c.name} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4 text-right text-muted-foreground">{fmt(c.low)}</td>
                <td className="p-4 text-right font-semibold text-primary">{fmt(c.medium)}</td>
                <td className="p-4 text-right text-muted-foreground">{fmt(c.high)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetModule;
