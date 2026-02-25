const ConsistencyRing = () => {
  const daysRegistered = 18;
  const totalDays = 25;
  const percent = Math.round((daysRegistered / totalDays) * 100);
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center gap-4 bg-card rounded-2xl p-4 card-shadow animate-scale-in">
      <div className="relative w-20 h-20 flex-shrink-0">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="42" fill="none" strokeWidth="6" className="stroke-muted" />
          <circle cx="48" cy="48" r="42" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-primary transition-all duration-1000" strokeDasharray={circumference} strokeDashoffset={offset} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-foreground">{percent}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">Monthly Consistency</p>
        <p className="text-xs text-muted-foreground mt-0.5">{daysRegistered} of {totalDays} days logged</p>
        <p className="text-xs text-primary font-medium mt-1">Keep it up! 💪</p>
      </div>
    </div>
  );
};

export default ConsistencyRing;
