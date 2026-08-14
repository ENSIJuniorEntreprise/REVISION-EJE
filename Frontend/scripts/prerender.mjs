// Prerenders each route to static HTML after `vite build`, so crawlers and
// first paint get real content instead of an empty <div id="root">.
// Runs `vite preview` locally, visits each route with headless Chrome, and
// writes the rendered DOM into dist/<route>/index.html.
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import puppeteer from 'puppeteer'
import { preview } from 'vite'

const routes = ['/', '/services', '/a-propos', '/contact', '/actualites']
const outDir = path.resolve('dist')

async function main() {
  const server = await preview({ preview: { port: 4173, strictPort: true } })
  const base = server.resolvedUrls.local[0]

  const browser = await puppeteer.launch({ headless: true })

  try {
    for (const route of routes) {
      const page = await browser.newPage()
      await page.goto(new URL(route, base).toString(), {
        waitUntil: 'networkidle2',
        timeout: 60000,
      })
      const html = await page.content()
      await page.close()

      const targetDir = route === '/' ? outDir : path.join(outDir, route)
      await mkdir(targetDir, { recursive: true })
      await writeFile(path.join(targetDir, 'index.html'), html, 'utf-8')
      console.log(`Prerendered ${route}`)
    }
  } finally {
    await browser.close()
    await new Promise((resolve, reject) => {
      server.httpServer.close((err) => (err ? reject(err) : resolve()))
    })
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
