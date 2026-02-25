import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const trends = [
  { label: "Average sleep", value: "7.1h", change: "+0.3h", direction: "up" as const },
  { label: "Daily steps", value: "5,890", change: "-200", direction: "down" as const },
  { label: "Overall status", value: "Good", change: "Stable", direction: "neutral" as const },
];

const iconMap = { up: TrendingUp, down: TrendingDown, neutral: Minus };
const colorMap = { up: "text-success", down: "text-danger", neutral: "text-muted-foreground" };
const bgMap = { up: "bg-success/10", down: "bg-danger/10", neutral: "bg-muted" };

const WeeklyTrend = () => {
  return (
    <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Weekly Trend</h3>
      <div className="space-y-2.5">
        {trends.map(({ label, value, change, direction }) => {
          const Icon = iconMap[direction];
          return (
            <div key={label} className="flex items-center justify-between bg-card rounded-xl p-3.5 card-shadow">
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{value}</p>
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${bgMap[direction]}`}>
                <Icon size={14} className={colorMap[direction]} />
                <span className={`text-xs font-semibold ${colorMap[direction]}`}>{change}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyTrend;
