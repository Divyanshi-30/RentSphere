import { Switch } from "../ui";
export default function Settings({ demo, onDemo }) {
  return (<>
    <div className="card"><h3>Data</h3>
      <div className="tog"><div>Show demo data<div className="m">Fills every page with sample content. Turn off to start with empty pages.</div></div>
        <button className={"sw" + (demo ? " on" : "")} aria-pressed={demo} aria-label="Show demo data" onClick={() => onDemo(!demo)} /></div></div>
    <div className="card mt"><h3>Profile and consent</h3>
      <div className="tog"><span>Email reminders for deadlines</span><Switch on={true} /></div>
      <div className="tog"><span>Allow partner to verify rent payments</span><Switch on={true} /></div>
      <div className="tog"><span>Show my score to landlords I apply to</span><Switch on={false} /></div></div>
  </>);
}
