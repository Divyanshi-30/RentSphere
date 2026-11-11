import { getMessages } from "../api";
import { useLoad, Chip, Empty } from "../ui";
export default function Messages() {
  const [d] = useLoad(getMessages);
  if (!d) return null;
  if (!d.threads.length && !d.notices.length) return <Empty title="No messages yet" text="Conversations and notifications will be collected here." />;
  return (<div className="grid g2">
    <div className="card"><h3>Conversations</h3>{d.threads.map((t) => (
      <div className="row" key={t.id}><div><b>{t.subject}</b>{t.unread && <> <Chip kind="gold">New</Chip></>}<div className="m">{t.with}: {t.last}</div></div><span className="m">{t.time}</span></div>))}</div>
    <div className="card"><h3>Notifications</h3>{d.notices.map(([x, t]) => <div className="row" key={x}><span>{x}</span><span className="m">{t}</span></div>)}</div>
  </div>);
}
