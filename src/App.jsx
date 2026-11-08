import React, { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Copy, Check, Moon, Sun, Globe } from "lucide-react";

/* Amicro design system: Outfit font, <300ms motion, ease [0.16,1,0.3,1], reduced motion via MotionConfig */
const EASE = [0.16, 1, 0.3, 1];
const SPRING = { type: "spring", stiffness: 400, damping: 28 };
const haptic = () => { try { navigator.vibrate?.(10); } catch {} };

const EMAIL = "anselmicheku@gmail.com";
const KIND = ["web", "iam", "iam", "iam", "web"];
const VIS = ["bars", "hops", "tiles", "tags", "status"];

const T = {
  en: {
    role: "Software Developer",
    h: "Identity, security & infrastructure, built carefully.",
    sub: "Software developer focused on IAM, security and DevOps.",
    cta: "See projects", pt: "Selected work", st: "Toolbox", at: "About", copied: "Copied",
    filters: ["All", "IAM", "Web & Data"],
    about: ["I’m a software developer passionate about building practical solutions, automating processes and understanding the systems behind modern applications.", "My experience spans Python automation, web technologies, Linux environments, databases and application infrastructure. Through hands-on projects and practical problem-solving, I focus on developing solutions that improve efficiency, simplify complex workflows and address real-world challenges.", "I enjoy solving technical problems and turning repetitive or complex processes into efficient, maintainable solutions. Some of my work includes developing automated security-reporting workflows, supporting Moodle upgrades, building monitoring scripts and exploring security infrastructure through honeypot environments.", "Beyond application development, I’m particularly interested in Identity and Access Management (IAM), DevOps and Cybersecurity. I’m continuously expanding my knowledge in these areas, with a focus on understanding how applications, infrastructure and security work together.", "I believe in continuous learning, practical experimentation and improving through building. My goal is to develop reliable solutions, deepen my technical expertise and contribute to systems that make a meaningful difference."],
    projects: [
      ["Kursmonitoring IT-Training", "Moodle plugin replacing a scraping pipeline, with role-based UI, exports and a GDPR privacy provider."],
      ["Identity pipeline", "Traced identities through four hops, decoded custom sync rules, reviewed 388 accounts for cleanup with a script."],
      ["NexusIAM", "In progress: personal SSO with Keycloak, OpenLDAP, FastAPI and React. Docker Compose first, then Kubernetes and Terraform."],
      ["Identity labs", "ScimBridge, OAuthForge and an AWS SentinelIAM capstone built as hands-on portfolio projects."],
      ["Service Status Dashboard", "Service status dashboard: Node.js, React, PostgreSQL, Shibboleth SSO and Docker."],
    ],
    skills: [["Languages", "Python, Java, TypeScript, SQL"], ["Identity", "Keycloak, LDAP, AD/Entra, SAML, OAuth2"], ["Platform", "Docker, Linux, Terraform, GitHub"], ["Web", "React, Node.js, PostgreSQL"]],
  },
  de: {
    role: "Softwareentwickler",
    h: "Identität, Sicherheit & Infrastruktur, sorgfältig gebaut.",
    sub: "Softwareentwickler mit Schwerpunkt IAM, Security und DevOps.",
    cta: "Projekte ansehen", pt: "Ausgewählte Arbeiten", st: "Werkzeuge", at: "Über mich", copied: "Kopiert",
    filters: ["Alle", "IAM", "Web & Daten"],
    about: ["Ich bin Softwareentwickler und baue gerne praktische Lösungen, automatisiere Abläufe und möchte die Systeme hinter modernen Anwendungen verstehen.", "Meine Erfahrung umfasst Python-Automatisierung, Webtechnologien, Linux-Umgebungen, Datenbanken und Anwendungsinfrastruktur. Durch praxisnahe Projekte und konkretes Problemlösen entwickle ich Lösungen, die Effizienz steigern, komplexe Abläufe vereinfachen und reale Herausforderungen lösen.", "Ich löse gerne technische Probleme und mache aus wiederkehrenden oder komplexen Prozessen effiziente, wartbare Lösungen. Zu meiner praktischen Arbeit gehören automatisierte Security-Reporting-Workflows, die Unterstützung bei Moodle-Upgrades, Monitoring-Skripte und die Erkundung von Sicherheitsinfrastruktur in Honeypot-Umgebungen.", "Über die Anwendungsentwicklung hinaus interessiere ich mich besonders für Identity and Access Management (IAM), DevOps und Cybersecurity. Ich erweitere mein Wissen laufend und konzentriere mich darauf, wie Anwendungen, Infrastruktur und Sicherheit zusammenspielen.", "Ich glaube an kontinuierliches Lernen, praktisches Experimentieren und Wachsen durch Bauen. Mein Ziel ist es, verlässliche Lösungen zu entwickeln, meine Fachkompetenz zu vertiefen und zu Systemen beizutragen, die etwas bewirken."],
    projects: [
      ["Kursmonitoring IT-Training", "Moodle-Plugin statt Scraping-Pipeline, mit Rollen-UI, Exporten und DSGVO-Privacy-Provider."],
      ["Identitäts-Pipeline", "Identitäten über vier Stationen verfolgt, Sync-Regeln analysiert, 388 Konten per Skript zur Bereinigung geprüft."],
      ["NexusIAM", "In Arbeit: persönliches SSO mit Keycloak, OpenLDAP, FastAPI und React. Erst Docker Compose, dann Kubernetes und Terraform."],
      ["Identity-Labs", "ScimBridge, OAuthForge und ein AWS-SentinelIAM-Capstone als praktische Portfolio-Projekte."],
      ["Service Status Dashboard", "Service-Status-Dashboard: Node.js, React, PostgreSQL, Shibboleth-SSO und Docker."],
    ],
    skills: [["Sprachen", "Python, Java, TypeScript, SQL"], ["Identität", "Keycloak, LDAP, AD/Entra, SAML, OAuth2"], ["Plattform", "Docker, Linux, Terraform, GitHub"], ["Web", "React, Node.js, PostgreSQL"]],
  },
};

const chip = "rounded-full bg-white/10 px-2.5 py-1 text-xs";
const node = "rounded-xl border border-white/10 bg-[#1f1f1f] px-2.5 py-1.5 text-[11px]";

function Stage({ kind }) {
  if (kind === "bars")
    return <div className="flex h-[70%] w-[70%] items-end gap-2">{[40, 70, 55, 90, 65].map((h, i) => <div key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-t-md ${i % 2 ? "bg-[#2a2a2a]" : "bg-neutral-200"}`} />)}</div>;
  if (kind === "hops")
    return <div className="flex flex-wrap items-center justify-center gap-1.5">{["eDirectory", "AD", "Entra Connect", "Entra ID"].map((n, i) => <React.Fragment key={n}>{i > 0 && <span className="text-neutral-500">→</span>}<span className={node}>{n}</span></React.Fragment>)}</div>;
  if (kind === "tiles")
    return <div className="grid w-[60%] grid-cols-3 gap-2">{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className={`aspect-square rounded-xl border border-white/10 ${i === 4 ? "bg-neutral-200" : "bg-[#1f1f1f]"}`} />)}</div>;
  if (kind === "tags")
    return <div className="flex flex-wrap justify-center gap-1.5">{["SCIM 2.0", "OAuth2 + PKCE", "AWS", "Terraform"].map((x) => <span key={x} className={chip}>{x}</span>)}</div>;
  return <div className="grid w-[64%] gap-1.5 text-xs">{["Moodle", "Shibboleth", "PostgreSQL"].map((x) => <div key={x} className="flex justify-between rounded-xl bg-[#1f1f1f] px-3 py-2"><span>{x}</span><span>●</span></div>)}</div>;
}

/* Amicro icon swap: scale 0.5 + blur(4px) -> 1, popLayout, snappy spring */
function IconSwap({ k, children }) {
  return (
    <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span key={k} initial={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }} animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} exit={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }} transition={SPRING}>
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CopyButton({ text, onCopied, className = "" }) {
  const [done, setDone] = useState(false);
  const click = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText(text).catch(() => {});
    haptic(); onCopied(); setDone(true); setTimeout(() => setDone(false), 1600);
  };
  return (
    <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} transition={SPRING} onClick={click} title="Copy"
      className={`flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-neutral-200/80 bg-white text-neutral-600 hover:text-black dark:border-white/[0.07] dark:bg-[#161616] dark:text-neutral-400 dark:hover:text-white ${className}`}>
      <IconSwap k={done ? "ok" : "copy"}>{done ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}</IconSwap>
    </motion.button>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(true);
  const [filter, setFilter] = useState(0);
  const [toast, setToast] = useState(false);
  const t = T[lang];
  const showToast = () => { setToast(true); setTimeout(() => setToast(false), 1600); };
  const visible = t.projects.map((p, i) => ({ p, i })).filter(({ i }) => !filter || KIND[i] === (filter === 1 ? "iam" : "web"));
  const iconBtn = "flex h-[34px] min-w-[34px] cursor-pointer items-center justify-center rounded-[10px] border border-neutral-200/80 bg-white px-3 text-[13px] font-medium dark:border-white/[0.07] dark:bg-[#161616]";

  return (
    <MotionConfig reducedMotion="user">
      <div className={dark ? "dark" : ""} style={{ fontFamily: "'Outfit', sans-serif" }}>
        {/* add to index.html: <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap" rel="stylesheet"> */}
        <div className="min-h-screen bg-[#f8f9fa] text-black transition-colors duration-200 dark:bg-[#121212] dark:text-white">
          <div className="mx-auto max-w-[1100px] px-6">
            <header className="flex items-center justify-between gap-3 py-5">
              <span className="min-w-0 text-base font-semibold leading-tight tracking-[-0.015em] sm:text-lg">Chukwuebuka-Anselm Icheku</span>
              <div className="flex shrink-0 gap-1.5">
                <motion.button className={iconBtn} whileTap={{ scale: 0.94 }} transition={SPRING} onClick={() => { navigator.clipboard?.writeText(EMAIL); haptic(); showToast(); }} title="Copy email"><Copy className="h-3.5 w-3.5" /></motion.button>
                <motion.button className={iconBtn} whileTap={{ scale: 0.94 }} transition={SPRING} onClick={() => { setLang(lang === "en" ? "de" : "en"); haptic(); }}>
                  <IconSwap k={lang}><Globe className="h-3.5 w-3.5" /></IconSwap><span className="ml-1.5">{lang === "en" ? "DE" : "EN"}</span>
                </motion.button>
                <motion.button className={iconBtn} whileTap={{ scale: 0.94 }} transition={SPRING} onClick={() => { setDark(!dark); haptic(); }}>
                  <IconSwap k={dark ? "moon" : "sun"}>{dark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}</IconSwap>
                </motion.button>
              </div>
            </header>

            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: EASE }}>
              <p className="text-[13px] font-medium text-neutral-600 dark:text-neutral-400">{t.role}</p>
              <h1 className="my-3 max-w-[820px] text-[clamp(34px,6.5vw,60px)] font-semibold leading-[1.06] tracking-[-0.019em]">{t.h}</h1>
              <p className="max-w-[620px] text-lg text-neutral-600 dark:text-neutral-400">{t.sub}</p>
              <div className="mt-6 flex flex-wrap gap-2.5 text-sm font-medium">
                <a href="#projects" className="inline-flex h-[42px] items-center rounded-full bg-black px-5 text-white dark:bg-white dark:text-black">{t.cta}</a>
                <a href="https://github.com/oneaarmdeveloper" target="_blank" rel="noopener noreferrer" className="inline-flex h-[42px] items-center rounded-full border border-neutral-200/80 px-5 dark:border-white/[0.07]">GitHub ↗</a>
              </div>
            </motion.section>

            <div id="projects" className="mb-6 mt-14 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[26px] font-semibold tracking-[-0.015em]">{t.pt}</h2>
              <div className="flex rounded-full border border-neutral-300/30 bg-neutral-200/50 p-1 shadow-inner dark:border-white/5 dark:bg-[#181818]">
                {t.filters.map((f, i) => (
                  <button key={f} onClick={() => { setFilter(i); haptic(); }}
                    className={`cursor-pointer rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-150 ${filter === i ? "bg-white text-black shadow-sm dark:bg-[#2a2a2a] dark:text-white" : "text-black/70 hover:text-black dark:text-[#767676] dark:hover:text-white"}`}>{f}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visible.map(({ p, i }, n) => (
                  <motion.article layout key={i} className="group/card"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE, delay: Math.min(n * 0.015, 0.05) } }} exit={{ opacity: 0, transition: { duration: 0.14 } }}>
                    <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-3xl bg-black p-4 text-[#f0f0f0] transition-transform duration-200 group-hover/card:scale-[1.012]"><Stage kind={VIS[i]} /></div>
                    <div className="flex items-center justify-between gap-3 px-1 pt-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[17px] font-semibold tracking-[-0.015em]">{p[0]}</h3>
                        <p className="mt-0.5 line-clamp-2 text-[13px] text-neutral-600 dark:text-neutral-400">{p[1]}</p>
                      </div>
                      <CopyButton text={`${p[0]} — ${p[1]}`} onCopied={showToast} className="opacity-0 transition-opacity duration-200 focus-visible:opacity-100 group-hover/card:opacity-100 [@media(hover:none)]:opacity-100" />
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            <h2 className="mb-5 mt-14 text-[26px] font-semibold tracking-[-0.015em]">{t.st}</h2>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {t.skills.map(([k, v]) => (
                <div key={k} className="rounded-[20px] border border-neutral-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-colors duration-200 hover:border-neutral-300 dark:border-white/[0.07] dark:bg-[#161616] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)] dark:hover:border-white/[0.18]">
                  <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">{k}</span>
                  <p className="mt-1.5 font-medium">{v}</p>
                </div>
              ))}
            </div>

            <h2 className="mb-3 mt-14 text-[26px] font-semibold tracking-[-0.015em]">{t.at}</h2>
            <div className="max-w-[640px] space-y-3.5 text-[17px] text-neutral-600 dark:text-neutral-400">{t.about.map((p) => <p key={p}>{p}</p>)}</div>
            <footer className="mt-16 border-t border-neutral-200/80 py-7 text-[13px] text-neutral-600 dark:border-white/[0.07] dark:text-neutral-400">
              Chukwuebuka-Anselm Icheku
            </footer>
          </div>

          <AnimatePresence>
            {toast && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } }} exit={{ opacity: 0, transition: { duration: 0.14 } }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black px-[18px] py-2.5 text-[13px] font-medium text-white dark:bg-white dark:text-black">{t.copied}</motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}