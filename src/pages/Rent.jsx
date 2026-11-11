import { getPayments } from "../api";
import { useLoad, Stat, Chip, Empty, inr } from "../ui";
export default function Rent() {
  const [list] = useLoad(getPayments);
  if (!list) return null;
  if (!list.length) return <Empty title="No payments yet" text="Rent due dates and receipts will appear here." />;
  const next = list.find((p) => p.status === "Upcoming");
  return (<>
    <div className="grid g4"><Stat n={next ? next.due : "–"} t="Next due date" /><Stat n={next ? inr(next.amount) : "–"} t="Next rent" /><Stat n={list.filter((p) => p.status === "Paid").length} t="Months paid on time" /></div>
    <div className="card mt"><h3>Payments and receipts</h3>{list.map((p) => (
      <div className="row" key={p.id}><div><b>{p.month}</b> · {inr(p.amount)}<div className="m">Due {p.due}{p.receipt && " · Receipt " + p.receipt}</div></div>
        <div><Chip kind={p.status === "Paid" ? "ok" : "gold"}>{p.status}</Chip> {p.receipt && <button className="btn ghost">Receipt</button>}</div></div>))}</div>
  </>);
}
