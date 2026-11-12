import puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chromium"

export const GET = async (req: Request) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  })

  const page = await browser.newPage()

  await page.goto("https://google.com")

  await browser.close()

  return new Response("Hello, world!")
}