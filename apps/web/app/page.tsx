const layers = [
  ["AI Core", "Provider registry + intent router"],
  ["Agents", "Opt-in tool loops, not default architecture"],
  ["Tools", "Tavily / Brave / Pexels adapters + MCP-ready registry"],
  ["Data", "Supabase Postgres/Auth/Storage + RLS migrations"],
  ["Quality", "Vitest + Promptfoo + skill quality gates"],
  ["Deploy", "Vercel-ready Next.js workspace"],
] as const;

export default function Home() {
  return <main><span className="badge">FOUNDATION V1</span><h1>Build AI products without rebuilding the plumbing.</h1><p>This repository is intentionally product-neutral. Product features should be added only after the model, tool, data, security and evaluation contracts are working.</p><div className="grid">{layers.map(([title,description])=><section className="card" key={title}><strong>{title}</strong><span>{description}</span></section>)}</div><p>Health: <code>/api/health</code> · AI smoke endpoint: <code>/api/ai</code></p></main>;
}
