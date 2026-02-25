import { User, Watch, Bell, Settings, ChevronRight, Smartphone, Moon } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState("21:00");

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
      </header>

      <div className="px-5 space-y-6">
        <div className="bg-card rounded-2xl p-5 card-shadow flex items-center gap-4 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl health-gradient flex items-center justify-center">
            <User size={28} className="text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">User</h2>
            <p className="text-sm text-muted-foreground">user@email.com</p>
          </div>
          <ChevronRight size={20} className="text-muted-foreground" />
        </div>

        <div className="animate-slide-up">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">Devices</h3>
          <div className="bg-card rounded-2xl card-shadow divide-y divide-border">
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"><Watch size={20} className="text-primary" /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Apple Health</p>
                <p className="text-xs text-muted-foreground">Not connected</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold">Connect</button>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"><Smartphone size={20} className="text-primary" /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Health Connect</p>
                <p className="text-xs text-muted-foreground">Not connected</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold">Connect</button>
            </div>
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">Reminders</h3>
          <div className="bg-card rounded-2xl card-shadow divide-y divide-border">
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"><Bell size={20} className="text-primary" /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Daily reminder</p>
                <p className="text-xs text-muted-foreground">We'll remind you to log your day</p>
              </div>
              <button onClick={() => setReminderEnabled(!reminderEnabled)} className={`w-12 h-7 rounded-full transition-all ${reminderEnabled ? "health-gradient" : "bg-muted"} relative`}>
                <div className={`w-5 h-5 rounded-full bg-card shadow-md absolute top-1 transition-all ${reminderEnabled ? "right-1" : "left-1"}`} />
              </button>
            </div>
            {reminderEnabled && (
              <div className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"><Moon size={20} className="text-primary" /></div>
                <div className="flex-1"><p className="text-sm font-semibold text-foreground">Reminder time</p></div>
                <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} className="bg-muted rounded-lg px-3 py-1.5 text-sm text-foreground font-semibold border-0" />
              </div>
            )}
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">Settings</h3>
          <div className="bg-card rounded-2xl card-shadow">
            {[
              { label: "Personal info", desc: "Name, age, gender" },
              { label: "Units", desc: "Metric / Imperial" },
              { label: "About", desc: "Version 1.0.0" },
            ].map(({ label, desc }) => (
              <div key={label} className="flex items-center gap-4 p-4 border-b border-border last:border-0">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"><Settings size={20} className="text-primary" /></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
