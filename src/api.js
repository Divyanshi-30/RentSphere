// BACKEND HOOK: every function below returns mock data today.
// When your FastAPI is ready, replace the body with a fetch to `${BASE}/...`
// (endpoint noted above each function). Pages never change.
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
let demoOn = (() => { try { return localStorage.getItem("demo") !== "off"; } catch { return true; } })();
export const isDemo = () => demoOn;
export const setDemo = (v) => { demoOn = v; try { localStorage.setItem("demo", v ? "on" : "off"); } catch {} };
const wait = (d) => new Promise((r) => setTimeout(() => r(d), 150));

const db = {
  summary: { depositHeld: 40000, openRequests: 2, nextRent: 18500, nextRentDate: "1 Dec", score: 92, responseHours: [["Jun",18],["Jul",12],["Aug",9],["Sep",6],["Oct",5],["Nov",4]] },
  deductions: [
    { id: 0, title: "Wall repainting, bedroom", amount: 3500, status: "open", evidence: "Photo pair 3 of 8" },
    { id: 1, title: "Bathroom tap replacement", amount: 900, status: "open", evidence: "Photo pair 6 of 8 + service request #12" },
    { id: 2, title: "Normal wear: floor scuffs", amount: 0, status: "waived", evidence: "Tagged as wear, not damage" },
  ],
  requests: [
    { id: 1, title: "Geyser not heating", urgency: "Urgent", status: "Scheduled", note: "Visit Thu, 4–6 pm · 1h 40m left to respond" },
    { id: 2, title: "Bathroom tap dripping", urgency: "Routine", status: "Acknowledged", note: "Raised 2 days ago · due in 3 days" },
    { id: 3, title: "Balcony light fused", urgency: "Routine", status: "Resolved", note: "Fixed in 1 day · within agreed time" },
  ],
  responsibilities: [["Geyser","Landlord"],["AC servicing","Tenant"],["Plumbing leaks","Landlord"],["Painting","Split 50/50"],["Appliance repair","Landlord"]],
  house: [["Overnight guests up to 3 nights",true],["Quiet hours 10 pm to 7 am",true],["Pets allowed",false],["Nails and wall fixtures with approval",true],["Landlord visits need 24 hours’ notice",true]],
  clauses: [{ text: "Clause 7: Landlord may enter with 24 hours’ notice", plain: "No surprise visits except emergencies.", typical: true }, { text: "Clause 12: Tenant pays full repainting on exit", plain: "You cover painting even for normal wear.", typical: false }],
  timeline: [["Nov 2026","Rent paid on time · 1 request resolved"],["Sep 2026","Geyser repaired in 6 hours"],["Jun 2026","Move-in report signed by both"]],
  share: [["On-time payment rate",true],["Number of months rented",true],["Exact rent amounts",false],["Maintenance request history",false]],
};

const none = { summary: { depositHeld: 0, openRequests: 0, nextRent: 0, nextRentDate: "–", score: 0, responseHours: [] }, rules: { responsibilities: [], house: [], clauses: [], terms: null }, record: { timeline: [], share: [] } };
export const getSummary = () => wait(demoOn ? db.summary : none.summary);   // GET /summary
export const getDeductions = () => wait(demoOn ? db.deductions.map((d) => ({ ...d })) : []); // GET /deductions
export const updateDeduction = (id, status) => { db.deductions[id].status = status; return wait(db.deductions[id]); }; // PATCH /deductions/{id}
const added = [];
export const getRequests = () => wait([...(demoOn ? db.requests : []), ...added]);
export const addRequest = (r) => { added.unshift({ id: Date.now(), title: r.title, urgency: r.urgency, status: "Raised", note: "Just now" + (r.photo ? " · photo: " + r.photo : "") }); return wait(true); }; // POST /requests (multipart, with photo)           // GET /requests
export const getRules = () => wait(demoOn ? { responsibilities: db.responsibilities, house: db.house, clauses: db.clauses, terms: db2.terms } : none.rules); // GET /rules
export const getRecord = () => wait(demoOn ? { timeline: db.timeline, share: db.share } : none.record); // GET /record
export { BASE };

const db2 = {
  terms: { rent: 18500, deposit: 40000, noticePeriod: "30 days", lockIn: "6 months", start: "1 Jun 2026", end: "30 Apr 2027" },
  profiles: [
    { role: "Tenant", name: "Sample Tenant", checks: [["Identity document", "Verified"], ["Phone number", "Verified"], ["College or employer", "Pending"]] },
    { role: "Landlord", name: "Sample Landlord", checks: [["Identity document", "Verified"], ["Property ownership papers", "Verified"], ["Utility bill matches address", "Pending"]] },
  ],
  payments: [
    { id: 1, month: "Nov 2026", amount: 18500, due: "1 Nov", status: "Paid", receipt: "RS-2611-001" },
    { id: 2, month: "Dec 2026", amount: 18500, due: "1 Dec", status: "Upcoming", receipt: "" },
    { id: 3, month: "Oct 2026", amount: 18500, due: "1 Oct", status: "Paid", receipt: "RS-2610-001" },
  ],
  messages: {
    threads: [{ id: 1, subject: "Geyser not heating", with: "Landlord", last: "Plumber booked for Thursday, 4–6 pm", time: "2h ago", unread: true }, { id: 2, subject: "Bathroom tap dripping", with: "Landlord", last: "Acknowledged, will schedule this week", time: "2 days ago", unread: false }],
    notices: [["Rent due in 20 days", "Today"], ["Move-out checklist unlocks 30 days before end", "3 days ago"]],
  },
  disputes: [{ id: 1, title: "Bedroom wall repainting charge", amount: 3500, stage: 2, steps: ["Raised", "Evidence shared", "Mediation", "Resolved"], evidence: ["Move-in photo, bedroom wall (Jun 2026)", "Move-out photo, bedroom wall (Nov 2026)", "Service request #12"] }],
};
export const getProfiles = () => wait(demoOn ? db2.profiles : []);   // GET /profiles
export const getPayments = () => wait(demoOn ? db2.payments : []);   // GET /payments
export const getMessages = () => wait(demoOn ? db2.messages : { threads: [], notices: [] }); // GET /messages
export const getDisputes = () => wait(demoOn ? db2.disputes : []);   // GET /disputes
