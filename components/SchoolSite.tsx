"use client";
import { useState, useEffect, type ReactNode } from "react";
import AddStuden, { type SavedStudent } from "../app/AddStudent/AddStuden";
import ShowStudent from "../app/StudentList/ShowStudent";

type Status =
  | "Received"
  | "Under review"
  | "Interview"
  | "Accepted"
  | "Rejected";
interface FormData {
  name: string;
  age: string;
  city: string;
  marks: string;
  parent: string;
  phone: string;
  email: string;
  grade: string;
  prev: string;
}
interface Application extends FormData {
  ref: string;
  status: Status;
  date: string;
  result: "Pass" | "Fail";
}
interface ContactMsg {
  name: string;
  phone: string;
  text: string;
  date: string;
}
interface StudentResult {
  n: string;
  c: string;
  m: Record<string, number>;
}
type ToastFn = (m: string) => void;

/* ---------- Helpers ---------- */
const ls = {
  get<T>(k: string, d: T): T {
    try {
      const v = localStorage.getItem(k);
      return v ? (JSON.parse(v) as T) : d;
    } catch {
      return d;
    }
  },
  set(k: string, v: unknown): void {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* storage unavailable */
    }
  },
};
const inp =
  "w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400";
const card = "bg-white rounded-2xl border border-slate-200";
const btn =
  "bg-indigo-950 text-white font-bold px-6 py-3 rounded-lg hover:opacity-90";
const pill = (on: boolean) =>
  "px-4 py-2 rounded-full text-sm font-semibold " +
  (on ? "bg-indigo-950 text-white" : "bg-slate-100");
const phoneOk = (p: string) =>
  /^(\+?92|0)?3\d{9}$/.test(p.replace(/[\s-]/g, ""));

/* ---------- Data ---------- */
const GRADES: string[] = Array.from(
  { length: 10 },
  (_, i) => "Grade " + (i + 1),
);
const NAV = [
  "About",
  "Academics",
  "Gallery",
  "Events",
  "Fees",
  "Results",
  "Admissions",
  "FAQ",
  "Contact",
];
const STATUS: Status[] = [
  "Received",
  "Under review",
  "Interview",
  "Accepted",
  "Rejected",
];
const PROG: Record<string, [string, string, string[]]> = {
  Primary: [
    "Grade 1 – 5",
    "Reading, numbers and curiosity in small classes with daily art and storytelling.",
    [
      "Phonics & literacy",
      "Hands-on maths",
      "Urdu, English, Islamiyat",
      "Weekly music & art",
    ],
  ],
  Middle: [
    "Grade 6 – 8",
    "Science projects, debates and coding basics teach students to think and work in teams.",
    [
      "Science lab practicals",
      "Coding club",
      "Public speaking",
      "House sports",
    ],
  ],
  Secondary: [
    "Grade 9 – 10",
    "Focused Matric preparation with mock exams, mentoring and career counselling.",
    [
      "Science & Arts groups",
      "Weekly mock tests",
      "Career guidance",
      "Scholarship coaching",
    ],
  ],
};
const FAC: [string, string][] = [
  ["🔬", "Science labs"],
  ["📚", "Library, 8,000 books"],
  ["💻", "Computer lab"],
  ["⚽", "Sports ground"],
  ["🚌", "Tracked buses"],
  ["🍎", "Hygienic canteen"],
];
const GAL: [string, string, string][] = [
  ["🎨", "Art week", "from-rose-400 to-amber-300"],
  ["🔬", "Science fair", "from-sky-400 to-indigo-500"],
  ["⚽", "Sports day", "from-emerald-400 to-teal-600"],
  ["🎤", "Debate finals", "from-violet-400 to-fuchsia-500"],
  ["📖", "Reading club", "from-amber-300 to-orange-500"],
  ["🎓", "Graduation", "from-indigo-500 to-indigo-900"],
  ["🌱", "Tree plantation", "from-lime-400 to-emerald-600"],
  ["🎭", "Annual play", "from-pink-400 to-rose-600"],
];
const EVT: [string, string, string][] = [
  ["12 Nov", "Annual Science Fair", "Academic"],
  ["20 Nov", "Inter-school Cricket", "Sports"],
  ["25 Nov", "Parent–Teacher Meeting", "Academic"],
  ["03 Dec", "Naat & Qirat Competition", "Culture"],
  ["10 Dec", "Sports Day", "Sports"],
  ["18 Dec", "Winter Concert", "Culture"],
];
const RES: Record<string, StudentResult> = {
  "1001": {
    n: "Ali Raza",
    c: "Grade 8",
    m: { English: 82, Maths: 91, Science: 88, Urdu: 79, Islamiyat: 93 },
  },
  "1002": {
    n: "Zainab Bibi",
    c: "Grade 10",
    m: { English: 71, Maths: 64, Physics: 77, Chemistry: 69, Urdu: 85 },
  },
};
const FAQ: [string, string][] = [
  [
    "What are the school timings?",
    "Mon – Sat, 8 am to 2 pm. The office is open until 3 pm.",
  ],
  [
    "Is there an admission test?",
    "Yes, a short written test and a friendly meeting with the child and parents.",
  ],
  [
    "Do you offer scholarships?",
    "Up to 50% for top scorers and for siblings of current students.",
  ],
  [
    "How does transport work?",
    "Buses cover all main routes in Kohat with live tracking for parents.",
  ],
];

/* ---------- Small components ---------- */
interface SectionProps {
  id: string;
  title: string;
  sub?: string;
  alt?: boolean;
  children: ReactNode;
}
function Section({ id, title, sub, alt, children }: SectionProps) {
  return (
    <section id={id} className={"py-16 " + (alt ? "bg-white" : "")}>
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-950">
          {title}
        </h2>
        {sub && <p className="mt-2 text-slate-600 max-w-xl">{sub}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function Row({ a, b, big }: { a: string; b: string; big?: boolean }) {
  return (
    <div className="flex justify-between py-2 border-b border-slate-200">
      <span>{a}</span>
      <b className={big ? "text-2xl text-emerald-600" : ""}>{b}</b>
    </div>
  );
}

function Fees() {
  const [g, setG] = useState<number>(0);
  const [sib, setSib] = useState<number>(0);
  const [bus, setBus] = useState<boolean>(false);
  const base = g < 5 ? 4500 : g < 8 ? 5500 : 7000;
  const disc = Math.min(sib * 5, 15);
  const tuition = Math.round(base * (1 - disc / 100));
  const month = tuition + (bus ? 2500 : 0);
  return (
    <div className={card + " p-6 grid md:grid-cols-2 gap-8"}>
      <div className="grid gap-4">
        <label className="grid gap-1 text-sm font-medium">
          Class
          <select
            className={inp}
            value={g}
            onChange={(e) => setG(Number(e.target.value))}
          >
            {GRADES.map((x, i) => (
              <option key={x} value={i}>
                {x}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Brothers/sisters already studying here
          <select
            className={inp}
            value={sib}
            onChange={(e) => setSib(Number(e.target.value))}
          >
            {[0, 1, 2, 3].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={bus}
            onChange={(e) => setBus(e.target.checked)}
          />
          School bus (Rs 2,500/month)
        </label>
      </div>
      <div>
        <Row a="Tuition (before discount)" b={"Rs " + base.toLocaleString()} />
        <Row
          a={"Sibling discount " + disc + "%"}
          b={"- Rs " + (base - tuition).toLocaleString()}
        />
        <Row a="One-time admission fee" b="Rs 10,000" />
        <Row a="Per month" b={"Rs " + month.toLocaleString()} big />
        <Row
          a="Per year (12 months)"
          b={"Rs " + (month * 12).toLocaleString()}
        />
      </div>
    </div>
  );
}

function Results() {
  const [roll, setRoll] = useState<string>("");
  const [r, setR] = useState<StudentResult | null>(null);
  const [err, setErr] = useState<string>("");
  const find = () => {
    const x = RES[roll.trim()];
    if (x) {
      setR(x);
      setErr("");
    } else {
      setR(null);
      setErr("No result found. Try roll number 1001 or 1002.");
    }
  };
  const marks = r ? Object.values(r.m) : [];
  const tot = marks.reduce((a, b) => a + b, 0);
  const n = marks.length || 1;
  const pct = Math.round(tot / n);
  const gr =
    pct >= 80
      ? "A+"
      : pct >= 70
        ? "A"
        : pct >= 60
          ? "B"
          : pct >= 50
            ? "C"
            : "F";
  return (
    <div className={card + " p-6"}>
      <div className="flex gap-3 flex-wrap">
        <input
          className={inp + " max-w-xs"}
          placeholder="Roll number (e.g. 1001)"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && find()}
        />
        <button className={btn} onClick={find}>
          Check result
        </button>
      </div>
      {err && <p className="mt-4 text-rose-600">{err}</p>}
      {r && (
        <div className="mt-6">
          <p className="text-xl font-bold">
            {r.n} <span className="text-slate-500 font-normal">({r.c})</span>
          </p>
          <div className="mt-4 grid gap-3">
            {Object.entries(r.m).map(([k, v]) => (
              <div key={k}>
                <div className="flex justify-between text-sm">
                  <span>{k}</span>
                  <b>{v}/100</b>
                </div>
                <div className="h-2 rounded bg-slate-200">
                  <div
                    className={
                      "h-2 rounded " +
                      (v >= 60 ? "bg-emerald-500" : "bg-rose-500")
                    }
                    style={{ width: v + "%" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 font-bold">
            Total {tot}/{n * 100} · {pct}% · Grade {gr}
          </p>
        </div>
      )}
    </div>
  );
}

interface TrackerProps {
  apps: Application[];
}
function Tracker({ apps }: TrackerProps) {
  const [q, setQ] = useState<string>("");
  const [found, setFound] = useState<Application | null | undefined>(undefined);
  const track = () =>
    setFound(
      apps.find((a) => a.ref.toLowerCase() === q.trim().toLowerCase()) ?? null,
    );
  return (
    <div className={card + " p-6 max-w-xl mx-auto"}>
      <h3 className="font-bold text-lg">Track your application</h3>
      <p className="text-sm text-slate-500 mt-1">
        Enter the reference number you received after saving.
      </p>
      <div className="mt-3 flex gap-2">
        <input
          className={inp}
          placeholder="NPS-12345"
          value={q}
          onChange={(ev) => setQ(ev.target.value)}
          onKeyDown={(ev) => ev.key === "Enter" && track()}
        />
        <button className={btn} onClick={track}>
          Go
        </button>
      </div>
      {found === null && (
        <p className="mt-3 text-rose-600 text-sm">
          No application with that number on this device.
        </p>
      )}
      {found && (
        <div className="mt-4">
          <p className="font-semibold">{found.name}</p>
          <p className="text-sm text-slate-500">
            {found.city} · Age {found.age} · {found.marks} marks ({found.result}
            )
          </p>
          <div className="mt-3 flex gap-1">
            {STATUS.slice(0, 4).map((s, i) => (
              <div
                key={s}
                className={
                  "h-2 flex-1 rounded " +
                  (found.status === "Rejected"
                    ? "bg-rose-400"
                    : i <= STATUS.indexOf(found.status)
                      ? "bg-emerald-500"
                      : "bg-slate-200")
                }
              />
            ))}
          </div>
          <p className="mt-2 text-sm">
            Status: <b>{found.status}</b>
          </p>
        </div>
      )}
    </div>
  );
}

interface ContactProps {
  msgs: ContactMsg[];
  setMsgs: (m: ContactMsg[]) => void;
  toast: ToastFn;
}
function Contact({ msgs, setMsgs, toast }: ContactProps) {
  const [f, setF] = useState({ name: "", phone: "", text: "" });
  const [e, setE] = useState<string>("");
  const send = () => {
    if (f.name.trim().length < 2) return setE("Enter your name");
    if (!phoneOk(f.phone)) return setE("Enter a valid mobile number");
    if (f.text.trim().length < 10) return setE("Write at least 10 characters");
    setE("");
    setMsgs([{ ...f, date: new Date().toLocaleString() }, ...msgs]);
    setF({ name: "", phone: "", text: "" });
    toast("Message sent. We will call you back.");
  };
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className={card + " p-6 grid gap-3"}>
        <input
          className={inp}
          placeholder="Your name"
          value={f.name}
          onChange={(x) => setF({ ...f, name: x.target.value })}
        />
        <input
          className={inp}
          placeholder="Mobile number"
          value={f.phone}
          onChange={(x) => setF({ ...f, phone: x.target.value })}
        />
        <textarea
          rows={4}
          className={inp}
          placeholder="How can we help?"
          value={f.text}
          onChange={(x) => setF({ ...f, text: x.target.value })}
        />
        {e && <p className="text-rose-600 text-sm">{e}</p>}
        <button className={btn} onClick={send}>
          Send message
        </button>
      </div>
      <div className={card + " p-6 grid gap-3 content-start"}>
        <p>📍 Billitang, Kohat, Khyber Pakhtunkhwa</p>
        <p>
          📞{" "}
          <a className="underline" href="tel:+923000000000">
            +92 300 0000000
          </a>
        </p>
        <p>
          ✉️{" "}
          <a className="underline" href="mailto:info@ASschool.edu.pk">
            info@ASschool.edu.pk
          </a>
        </p>
        <p>🕗 Mon – Sat, 8 am – 2 pm</p>
        <a
          className="underline text-emerald-600"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.google.com/maps/search/?api=1&query=Kohat"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

interface AdminProps {
  apps: Application[];
  setApps: (a: Application[]) => void;
  msgs: ContactMsg[];
  setMsgs: (m: ContactMsg[]) => void;
  close: () => void;
}
function Admin({ apps, setApps, msgs, setMsgs, close }: AdminProps) {
  const [pin, setPin] = useState<string>("");
  const [ok, setOk] = useState<boolean>(false);
  const [t, setT] = useState<"apps" | "msgs" | "db">("apps");
  const tabs: ["apps" | "msgs" | "db", string][] = [
    ["apps", `Applications (${apps.length})`],
    ["msgs", `Messages (${msgs.length})`],
    ["db", "Students (database)"],
  ];
  return (
    <div
      className="fixed inset-0 z-[60] bg-black/60 grid place-items-center p-4"
      onClick={close}
    >
      <div
        className={card + " w-full max-w-5xl max-h-[85vh] overflow-auto p-6"}
        onClick={(x) => x.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Office panel</h3>
          <button onClick={close} className="text-2xl" aria-label="Close">
            ✕
          </button>
        </div>
        {!ok ? (
          <div className="mt-6 flex gap-2">
            <input
              type="password"
              className={inp + " max-w-xs"}
              placeholder="PIN (demo: 1234)"
              value={pin}
              onChange={(x) => setPin(x.target.value)}
              onKeyDown={(x) => x.key === "Enter" && setOk(pin === "1234")}
            />
            <button className={btn} onClick={() => setOk(pin === "1234")}>
              Open
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex gap-2">
              {tabs.map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setT(k)}
                  className={pill(t === k)}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-3">
              {t === "db" ? (
                <ShowStudent embedded />
              ) : t === "apps" ? (
                apps.length ? (
                  apps.map((a) => (
                    <div
                      key={a.ref}
                      className="border border-slate-200 rounded-xl p-4 flex flex-wrap gap-3 justify-between items-center"
                    >
                      <div>
                        <p className="font-bold">
                          {a.name}{" "}
                          <span className="font-normal text-slate-500">
                            {a.grade && "· " + a.grade}
                          </span>
                        </p>
                        <p className="text-sm text-slate-500">
                          {a.ref} · {a.city} · Age {a.age} · {a.marks} marks (
                          {a.result})
                        </p>
                        <p className="text-sm text-slate-500">
                          {a.parent || "—"} · {a.phone || "—"} · {a.date}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <select
                          className="border rounded-lg px-2 py-1"
                          value={a.status}
                          onChange={(x) =>
                            setApps(
                              apps.map((y) =>
                                y.ref === a.ref
                                  ? { ...y, status: x.target.value as Status }
                                  : y,
                              ),
                            )
                          }
                        >
                          {STATUS.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                        <button
                          className="text-rose-600 px-2"
                          onClick={() =>
                            setApps(apps.filter((y) => y.ref !== a.ref))
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">No applications yet.</p>
                )
              ) : msgs.length ? (
                msgs.map((m, i) => (
                  <div
                    key={i}
                    className="border border-slate-200 rounded-xl p-4"
                  >
                    <p className="font-bold">
                      {m.name}{" "}
                      <span className="font-normal text-slate-500">
                        · {m.phone} · {m.date}
                      </span>
                    </p>
                    <p className="mt-1">{m.text}</p>
                    <button
                      className="text-rose-600 text-sm mt-2"
                      onClick={() => setMsgs(msgs.filter((_, j) => j !== i))}
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">No messages yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Main page ---------- */
export default function SchoolSite() {
  const [ready, setReady] = useState<boolean>(false); // true after browser data is loaded
  const [menu, setMenu] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("Primary");
  const [lb, setLb] = useState<number | null>(null);
  const [cat, setCat] = useState<string>("All");
  const [faq, setFaq] = useState<number>(0);
  const [admin, setAdmin] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [apps, setApps] = useState<Application[]>([]);
  const [msgs, setMsgs] = useState<ContactMsg[]>([]);
  const [rem, setRem] = useState<string[]>([]);

  // Load saved data in the browser only (the server has no window / localStorage)
  useEffect(() => {
    setApps(ls.get<Application[]>("nps-apps", []));
    setMsgs(ls.get<ContactMsg[]>("nps-msgs", []));
    setRem(ls.get<string[]>("nps-rem", []));
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) ls.set("nps-apps", apps);
  }, [apps, ready]);
  useEffect(() => {
    if (ready) ls.set("nps-msgs", msgs);
  }, [msgs, ready]);
  useEffect(() => {
    if (ready) ls.set("nps-rem", rem);
  }, [rem, ready]);
  useEffect(() => {
    const k = (x: KeyboardEvent) => {
      if (x.key === "Escape") setLb(null);
      if (lb !== null && x.key === "ArrowRight") setLb((lb + 1) % GAL.length);
      if (lb !== null && x.key === "ArrowLeft")
        setLb((lb + GAL.length - 1) % GAL.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [lb]);

  const toast: ToastFn = (m) => {
    setMsg(m);
    window.setTimeout(() => setMsg(""), 6000);
  };
  const onStudentSaved = (st: SavedStudent) => {
    const a: Application = {
      name: st.name,
      age: String(st.age),
      city: st.city,
      marks: String(st.marks),
      result: st.result,
      parent: "",
      phone: "",
      email: "",
      grade: "",
      prev: "",
      ref: "NPS-" + Math.floor(10000 + Math.random() * 90000),
      status: "Received",
      date: new Date().toLocaleDateString(),
    };
    setApps([a, ...apps]);
    toast("Saved! Your reference number is " + a.ref);
  };
  const p = PROG[tab];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      <header className="sticky top-0 z-50 bg-indigo-950/95 backdrop-blur text-white">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2 font-bold">
            <span className="w-9 h-9 rounded-lg bg-amber-400 text-indigo-950 grid place-items-center">
              N
            </span>
            AS Public School
          </a>
          <nav className="hidden lg:flex gap-5 text-sm text-indigo-100">
            {NAV.map((n) => (
              <a
                key={n}
                href={"#" + n.toLowerCase()}
                className="hover:text-amber-300"
              >
                {n}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAdmin(true)}
              className="hidden sm:block text-sm border border-indigo-400 px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              Office
            </button>
            <button
              onClick={() => setMenu(!menu)}
              className="lg:hidden text-2xl"
              aria-label="Menu"
            >
              {menu ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {menu && (
          <div className="lg:hidden px-5 pb-4 grid grid-cols-2 gap-3 text-indigo-100">
            {NAV.map((n) => (
              <a
                key={n}
                onClick={() => setMenu(false)}
                href={"#" + n.toLowerCase()}
              >
                {n}
              </a>
            ))}
            <button
              className="text-left"
              onClick={() => {
                setMenu(false);
                setAdmin(true);
              }}
            >
              Office panel
            </button>
          </div>
        )}
      </header>

      <section id="top" className="bg-indigo-950 text-white">
        <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-block bg-white/10 text-amber-300 text-sm px-3 py-1 rounded-full mb-5">
              Admissions open for 2027
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Where every child learns to lead.
            </h1>
            <p className="mt-5 text-indigo-200 text-lg max-w-md">
              Strong academics, kind teachers and a safe campus in Kohat, from
              Grade 1 to Matric.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#admissions"
                className="bg-amber-400 text-indigo-950 font-bold px-6 py-3 rounded-lg hover:bg-amber-300"
              >
                Apply online
              </a>
              <a
                href="#fees"
                className="border border-indigo-400 px-6 py-3 rounded-lg hover:bg-white/10"
              >
                Calculate fees
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["25+", "Years"],
              ["1,200", "Students"],
              ["60", "Teachers"],
              ["98%", "Pass rate"],
            ].map(([n, l]) => (
              <div
                key={l}
                className="bg-indigo-900 border border-indigo-700 rounded-2xl p-6"
              >
                <p className="text-4xl font-extrabold text-amber-300">{n}</p>
                <p className="text-indigo-200">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section
        id="about"
        title="About us"
        sub="Since 2001 we have raised confident, well-mannered students by teaching them to understand ideas, not just memorise them."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FAC.map(([i, t]) => (
            <div
              key={t}
              className={
                card +
                " p-5 flex items-center gap-4 hover:border-amber-400 transition-colors"
              }
            >
              <span className="text-3xl">{i}</span>
              <b>{t}</b>
            </div>
          ))}
        </div>
      </Section>

      <Section id="academics" alt title="Academics">
        <div className="flex gap-2">
          {Object.keys(PROG).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={pill(tab === k)}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="mt-6 bg-slate-50 rounded-2xl p-8 grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-amber-600 font-semibold">{p[0]}</p>
            <p className="mt-3 leading-relaxed">{p[1]}</p>
          </div>
          <ul className="grid gap-3">
            {p[2].map((x) => (
              <li
                key={x}
                className={card + " px-4 py-3 flex gap-3 items-center"}
              >
                <span className="text-emerald-600">✓</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        id="gallery"
        title="Life at AS"
        sub="Tap a photo to open it. Use the arrow keys to move through."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GAL.map(([e, t, c], i) => (
            <button
              key={t}
              onClick={() => setLb(i)}
              className={
                "aspect-square rounded-2xl bg-gradient-to-br text-white grid place-items-center hover:scale-[1.02] transition-transform " +
                c
              }
            >
              <span className="text-center">
                <span className="block text-5xl">{e}</span>
                <span className="text-sm font-semibold">{t}</span>
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section id="events" alt title="Events">
        <div className="flex gap-2 flex-wrap">
          {["All", "Academic", "Sports", "Culture"].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={pill(cat === c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {EVT.filter((x) => cat === "All" || x[2] === cat).map(([d, t, c]) => {
            const on = rem.includes(t);
            return (
              <div key={t} className={card + " p-4 flex items-center gap-4"}>
                <span className="bg-indigo-950 text-amber-300 font-bold rounded-lg px-3 py-2 text-sm">
                  {d}
                </span>
                <div className="flex-1">
                  <p className="font-semibold">{t}</p>
                  <p className="text-xs text-slate-500">{c}</p>
                </div>
                <button
                  onClick={() => {
                    setRem(on ? rem.filter((x) => x !== t) : [...rem, t]);
                    toast(
                      on ? "Reminder removed" : "Reminder saved on this device",
                    );
                  }}
                  className={
                    "text-sm px-3 py-1.5 rounded-lg border " +
                    (on
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "border-slate-300")
                  }
                >
                  {on ? "Reminder on" : "Remind me"}
                </button>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        id="fees"
        title="Fee calculator"
        sub="Pick a class to see the monthly and yearly cost."
      >
        <Fees />
      </Section>
      <Section
        id="results"
        alt
        title="Check a result"
        sub="Demo roll numbers: 1001 and 1002."
      >
        <Results />
      </Section>
      <Section
        id="admissions"
        title="Admissions"
        sub="Fill in the student record. After saving, use your reference number to track the application."
      >
        <AddStuden embedded onSaved={onStudentSaved} />
        <div className="mt-8">
          <Tracker apps={apps} />
        </div>
      </Section>

      <Section id="faq" alt title="Common questions">
        <div className="grid gap-3 max-w-3xl">
          {FAQ.map(([q, a], i) => (
            <div key={q} className={card}>
              <button
                className="w-full text-left px-5 py-4 font-semibold flex justify-between"
                onClick={() => setFaq(faq === i ? -1 : i)}
              >
                {q}
                <span>{faq === i ? "−" : "+"}</span>
              </button>
              {faq === i && <p className="px-5 pb-4 text-slate-600">{a}</p>}
            </div>
          ))}
        </div>
      </Section>
      <Section id="contact" title="Contact us">
        <Contact msgs={msgs} setMsgs={setMsgs} toast={toast} />
      </Section>

      <footer className="bg-indigo-950 text-indigo-300 text-sm text-center py-6">
        © 2026 AS Public School ·{" "}
        <button onClick={() => setAdmin(true)} className="underline">
          Office login
        </button>
      </footer>

      {lb !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 grid place-items-center p-4"
          onClick={() => setLb(null)}
        >
          <div
            className={
              "w-full max-w-lg aspect-square rounded-3xl bg-gradient-to-br text-white grid place-items-center " +
              GAL[lb][2]
            }
            onClick={(x) => x.stopPropagation()}
          >
            <div className="text-center">
              <p className="text-8xl">{GAL[lb][0]}</p>
              <p className="mt-3 text-2xl font-bold">{GAL[lb][1]}</p>
            </div>
          </div>
          <button
            className="absolute left-4 text-white text-4xl"
            onClick={(x) => {
              x.stopPropagation();
              setLb((lb + GAL.length - 1) % GAL.length);
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="absolute right-4 text-white text-4xl"
            onClick={(x) => {
              x.stopPropagation();
              setLb((lb + 1) % GAL.length);
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
      {admin && (
        <Admin
          apps={apps}
          setApps={setApps}
          msgs={msgs}
          setMsgs={setMsgs}
          close={() => setAdmin(false)}
        />
      )}
      {msg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-emerald-700 text-white px-5 py-3 rounded-xl shadow-lg">
          {msg}
        </div>
      )}
      <a
        href="#top"
        className="fixed bottom-5 right-5 w-11 h-11 rounded-full bg-amber-400 text-indigo-950 grid place-items-center font-bold shadow-lg"
        aria-label="Back to top"
      >
        ↑
      </a>
    </div>
  );
}
