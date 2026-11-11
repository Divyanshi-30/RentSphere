import { getDeductions, getSummary, updateDeduction } from "../api";
import { useLoad, Stat, Chip, Empty, inr } from "../ui";
export default function DepositLedger({ role }) {
  const [list, reload] = useLoad(getDeductions);
  const [s] = useLoad(getSummary);
  if (!list || !s) return null;
  const total = list.reduce((a, d) => a + (d.status === "contested" ? 0 : d.amount), 0);
  const act = (id, st) => updateDeduction(id, st).then(reload);
  return (<>
    <div className="grid g4">
      <Stat n={inr(s.depositHeld)} t="Deposit held" />
      <Stat n={inr(total)} t="Proposed deductions" />
      <Stat n={inr(s.depositHeld - total)} t="To be released at move-out" />
    </div>
    {list.length ? <div className="card mt"><h3>Deductions and evidence</h3>
      {list.map((d) => (
        <div className="row" key={d.id}>
          <div><b>{d.title}</b> · {inr(d.amount)}<div className="m">Evidence: {d.evidence}</div></div>
          <div>{d.status === "open"
            ? role === "Tenant"
              ? <><button className="btn ghost" onClick={() => act(d.id, "contested")}>Contest</button> <button className="btn" onClick={() => act(d.id, "accepted")}>Accept</button></>
              : <Chip kind="gold">Awaiting tenant</Chip>
            : <Chip kind={d.status === "contested" ? "bad" : "ok"}>{d.status}</Chip>}</div>
        </div>))}
    </div> : <div className="mt"><Empty title="No deductions" text="Any deduction will appear here with its photo evidence." /></div>}
  </>);
}
