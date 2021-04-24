import { Application, h, puppeteer, renderToString, Router } from "./deps.ts";
import Layout from "./components/Layout.tsx";

const BROWSERLESS_TOKEN = Deno.env.get("BROWSERLESS_TOKEN");
if (BROWSERLESS_TOKEN === undefined) {
  throw new TypeError("Missing BROWSERLESS_TOKEN environment variable.");
}

const router = new Router();

router.get("/", (ctx) => {
  const rawUrl = ctx.request.url.searchParams.get("url");
  let url: URL | null = null;
  if (rawUrl !== null) {
    try {
      url = new URL(rawUrl ?? "");
    } catch {
      ctx.response.body = "Invalid URL";
      ctx.response.status = 400;
      return;
    }
  }
  const r = renderToString(
    <Layout title="Screenshot!">
      <p>
        Use this service to take screenshots of websites. Enter the url of the
        site below, and press submit. Loading of the image might take a moment.
      </p>
      <form action="/" method="GET">
        <label for="url">URL:</label>
        <input
          id="url"
          name="url"
          type="url"
          placeholder="URL"
          value={url?.href ?? ""}
        >
        </input>
        <button type="submit">Submit</button>
      </form>
      {url !== null
        ? (
          <div>
            <h3>{url.href}</h3>
            <img src={`/screenshot.png?url=${url.href}`} />
          </div>
        )
        : null}
    </Layout>,
  );
  ctx.response.body = `<!DOCTYPE html>${r}`;
  ctx.response.type = "text/html; charset=utf-8";
});

router.get("/screenshot.png", async (ctx) => {
  const rawUrl = ctx.request.url.searchParams.get("url");
  let url: URL;
  try {
    url = new URL(rawUrl ?? "");
  } catch {
    ctx.response.body = "Invalid URL";
    ctx.response.status = 400;
    return;
  }

  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_TOKEN}`,
  });
  try {
    const page = await browser.newPage();
    await page.goto(url.href, { waitUntil: "domcontentloaded" });
    const res = await page.screenshot() as Uint8Array;
    ctx.response.body = res;
    ctx.response.type = "png";
  } finally {
    await browser.close();
  }
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("error", (err) => console.error(err.message));

export default app;
