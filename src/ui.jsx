import { createContext, useContext, useEffect, useState } from "react";
export const DemoCtx = createContext(true);
export function useLoad(fn, deps = []) {
  const demo = useContext(DemoCtx);
  const [data, setData] = useState(null);
  const [tick, setTick] = useState(0);
  useEffect(() => { let on = true; fn().then((d) => on && setData(d)); return () => { on = false; }; }, [...deps, tick, demo]);
  return [data, () => setTick((t) => t + 1)];
}
export const inr = (n) => "₹" + n.toLocaleString("en-IN");
export const Stat = ({ n, t }) => <div className="card stat"><div className="n">{n}</div><div className="t">{t}</div></div>;
export const Chip = ({ kind = "", children }) => <span className={"chip " + kind}>{children}</span>;
export const Empty = ({ title, text }) => <div className="card empty"><b>{title}</b><div className="m">{text}</div></div>;
export function Switch({ on: initial }) {
  const [on, setOn] = useState(initial);
  return <button className={"sw" + (on ? " on" : "")} aria-pressed={on} onClick={() => setOn(!on)} />;
}
