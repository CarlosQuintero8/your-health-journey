import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Moon, Footprints, Heart, FileText } from "lucide-react";

type Mood = "bien" | "regular" | "mal";

const steps = [
  { id: "mood", title: "Estado general", icon: "😊" },
  { id: "sleep", title: "Sueño", icon: Moon },
  { id: "activity", title: "Actividad", icon: Footprints },
  { id: "vitals", title: "Signos vitales", icon: Heart },
  { id: "notes", title: "Notas", icon: FileText },
];

const Registration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMood = (searchParams.get("mood") as Mood) || null;

  const [currentStep, setCurrentStep] = useState(initialMood ? 1 : 0);
  const [mood, setMood] = useState<Mood | null>(initialMood);
  const [sleepHours, setSleepHours] = useState(7);
  const [sleepQuality, setSleepQuality] = useState<"buena" | "regular" | "mala">("buena");
  const [steps_, setSteps] = useState(5000);
  const [heartRate, setHeartRate] = useState(72);
  const [note, setNote] = useState("");

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const canNext = () => {
    if (currentStep === 0) return mood !== null;
    return true;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save and go back
      navigate("/", { replace: true });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={handleBack} className="w-10 h-10 rounded-xl bg-card card-shadow flex items-center justify-center text-foreground">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">Registro diario</h1>
          <p className="text-xs text-muted-foreground">Paso {currentStep + 1} de {totalSteps}</p>
        </div>
      </header>

      {/* Progress bar */}
      <div className="px-5 mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full health-gradient rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-5 animate-fade-in" key={currentStep}>
        {currentStep === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">¿Cómo te sientes hoy?</h2>
            <div className="space-y-3">
              {([
                { value: "bien" as Mood, emoji: "😊", label: "Bien", desc: "Me siento con energía" },
                { value: "regular" as Mood, emoji: "😐", label: "Regular", desc: "Un día normal" },
                { value: "mal" as Mood, emoji: "😔", label: "Mal", desc: "No me siento bien" },
              ]).map(({ value, emoji, label, desc }) => (
                <button
                  key={value}
                  onClick={() => setMood(value)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    mood === value
                      ? "border-primary bg-secondary card-shadow"
                      : "border-border bg-card"
                  }`}
                >
                  <span className="text-3xl">{emoji}</span>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{label}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">¿Cómo dormiste?</h2>
            <div className="bg-card rounded-2xl p-6 card-shadow space-y-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Horas de sueño</label>
                <div className="flex items-center gap-4 mt-3">
                  <button onClick={() => setSleepHours(Math.max(0, sleepHours - 0.5))} className="w-12 h-12 rounded-xl bg-secondary text-secondary-foreground font-bold text-xl flex items-center justify-center">-</button>
                  <span className="text-4xl font-bold text-foreground flex-1 text-center">{sleepHours}h</span>
                  <button onClick={() => setSleepHours(Math.min(14, sleepHours + 0.5))} className="w-12 h-12 rounded-xl bg-secondary text-secondary-foreground font-bold text-xl flex items-center justify-center">+</button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Calidad del sueño</label>
                <div className="flex gap-2 mt-3">
                  {(["buena", "regular", "mala"] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => setSleepQuality(q)}
                      className={`flex-1 py-3 rounded-xl font-semibold text-sm capitalize transition-all ${
                        sleepQuality === q
                          ? "health-gradient text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Actividad física</h2>
            <div className="bg-card rounded-2xl p-6 card-shadow space-y-4">
              <label className="text-sm font-medium text-muted-foreground">Pasos estimados</label>
              <input
                type="range"
                min={0}
                max={20000}
                step={500}
                value={steps_}
                onChange={(e) => setSteps(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex items-end gap-1 justify-center">
                <span className="text-4xl font-bold text-foreground">{steps_.toLocaleString()}</span>
                <span className="text-muted-foreground text-sm mb-1">pasos</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full health-gradient rounded-full transition-all" style={{ width: `${Math.min((steps_ / 10000) * 100, 100)}%` }} />
              </div>
              <p className="text-xs text-muted-foreground text-center">Meta: 10,000 pasos</p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Signos vitales</h2>
            <div className="bg-card rounded-2xl p-6 card-shadow space-y-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Frecuencia cardíaca (bpm)</label>
                <div className="flex items-center gap-4 mt-3">
                  <button onClick={() => setHeartRate(Math.max(40, heartRate - 1))} className="w-12 h-12 rounded-xl bg-secondary text-secondary-foreground font-bold text-xl flex items-center justify-center">-</button>
                  <div className="flex-1 text-center">
                    <span className="text-4xl font-bold text-foreground">{heartRate}</span>
                    <span className="text-muted-foreground text-sm ml-1">bpm</span>
                  </div>
                  <button onClick={() => setHeartRate(Math.min(200, heartRate + 1))} className="w-12 h-12 rounded-xl bg-secondary text-secondary-foreground font-bold text-xl flex items-center justify-center">+</button>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-xl p-3">
                <p className="text-xs text-secondary-foreground">
                  💡 Si tienes un wearable conectado, estos datos se sincronizarán automáticamente.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Notas del día</h2>
            <div className="bg-card rounded-2xl p-6 card-shadow">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="¿Algo que quieras recordar sobre tu día? (opcional)"
                className="w-full h-32 bg-muted rounded-xl p-4 text-foreground placeholder:text-muted-foreground text-sm resize-none border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground mt-2">{note.length}/200 caracteres</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div className="px-5 py-6">
        <button
          onClick={handleNext}
          disabled={!canNext()}
          className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
            canNext()
              ? "health-gradient text-primary-foreground card-shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {isLast ? (
            <>
              <Check size={20} />
              Guardar registro
            </>
          ) : (
            <>
              Siguiente
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Registration;
