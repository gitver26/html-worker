import { NextRequest, NextResponse } from "next/server";

const CLOUDFLARE_WORKER_URL =
  process.env.CLOUDFLARE_WORKER_URL ||
  process.env.NEXT_PUBLIC_WORKER_URL ||
  "https://www.instantwebai.shop";
export async function POST(req: NextRequest) {
  try {
    const { slug, html } = await req.json();

    if (!slug || !html) {
      return NextResponse.json(
        { error: "Missing slug or html" },
        { status: 400 }
      );
    }

    const cfRes = await fetch(
      `${CLOUDFLARE_WORKER_URL}/site/${encodeURIComponent(slug)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "text/html",
        },
        body: html,
      }
    );

    if (!cfRes.ok) {
      const text = await cfRes.text();
      return NextResponse.json(
        {
          error: "Cloudflare error",
          status: cfRes.status,
          body: text,
        },
        { status: 500 }
      );
    }

    const data = await cfRes.json();

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
