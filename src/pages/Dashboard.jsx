import { useContext } from "react";
import { getSummary } from "../api";
import { useLoad, Stat, Chip, Empty, DemoCtx, inr } from "../ui";
export default function Dashboard() {
  const [s] = useLoad(getSummary);
  const demo = useContext(DemoCtx);
  if (!s) return null;
  return (<>
    <div className="grid g4">
      <Stat n={inr(s.depositHeld)} t="Deposit held with partner" />
      <Stat n={s.openRequests} t="Open maintenance requests" />
      <Stat n={s.nextRentDate} t={"Next rent, " + inr(s.nextRent)} />
      <Stat n={s.score} t="Tenancy score" />
    </div>
    <div className="grid g2 mt">
      <div className="card"><h3>Landlord response time (hours)</h3>
        {s.responseHours.length ? <div className="bars">{s.responseHours.map(([m, h]) => <i key={m} style={{ height: h * 7 }}><small>{m}</small></i>)}</div> : <div className="m">Response times appear after the first maintenance request.</div>}</div>
      {demo ? <div className="card"><h3>Recent activity</h3>
        <div className="row"><div>Geyser visit scheduled<div className="m">Today</div></div><Chip kind="gold">Maintenance</Chip></div>
        <div className="row"><div>October rent paid on time<div className="m">1 Nov</div></div><Chip kind="ok">Paid</Chip></div>
        <div className="row"><div>Move-out checklist unlocked<div className="m">30 days before end</div></div><Chip>Report</Chip></div>
      </div> : <Empty title="No activity yet" text="Rent payments and maintenance updates will show here." />}
    </div>
  </>);
}
