"use client";

import { useState } from "react";

export default function Home() {
  const [slug, setSlug] = useState("barber-landing-1");
  const [html, setHtml] = useState(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Barber Joe - Walk-ins Welcome</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 0; padding: 0; background: #020617; color: #e5e7eb; }
    .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center; }
    .card { max-width: 640px; width: 100%; background: #020617; border-radius: 16px; padding: 24px; border: 1px solid #1f2937; box-shadow: 0 20px 40px rgba(15,23,42,0.8); }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; border: 1px solid #22c55e33; font-size: 12px; color: #bbf7d0; margin-bottom: 12px; }
    .title { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
    .subtitle { font-size: 14px; color: #9ca3af; margin-bottom: 16px; }
    .pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; background: #22c55e1a; color: #bbf7d0; font-size: 12px; margin-bottom: 20px; }
    .pill-dot { width: 8px; height: 8px; border-radius: 999px; background: #22c55e; box-shadow: 0 0 10px #22c55e; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 20px; }
    .item { padding: 10px 12px; border-radius: 12px; background: #020617; border: 1px solid #1f2937; text-align: left; }
    .item-label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 3px; }
    .item-value { font-size: 14px; color: #e5e7eb; }
    .cta-row { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
    .cta-main { padding: 10px 14px; border-radius: 999px; border: none; cursor: pointer; background: #22c55e; color: #022c22; font-weight: 600; font-size: 14px; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .cta-main span.icon { font-size: 18px; }
    .cta-sub { font-size: 12px; color: #9ca3af; }
    .meta { font-size: 11px; color: #4b5563; display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
    @media (min-width: 640px) {
      .title { font-size: 32px; }
      .card { padding: 28px; }
    }
  </style>
</head>
<body>
  <section class="hero">
    <div class="card">
      <div class="badge">Barber Joe · Tampines</div>
      <h1 class="title">Fresh fades. Zero booking drama.</h1>
      <p class="subtitle">Walk-ins welcome daily. Quick, clean cuts for guys who want to look sharp without wasting the whole afternoon.</p>

      <div class="pill">
        <span class="pill-dot"></span>
        <span>Shortest wait after 2:30pm on weekdays</span>
      </div>

      <div class="grid">
        <div class="item">
          <div class="item-label">Today&apos;s hours</div>
          <div class="item-value">11:00am – 9:00pm</div>
        </div>
        <div class="item">
          <div class="item-label">Location</div>
          <div class="item-value">Blk 123 Tampines St 11 #01-11</div>
        </div>
        <div class="item">
          <div class="item-label">Whatsapp</div>
          <div class="item-value">+65 9123 4567</div>
        </div>
        <div class="item">
          <div class="item-label">Best for</div>
          <div class="item-value">Skin fades · Beard trim</div>
        </div>
      </div>

      <div class="cta-row">
        <button class="cta-main">
          <span class="icon">💈</span>
          <span>WhatsApp to check waiting time</span>
        </button>
        <div class="cta-sub">
          Prefer to just walk in? No problem. Most guys are in and out in under 30 minutes.
        </div>
      </div>

      <div class="meta">
        <span>Last updated: Jan 2026</span>
        <span>Powered by your barber&apos;s friend who loves building tools.</span>
      </div>
    </div>
  </section>
</body>
</html>`);
  const [deploying, setDeploying] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recent, setRecent] = useState<{ slug: string; url: string; at: string }[]>([]);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeploying(true);
    setError(null);
    setResultUrl(null);

    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, html }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to deploy");
      }

      const data = await res.json();
      setResultUrl(data.url);
      setRecent((prev) => [
        { slug, url: data.url, at: new Date().toLocaleString() },
        ...prev,
      ]);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setDeploying(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
      <div className="w-full max-w-2xl p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">
          Paste HTML → Deploy in seconds, not minutes
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">
              Slug (URL path, e.g. <code>barberjoe</code>)
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-sm"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="barber-landing-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              HTML Content
            </label>
            <textarea
              className="w-full h-64 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-sm font-mono"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={deploying}
            className="px-4 py-2 rounded bg-emerald-500 text-sm font-semibold disabled:bg-emerald-800"
          >
            {deploying ? "Deploying..." : "Deploy Now!"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            Error: {error}
          </p>
        )}

        {resultUrl && (
          <div className="mt-4 space-y-2">
            <p className="text-sm flex items-center gap-2 flex-wrap">
              <span>Live URL:</span>
              <a
                href={resultUrl}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 underline break-all"
              >
                {resultUrl}
              </a>
              <button
                type="button"
                onClick={async () => {
                  if (!resultUrl) return;
                  try {
                    await navigator.clipboard.writeText(resultUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1200);
                  } catch (e) {
                    console.error("Failed to copy", e);
                  }
                }}
                className="px-2 py-1 rounded border border-emerald-500 text-xs text-emerald-300 hover:bg-emerald-500/10"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </p>

            <iframe
              src={resultUrl}
              className="w-full h-64 border border-slate-800 rounded"
            />
          </div>
        )}

        {recent.length > 0 && (
          <div className="mt-6 border-t border-slate-800 pt-4">
            <h2 className="text-sm font-medium mb-2">Recent pages</h2>
            <ul className="space-y-1 text-xs">
              {recent.map((item, idx) => (
                <li
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] uppercase tracking-wide">
                      {item.slug}
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 underline break-all"
                    >
                      {item.url}
                    </a>
                  </div>
                  <span className="text-slate-500">{item.at}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
