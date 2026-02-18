interface ScheduleDay {
  day: number; scenes: number[]; location: string; callTime: string; wrapTime: string; notes: string;
}

interface Props { data: ScheduleDay[] }

const ScheduleModule = ({ data }: Props) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold mb-1">Shooting Schedule</h2>
      <p className="text-muted-foreground text-sm">5-day optimized production plan</p>
    </div>

    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
            <th className="text-left p-4">Day</th>
            <th className="text-left p-4">Scenes</th>
            <th className="text-left p-4">Location</th>
            <th className="text-left p-4">Call</th>
            <th className="text-left p-4">Wrap</th>
            <th className="text-left p-4">Notes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.day} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
              <td className="p-4">
                <span className="gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Day {d.day}</span>
              </td>
              <td className="p-4 font-mono">{d.scenes.length > 0 ? d.scenes.join(", ") : "—"}</td>
              <td className="p-4">{d.location}</td>
              <td className="p-4 text-muted-foreground">{d.callTime}</td>
              <td className="p-4 text-muted-foreground">{d.wrapTime}</td>
              <td className="p-4 text-xs text-muted-foreground max-w-xs">{d.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ScheduleModule;
