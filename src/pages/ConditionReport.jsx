import { useContext, useState } from "react";
import { DemoCtx, Empty } from "../ui";
const rooms = ["Bedroom", "Bathroom", "Kitchen", "Living room"];
export default function ConditionReport() {
  const [room, setRoom] = useState(rooms[0]);
  const [v, setV] = useState(50);
  const demo = useContext(DemoCtx);
  if (!demo) return <Empty title="No condition report yet" text="Start a move-in report to capture each room with photos." />;
  // BACKEND HOOK: replace the CSS scenes with <img src> from GET /rooms/{id}/photos
  return (<>
    <div className="tabs">{rooms.map((r) => <button key={r} className={r === room ? "on" : ""} onClick={() => setRoom(r)}>{r}</button>)}</div>
    <div className="card">
      <div className="cmp">
        <div className="scene"><span className="tag" style={{ right: 10 }}>Move-out</span><div className="win" /><div className="door" /><div className="stain" /><div className="crack" /></div>
        <div className="scene top" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}><span className="tag" style={{ left: 10 }}>Move-in</span><div className="win" /><div className="door" /></div>
        <div className="bar" style={{ left: v + "%" }} />
      </div>
      <input className="cmp-range" type="range" min="0" max="100" value={v} onChange={(e) => setV(+e.target.value)} aria-label="Compare move-in and move-out" />
      <div className="row" style={{ border: 0, paddingBottom: 0 }}>
        <div>{room}: 2 differences found<div className="m">Wall stain (possible damage), floor scuff (normal wear)</div></div>
        <button className="btn gold">Retake with outline</button>
      </div>
    </div>
  </>);
}
