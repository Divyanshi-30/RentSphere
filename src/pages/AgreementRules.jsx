import { getRules } from "../api";
import { useLoad, Chip, Empty, Switch, inr } from "../ui";
export default function AgreementRules() {
  const [d] = useLoad(getRules);
  if (!d) return null;
  if (!d.responsibilities.length && !d.house.length) return <Empty title="No rules yet" text="Add who handles what and your house rules once the tenancy starts." />;
  return (<>
    {d.terms && <div className="card" style={{ marginBottom: 16 }}><h3>Key terms</h3><div className="grid g4">{[["Monthly rent", inr(d.terms.rent)], ["Security deposit", inr(d.terms.deposit)], ["Notice period", d.terms.noticePeriod], ["Lock-in", d.terms.lockIn], ["Starts", d.terms.start], ["Ends", d.terms.end]].map(([k, v]) => <div key={k}><div className="m">{k}</div><b>{v}</b></div>)}</div></div>}
    <div className="grid g2">
      <div className="card"><h3>Who handles what</h3>
        {d.responsibilities.map(([k, v]) => <div className="row" key={k}><span>{k}</span>
          <select defaultValue={v}>{["Landlord", "Tenant", "Split 50/50"].map((o) => <option key={o}>{o}</option>)}</select></div>)}</div>
      <div className="card"><h3>House rules</h3>
        {d.house.map(([k, on]) => <div className="tog" key={k}><span>{k}</span><Switch on={on} /></div>)}</div>
    </div>
    <div className="card mt"><h3>Agreement reader</h3>
      {d.clauses.map((c) => <div className="row" key={c.text}><div>{c.text}<div className="m">Plain meaning: {c.plain}</div></div>
        <Chip kind={c.typical ? "ok" : "bad"}>{c.typical ? "Typical" : "Unusual for this city"}</Chip></div>)}</div>
  </>);
}
