import { getDisputes } from "../api";
import { useLoad, Chip, Empty, inr } from "../ui";
export default function Disputes() {
  const [list] = useLoad(getDisputes);
  if (!list) return null;
  if (!list.length) return <Empty title="No disputes" text="If a disagreement comes up, the evidence is collected here." />;
  return list.map((d) => (
    <div className="card" key={d.id}><h3>{d.title} · {inr(d.amount)}</h3>
      <div className="tabs">{d.steps.map((s, i) => <Chip key={s} kind={i < d.stage ? "ok" : i === d.stage ? "gold" : ""}>{i + 1}. {s}</Chip>)}</div>
      <div className="m" style={{ marginBottom: 6 }}>Evidence on file</div>
      {d.evidence.map((e) => <div className="row" key={e}><span>{e}</span></div>)}
      <div style={{ marginTop: 12 }}><button className="btn ghost">Add evidence</button> <button className="btn gold">Request mediation</button></div></div>));
}
