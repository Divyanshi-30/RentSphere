import { useState } from "react";
import { getRequests, addRequest } from "../api";
import { useLoad, Chip, Empty } from "../ui";
export default function Maintenance({ role }) {
  const [reqs, reload] = useLoad(getRequests);
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ title: "", urgency: "Routine", photo: "" });
  if (!reqs) return null;
  const submit = () => { if (!f.title.trim()) return; addRequest(f).then(() => { reload(); setOpen(false); setF({ title: "", urgency: "Routine", photo: "" }); }); };
  return (<>
    <div style={{ marginBottom: 14 }}><button className="btn gold" onClick={() => role === "Tenant" && setOpen(!open)}>{role === "Tenant" ? "Raise a request" : "Add a vendor quote"}</button></div>
    {open && <div className="card" style={{ marginBottom: 16 }}><h3>New request</h3>
      <div className="row"><input placeholder="What needs fixing?" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid var(--line)", background: "var(--card)", color: "var(--ink)", font: "inherit" }} />
        <select value={f.urgency} onChange={(e) => setF({ ...f, urgency: e.target.value })}>{["Emergency", "Urgent", "Routine"].map((u) => <option key={u}>{u}</option>)}</select></div>
      <div className="row"><input type="file" accept="image/*" onChange={(e) => setF({ ...f, photo: e.target.files[0]?.name || "" })} /><button className="btn" onClick={submit}>Submit</button></div></div>}
    {reqs.length ? <div className="card">{reqs.map((r) => (
      <div className="row" key={r.id}>
        <div><b>{r.title}</b><div className="m">{r.note}</div></div>
        <div><Chip kind={r.urgency === "Urgent" || r.urgency === "Emergency" ? "bad" : ""}>{r.urgency}</Chip> <Chip kind={r.status === "Resolved" ? "ok" : "gold"}>{r.status}</Chip></div>
      </div>))}</div> : <Empty title="No requests yet" text="Raise a request when something needs fixing." />}
    <div className="card mt"><h3>Agreed response times</h3>
      <div className="row"><span>Emergency</span><b>2 hours</b></div>
      <div className="row"><span>Urgent</span><b>24 hours</b></div>
      <div className="row"><span>Routine</span><b>3 days</b></div>
      <div className="m">Missed deadlines trigger an automatic reminder, then escalate.</div></div>
  </>);
}
