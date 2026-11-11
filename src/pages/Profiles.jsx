import { getProfiles } from "../api";
import { useLoad, Chip, Empty } from "../ui";
export default function Profiles() {
  const [list] = useLoad(getProfiles);
  if (!list) return null;
  if (!list.length) return <Empty title="No profiles yet" text="Add your identity and property documents to get verified." />;
  return (<div className="grid g2">{list.map((p) => (
    <div className="card" key={p.role}><h3>{p.role}: {p.name}</h3>
      {p.checks.map(([k, s]) => <div className="row" key={k}><span>{k}</span><Chip kind={s === "Verified" ? "ok" : "gold"}>{s}</Chip></div>)}
      <div style={{ marginTop: 12 }}><button className="btn ghost">Upload a document</button></div></div>))}</div>);
}
