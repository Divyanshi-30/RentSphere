import { getRecord } from "../api";
import { useLoad, Empty, Switch } from "../ui";
export default function TenancyRecord() {
  const [d] = useLoad(getRecord);
  if (!d) return null;
  if (!d.timeline.length && !d.share.length) return <Empty title="No tenancy record yet" text="Verified rent and maintenance events will appear here." />;
  return (
    <div className="grid g2">
      <div className="card"><h3>Verified timeline</h3>
        <div className="tl">{d.timeline.map(([t, x]) => <div key={t}><b>{t}</b><div className="m">{x}</div></div>)}</div></div>
      <div className="card"><h3>Share with a new landlord</h3>
        {d.share.map(([k, on]) => <div className="tog" key={k}><span>{k}</span><Switch on={on} /></div>)}
        <div style={{ marginTop: 14 }}><button className="btn gold">Create link, expires in 7 days</button></div></div>
    </div>);
}
