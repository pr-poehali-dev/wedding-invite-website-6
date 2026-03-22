import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/4f4dd924-afb2-473a-8dae-66b98855ef0a/files/d292a1d0-4564-485c-b422-7ae50301c2e8.jpg";

const TIMELINE = [
  { time: "16:20", icon: "Users", label: "Сбор гостей" },
  { time: "17:00", icon: "UtensilsCrossed", label: "Праздничный банкет" },
  { time: "18:00", icon: "Music", label: "Первый танец" },
  { time: "21:00", icon: "Cake", label: "Торжественный торт" },
  { time: "22:30", icon: "Star", label: "Окончание мероприятия" },
];

const DRESS_CODE = [
  { color: "#1a1a1a", label: "Чёрный" },
  { color: "#4a2c1a", label: "Шоколадный" },
  { color: "#8c8c8c", label: "Серый" },
  { color: "#b0a89a", label: "Серо-бежевый" },
  { color: "#c4b49a", label: "Тауп" },
  { color: "#f4c2c2", label: "Нежно-розовый" },
  { color: "#b8d4e8", label: "Нежно-голубой" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function Leaf({ className }: { className: string }) {
  return (
    <div className={`absolute pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M40 110 C40 110 5 70 10 35 C15 5 40 0 40 0 C40 0 65 5 70 35 C75 70 40 110 40 110Z" fill="currentColor" opacity="0.18"/>
        <line x1="40" y1="5" x2="40" y2="108" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
        <line x1="40" y1="30" x2="22" y2="55" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        <line x1="40" y1="45" x2="58" y2="65" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        <line x1="40" y1="60" x2="20" y2="78" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
      </svg>
    </div>
  );
}

function Branch({ className }: { className: string }) {
  return (
    <div className={`absolute pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="60" y1="190" x2="60" y2="10" stroke="currentColor" strokeWidth="1.2" opacity="0.22"/>
        <path d="M60 150 C60 150 30 130 25 105 C22 88 40 80 60 95Z" fill="currentColor" opacity="0.16"/>
        <path d="M60 150 C60 150 90 130 95 105 C98 88 80 80 60 95Z" fill="currentColor" opacity="0.14"/>
        <path d="M60 115 C60 115 28 92 22 65 C18 45 40 38 60 55Z" fill="currentColor" opacity="0.16"/>
        <path d="M60 115 C60 115 92 92 98 65 C102 45 80 38 60 55Z" fill="currentColor" opacity="0.14"/>
        <path d="M60 78 C60 78 35 58 32 35 C30 18 48 12 60 28Z" fill="currentColor" opacity="0.15"/>
        <path d="M60 78 C60 78 85 58 88 35 C90 18 72 12 60 28Z" fill="currentColor" opacity="0.13"/>
      </svg>
    </div>
  );
}

function Hexagon({ className, size = 60 }: { className: string; size?: number }) {
  const r = size / 2;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${r + r * Math.cos(a)},${r + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <div className={`absolute pointer-events-none select-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <polygon points={pts} fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.18"/>
      </svg>
    </div>
  );
}

function Monstera({ className }: { className: string }) {
  return (
    <div className={`absolute pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="80" y1="195" x2="80" y2="110" stroke="currentColor" strokeWidth="1.2" opacity="0.22"/>
        <line x1="80" y1="110" x2="50" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
        <path d="M80 110 C80 110 10 90 8 45 C6 15 35 5 55 20 C40 22 30 35 35 52 C42 75 75 78 80 110Z" fill="currentColor" opacity="0.14"/>
        <path d="M55 20 C55 20 48 2 62 0 C72 -1 75 12 80 110 C75 78 68 30 55 20Z" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.18"/>
        <path d="M35 52 C35 52 18 58 20 68 C22 76 36 74 45 66Z" fill="currentColor" opacity="0.1"/>
        <path d="M8 45 C8 45 0 52 3 63 C6 72 18 68 22 58Z" fill="currentColor" opacity="0.1"/>
        <path d="M80 110 C80 110 150 90 152 45 C154 15 125 5 105 20 C120 22 130 35 125 52 C118 75 85 78 80 110Z" fill="currentColor" opacity="0.13"/>
        <path d="M125 52 C125 52 142 58 140 68 C138 76 124 74 115 66Z" fill="currentColor" opacity="0.09"/>
        <path d="M152 45 C152 45 160 52 157 63 C154 72 142 68 138 58Z" fill="currentColor" opacity="0.09"/>
        <line x1="80" y1="110" x2="55" y2="20" stroke="currentColor" strokeWidth="0.7" opacity="0.2"/>
        <line x1="80" y1="110" x2="105" y2="20" stroke="currentColor" strokeWidth="0.7" opacity="0.18"/>
        <line x1="42" y1="60" x2="22" y2="72" stroke="currentColor" strokeWidth="0.5" opacity="0.15"/>
        <line x1="118" y1="60" x2="138" y2="72" stroke="currentColor" strokeWidth="0.5" opacity="0.13"/>
      </svg>
    </div>
  );
}

function Flower({ className }: { className: string }) {
  return (
    <div className={`absolute pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="50" y1="125" x2="50" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.25"/>
        <line x1="50" y1="95" x2="28" y2="78" stroke="currentColor" strokeWidth="0.7" opacity="0.2"/>
        <path d="M28 78 C28 78 15 72 18 62 C21 54 32 56 35 64Z" fill="currentColor" opacity="0.15"/>
        <ellipse cx="50" cy="42" rx="9" ry="14" fill="currentColor" opacity="0.22" transform="rotate(-30 50 42)"/>
        <ellipse cx="50" cy="42" rx="9" ry="14" fill="currentColor" opacity="0.22" transform="rotate(30 50 42)"/>
        <ellipse cx="50" cy="42" rx="9" ry="14" fill="currentColor" opacity="0.22" transform="rotate(90 50 42)"/>
        <ellipse cx="50" cy="42" rx="9" ry="14" fill="currentColor" opacity="0.22" transform="rotate(150 50 42)"/>
        <ellipse cx="50" cy="42" rx="9" ry="14" fill="currentColor" opacity="0.22" transform="rotate(210 50 42)"/>
        <ellipse cx="50" cy="42" rx="9" ry="14" fill="currentColor" opacity="0.22" transform="rotate(270 50 42)"/>
        <circle cx="50" cy="42" r="7" fill="currentColor" opacity="0.28"/>
      </svg>
    </div>
  );
}

const GUESTS_URL = "https://functions.poehali.dev/c33b8e96-7423-491c-9d54-16d9e0d9532d";

export default function Index() {
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [form, setForm] = useState({ name: "", attendance: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const target = new Date("2026-08-08T15:00:00");
    const tick = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) return;
      setCountdown({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.attendance) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(GUESTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, surname: "", attendance: form.attendance }),
      });
      if (!res.ok) throw new Error("Ошибка сервера");
      setSubmitted(true);
    } catch {
      setError("Не удалось отправить. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef] font-golos text-[#2d3a2d]">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f4ef]/30 via-[#f7f4ef]/10 to-[#f7f4ef]" />

        <Leaf className="text-[#4a6741] w-24 h-36 top-8 left-4 md:left-16 rotate-[-20deg]" />
        <Leaf className="text-[#4a6741] w-16 h-24 top-16 right-8 md:right-24 rotate-[30deg]" />
        <Leaf className="text-[#4a6741] w-20 h-32 bottom-32 left-8 md:left-32 rotate-[15deg]" />
        <Leaf className="text-[#4a6741] w-28 h-40 bottom-24 right-4 md:right-20 rotate-[-25deg]" />
        <Branch className="text-[#4a6741] w-20 h-36 top-1/4 left-0 md:left-8 rotate-[10deg] opacity-70" />
        <Branch className="text-[#4a6741] w-16 h-28 top-1/3 right-0 md:right-8 rotate-[-15deg] opacity-60" />
        <Hexagon className="text-[#4a6741] top-12 left-1/4 hidden md:block" size={80} />
        <Hexagon className="text-[#4a6741] bottom-40 right-1/4 hidden md:block" size={60} />
        <Hexagon className="text-[#4a6741] top-1/2 left-12 hidden md:block" size={40} />

        <div className="relative z-10 text-center px-6" style={{ animation: "fadeInUp 1s ease both" }}>
          <p className="font-cormorant text-[#5a7a5a] text-base md:text-xl tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4">
            Приглашение на свадьбу
          </p>
          <h1 className="font-cormorant font-light text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[#2d3a2d] leading-none mb-2">
            Андрей
          </h1>
          <p className="font-cormorant italic text-[#5a7a5a] text-2xl sm:text-3xl md:text-5xl mb-2">&amp;</p>
          <h1 className="font-cormorant font-light text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[#2d3a2d] leading-none mb-8 md:mb-10">
            Мария
          </h1>
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-10 md:mb-12">
            <div className="h-px w-10 md:w-16 bg-[#5a7a5a]/40" />
            <p className="font-cormorant text-lg md:text-2xl text-[#5a7a5a] tracking-widest">08 · 08 · 2026</p>
            <div className="h-px w-10 md:w-16 bg-[#5a7a5a]/40" />
          </div>

          {/* Countdown */}
          <div className="flex gap-4 md:gap-10 justify-center">
            {[
              { v: countdown.d, l: "дней" },
              { v: countdown.h, l: "часов" },
              { v: countdown.m, l: "минут" },
              { v: countdown.s, l: "секунд" },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <span className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#2d3a2d] block w-12 sm:w-16 tabular-nums">
                  {String(v).padStart(2, "0")}
                </span>
                <span className="font-golos text-[10px] sm:text-xs text-[#5a7a5a]/70 uppercase tracking-widest">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-[#5a7a5a]/60" />
        </div>
      </section>

      {/* О СОБЫТИИ */}
      <section id="about" className="py-24 px-6 max-w-3xl mx-auto text-center relative overflow-hidden">
        <Leaf className="text-[#4a6741] w-16 h-24 -top-4 right-0 rotate-[40deg] hidden md:block" />
        <Branch className="text-[#4a6741] w-14 h-24 top-8 left-0 rotate-[5deg] opacity-50 hidden md:block" />
        <Hexagon className="text-[#4a6741] -bottom-4 right-8 hidden md:block" size={70} />
        <Hexagon className="text-[#4a6741] top-16 left-8 hidden md:block" size={44} />
        <Monstera className="text-[#4a6741] w-28 h-36 bottom-0 left-0 rotate-[10deg] opacity-60 hidden md:block" />
        <Flower className="text-white/70 w-16 h-20 top-6 right-16 rotate-[-15deg] hidden md:block" />
        <Flower className="text-white/50 w-10 h-14 bottom-12 right-4 rotate-[20deg] hidden md:block" />
        <Section>
          <p className="font-cormorant italic text-[#5a7a5a] text-xl mb-4">О событии</p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#2d3a2d] mb-8 leading-tight">
            Мы создаём семью и хотим разделить<br className="hidden md:block" /> этот день с вами
          </h2>
          <p className="font-golos font-light text-[#4a5a4a] leading-relaxed text-lg mb-10">
            Мы рады сообщить Вам, что 08.08.2026 состоится самое главное торжество в нашей жизни — день нашей свадьбы!
            Приглашаем Вас разделить с нами радость этого незабываемого дня.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-xl mx-auto max-w-xs sm:max-w-sm">
            <img
              src="https://cdn.poehali.dev/projects/4f4dd924-afb2-473a-8dae-66b98855ef0a/bucket/5da8a58b-9d13-467f-b558-aae5f6fb1c4e.jpg"
              alt="Андрей и Мария"
              className="w-full object-cover"
            />
          </div>
        </Section>
      </section>

      {/* МЕСТО И ВРЕМЯ */}
      <section id="place" className="py-24 px-6 bg-[#eeeae0] relative overflow-hidden">
        <Leaf className="text-[#4a6741] w-32 h-48 top-0 left-0 rotate-[-10deg] opacity-60" />
        <Leaf className="text-[#4a6741] w-24 h-36 bottom-0 right-8 rotate-[20deg] opacity-60" />
        <Branch className="text-[#4a6741] w-16 h-32 bottom-8 left-1/3 rotate-[-8deg] opacity-40 hidden md:block" />
        <Hexagon className="text-[#4a6741] top-8 right-1/4 hidden md:block" size={90} />
        <Hexagon className="text-[#4a6741] bottom-12 left-1/4 hidden md:block" size={50} />
        <Monstera className="text-[#4a6741] w-32 h-40 top-4 right-4 rotate-[-12deg] opacity-50 hidden md:block" />
        <Monstera className="text-[#4a6741] w-24 h-32 bottom-4 left-4 rotate-[8deg] opacity-45 hidden md:block" />
        <Flower className="text-white/60 w-14 h-18 top-16 left-1/2 rotate-[10deg] hidden md:block" />
        <Flower className="text-white/50 w-10 h-14 bottom-20 right-1/3 rotate-[-20deg] hidden md:block" />

        <div className="max-w-5xl mx-auto relative z-10">
          <Section>
            <p className="font-cormorant italic text-[#5a7a5a] text-xl mb-4 text-center">Место и время</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#2d3a2d] mb-12 text-center">
              Банкетный зал «Шартрез»
            </h2>
          </Section>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Section>
              <div className="space-y-4">
                {[
                  { icon: "Calendar", label: "Дата", val: "8 августа 2026 года, суббота" },
                  { icon: "Clock", label: "Сбор гостей", val: "16:00" },
                  { icon: "MapPin", label: "Адрес", val: "г. Тула, Щекинское шоссе, 1А" },
                  { icon: "Car", label: "Парковка", val: "Бесплатная парковка на территории" },
                ].map(({ icon, label, val }) => (
                  <div key={label} className="flex items-start gap-4 bg-white/60 backdrop-blur rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-full bg-[#5a7a5a]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={icon} size={18} className="text-[#5a7a5a]" />
                    </div>
                    <div>
                      <p className="font-golos text-xs text-[#5a7a5a]/70 uppercase tracking-widest mb-0.5">{label}</p>
                      <p className="font-cormorant text-lg text-[#2d3a2d]">{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section>
              <div className="rounded-2xl overflow-hidden shadow-lg h-56 sm:h-72 md:h-[340px]">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=37.563%2C54.133%2C37.601%2C54.151&layer=mapnik&marker=54.141656%2C37.581873"
                  className="w-full h-full border-0"
                  title="Карта"
                  loading="lazy"
                />
              </div>
              <a
                href="https://maps.google.com/?q=54.141656,37.581873"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-4 font-golos text-sm text-[#5a7a5a] hover:text-[#2d3a2d] transition-colors group"
              >
                <Icon name="ExternalLink" size={14} />
                <span className="underline underline-offset-4 decoration-[#5a7a5a]/40 group-hover:decoration-[#2d3a2d]">
                  Открыть в Google Картах
                </span>
              </a>
            </Section>
          </div>
        </div>
      </section>

      {/* ПРОГРАММА */}
      <section id="program" className="py-24 px-6 max-w-2xl mx-auto relative overflow-hidden">
        <Branch className="text-[#4a6741] w-12 h-20 top-12 right-0 rotate-[-20deg] opacity-45 hidden md:block" />
        <Leaf className="text-[#4a6741] w-12 h-18 bottom-8 left-0 rotate-[30deg] opacity-50 hidden md:block" />
        <Hexagon className="text-[#4a6741] top-24 right-8 hidden md:block" size={55} />
        <Monstera className="text-[#4a6741] w-24 h-32 bottom-0 right-0 rotate-[-15deg] opacity-50 hidden md:block" />
        <Flower className="text-[#5a7a5a]/40 w-12 h-16 top-8 left-4 rotate-[5deg] hidden md:block" />
        <Flower className="text-[#5a7a5a]/30 w-9 h-12 bottom-16 right-4 rotate-[-10deg] hidden md:block" />
        <Section>
          <p className="font-cormorant italic text-[#5a7a5a] text-xl mb-4 text-center">Программа</p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#2d3a2d] mb-16 text-center">
            Расписание дня
          </h2>
        </Section>

        <div className="relative">
          <div className="absolute left-[31px] md:left-[38px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#5a7a5a]/30 to-transparent" />
          <div className="space-y-8">
            {TIMELINE.map(({ time, icon, label }) => (
              <Section key={label}>
                <div className="flex items-center gap-4 md:gap-6 group">
                  <div className="relative flex-shrink-0">
                    <div className="w-[62px] h-[62px] md:w-[76px] md:h-[76px] rounded-full bg-[#eeeae0] border-2 border-[#5a7a5a]/20 flex flex-col items-center justify-center group-hover:border-[#5a7a5a]/50 transition-colors">
                      <Icon name={icon} size={18} className="text-[#5a7a5a] mb-0.5" fallback="Star" />
                      <span className="font-cormorant text-xs font-medium text-[#5a7a5a]">{time}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-cormorant text-xl md:text-2xl text-[#2d3a2d]">{label}</p>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ДРЕСС-КОД */}
      <section id="dresscode" className="py-24 px-6 bg-[#eeeae0] relative overflow-hidden">
        <Leaf className="text-[#4a6741] w-20 h-32 top-8 right-0 rotate-[-30deg] opacity-50" />
        <Branch className="text-[#4a6741] w-16 h-28 bottom-4 left-0 rotate-[12deg] opacity-45 hidden md:block" />
        <Hexagon className="text-[#4a6741] top-10 left-8 hidden md:block" size={65} />
        <Hexagon className="text-[#4a6741] bottom-10 right-12 hidden md:block" size={80} />
        <Monstera className="text-[#4a6741] w-28 h-36 top-0 left-8 rotate-[5deg] opacity-55 hidden md:block" />
        <Monstera className="text-[#4a6741] w-20 h-28 bottom-0 right-6 rotate-[-8deg] opacity-45 hidden md:block" />
        <Flower className="text-white/65 w-14 h-18 top-12 right-1/4 rotate-[15deg] hidden md:block" />
        <Flower className="text-white/50 w-11 h-15 bottom-8 left-1/3 rotate-[-5deg] hidden md:block" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Section>
            <p className="font-cormorant italic text-[#5a7a5a] text-xl mb-4">Дресс-код</p>
            <p className="font-golos font-light text-[#4a5a4a] text-lg mb-14 max-w-xl mx-auto">
              Мы хотим создать особую атмосферу в этот день, и будем очень благодарны, если вы поддержите наш стиль!
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {DRESS_CODE.map(({ color, label }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md border-4 border-white"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-golos text-xs text-[#4a5a4a]/80 max-w-[80px] text-center leading-tight">{label}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/70 backdrop-blur rounded-2xl p-4 md:p-6 text-left max-w-lg mx-auto">
              <p className="font-cormorant text-xl text-[#2d3a2d] mb-3 font-medium">Пожалуйста, избегайте:</p>
              <ul className="space-y-2">
                {["Белого и молочно-белого (это цвет невесты)", "Ярких неоновых оттенков"].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-golos font-light text-[#4a5a4a]">
                    <span className="text-[#5a7a5a] mt-0.5">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      {/* ФОРМА РЕГИСТРАЦИИ */}
      <section id="rsvp" className="py-24 px-6 max-w-xl mx-auto text-center relative overflow-hidden">
        <Leaf className="text-[#4a6741] w-20 h-32 top-0 left-0 rotate-[20deg] opacity-40 hidden md:block" />
        <Branch className="text-[#4a6741] w-12 h-22 top-8 right-0 rotate-[-10deg] opacity-40 hidden md:block" />
        <Hexagon className="text-[#4a6741] bottom-16 right-4 hidden md:block" size={60} />
        <Monstera className="text-[#4a6741] w-24 h-32 bottom-0 left-0 rotate-[6deg] opacity-50 hidden md:block" />
        <Monstera className="text-[#4a6741] w-20 h-28 top-4 right-0 rotate-[-18deg] opacity-45 hidden md:block" />
        <Flower className="text-[#5a7a5a]/35 w-12 h-16 top-10 left-1/4 rotate-[-8deg] hidden md:block" />
        <Flower className="text-[#5a7a5a]/30 w-9 h-12 bottom-12 right-1/4 rotate-[12deg] hidden md:block" />
        <Section>
          <p className="font-cormorant italic text-[#5a7a5a] text-xl mb-4">Подтверждение</p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#2d3a2d] mb-4">
            Вы придёте?
          </h2>
          <p className="font-golos font-light text-[#4a5a4a] mb-12">
            Пожалуйста, подтвердите своё присутствие до 1 июля 2026
          </p>

          {submitted ? (
            <div className="bg-[#eeeae0] rounded-3xl p-8 md:p-12" style={{ animation: "fadeInUp 0.6s ease both" }}>
              <div className="text-5xl mb-4">🌿</div>
              <p className="font-cormorant text-2xl md:text-3xl text-[#2d3a2d] mb-2">Спасибо!</p>
              <p className="font-golos font-light text-[#4a5a4a]">Мы ждём вас 8 августа</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-left">
                <label className="font-golos text-xs text-[#5a7a5a]/70 uppercase tracking-widest block mb-1">Имя и Фамилия</label>
                <p className="font-cormorant italic text-[#5a7a5a] text-sm mb-2">если вы будете семьёй или парой — внесите все имена и фамилии</p>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Александр Иванов"
                  className="w-full bg-white border border-[#5a7a5a]/20 rounded-xl px-5 py-4 font-golos text-[#2d3a2d] placeholder:text-[#4a5a4a]/30 focus:outline-none focus:border-[#5a7a5a]/60 transition-colors"
                  required
                />
              </div>

              <div className="text-left">
                <label className="font-golos text-xs text-[#5a7a5a]/70 uppercase tracking-widest block mb-3">Смогу присутствовать?</label>
                <div className="flex flex-col gap-3">
                  {[
                    { val: "come_solo", label: "Я приду" },
                    { val: "come_together", label: "Мы приедем" },
                    { val: "plus_one", label: "Буду +1" },
                    { val: "no", label: "Прийти не получится" },
                  ].map(({ val, label }) => (
                    <label
                      key={val}
                      className={`flex items-center justify-center gap-3 px-5 py-4 rounded-xl border cursor-pointer transition-all font-golos
                        ${form.attendance === val
                          ? "bg-[#5a7a5a] border-[#5a7a5a] text-white"
                          : "bg-white border-[#5a7a5a]/20 text-[#4a5a4a] hover:border-[#5a7a5a]/50"
                        }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value={val}
                        className="sr-only"
                        onChange={() => setForm({ ...form, attendance: val })}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {error && (
                <p className="font-golos text-sm text-red-500 text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-5 rounded-xl font-golos font-medium text-white bg-[#5a7a5a] hover:bg-[#4a6741] active:scale-[0.98] transition-all duration-200 text-lg mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Отправляю..." : "Подтвердить"}
              </button>
            </form>
          )}
        </Section>
      </section>

      {/* FOOTER */}
      <footer className="py-16 text-center bg-[#2d3a2d] relative overflow-hidden">
        <Leaf className="text-white w-16 h-24 top-0 left-8 rotate-[-15deg] opacity-10" />
        <Leaf className="text-white w-20 h-32 bottom-0 right-8 rotate-[20deg] opacity-10" />
        <p className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-white/90 relative z-10 mb-3">А &amp; М</p>
        <p className="font-golos font-light text-white/50 text-sm tracking-widest relative z-10">08 · 08 · 2026</p>
        <div className="flex items-center justify-center gap-3 mt-6 relative z-10">
          <div className="h-px w-12 bg-white/20" />
          <span className="text-white/30 text-xs">🌿</span>
          <div className="h-px w-12 bg-white/20" />
        </div>
      </footer>
    </div>
  );
}