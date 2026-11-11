import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import ConditionReport from "./pages/ConditionReport.jsx";
import DepositLedger from "./pages/DepositLedger.jsx";
import Maintenance from "./pages/Maintenance.jsx";
import AgreementRules from "./pages/AgreementRules.jsx";
import TenancyRecord from "./pages/TenancyRecord.jsx";
import Settings from "./pages/Settings.jsx";
import Profiles from "./pages/Profiles.jsx";
import Rent from "./pages/Rent.jsx";
import Messages from "./pages/Messages.jsx";
import Disputes from "./pages/Disputes.jsx";
import { DemoCtx } from "./ui.jsx";
import { isDemo, setDemo } from "./api.js";
const Sun = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
const Moon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>;

const pages = [
  ["dash", "▦", "Dashboard", "Your tenancy at a glance", Dashboard],
  ["prof", "◉", "Profiles and Verification", "Verified identities and property", Profiles],
  ["rules", "☰", "Agreement and Rules", "Agreed once, visible to both", AgreementRules],
  ["rent", "₹", "Rent and Payments", "Due dates and receipts", Rent],
  ["dep", "⛁", "Deposit Ledger", "Every deduction needs proof", DepositLedger],
  ["maint", "⚒", "Maintenance", "Requests, deadlines and status", Maintenance],
  ["cond", "◧", "Move-in and Move-out", "Same angles, move-in against move-out", ConditionReport],
  ["msg", "✉", "Messages", "Conversations and notifications", Messages],
  ["disp", "⚖", "Disputes", "Evidence and resolution steps", Disputes],
  ["rec", "◷", "Tenancy Record", "Verified history you control", TenancyRecord],
  ["set", "⚙", "Settings", "Data and consent", Settings],
];

function initialTheme() {
  try { const t = localStorage.getItem("theme"); if (t) return t; } catch {}
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [page, setPage] = useState("dash");
  const [role, setRole] = useState("Tenant");
  const [min, setMin] = useState(innerWidth < 761);
  const [theme, setTheme] = useState(initialTheme);
  const [demo, setDemoState] = useState(isDemo);
  const onDemo = (v) => { setDemo(v); setDemoState(v); };
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);
  const [, , title, sub, Page] = pages.find((p) => p[0] === page);
  return (
    <DemoCtx.Provider value={demo}>
    <div className="app">
      <aside className={min ? "min" : ""}>
        <div className="brand"><button aria-label="Toggle menu" onClick={() => setMin(!min)}>☰</button><img className="logo-sm" src="/logo-icon.png" alt="" /><span>RentSphere</span></div>
        <nav>{pages.map(([id, ic, name]) => (
          <button key={id} className={id === page ? "on" : ""} onClick={() => setPage(id)}><span className="ic">{ic}</span><span className="lbl">{name}</span></button>))}</nav>
        <div className="side-foot lbl">{demo ? <>Flat 4B, Sector 22<br />Tenancy since Jun 2026</> : "No tenancy added yet"}</div>
      </aside>
      <main>
        <header>
          <div><h1>{title}</h1><div className="sub">{role} view · {sub}</div></div>
          <div className="tools">
            <button className="icon-btn" aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun /> : <Moon />}</button>
            <div className="seg">{["Tenant", "Landlord"].map((r) => <button key={r} className={role === r ? "on" : ""} onClick={() => setRole(r)}>{r}</button>)}</div>
          </div>
        </header>
        <Page role={role} demo={demo} onDemo={onDemo} />
      </main>
    </div>
    </DemoCtx.Provider>
  );
}
