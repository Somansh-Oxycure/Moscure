import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs'
import puppeteer from 'puppeteer'
import { preview } from 'vite'

function prerenderPlugin(options) {
  return {
    name: 'vite-plugin-prerender-custom',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      console.log('\n[prerender] Starting pre-rendering...')
      const routes = options.routes || ['/']
      const outDir = options.outDir || resolve('dist')

      let previewServer
      try {
        // Start Vite preview server programmatically
        previewServer = await preview({
          root: resolve('.'),
          preview: {
            port: 5173,
            host: 'localhost'
          }
        })
      } catch (err) {
        console.error('[prerender] Failed to start preview server:', err)
        return
      }

      const serverUrl = 'http://localhost:5173'
      console.log(`[prerender] Preview server started at ${serverUrl}`)

      let browser
      try {
        browser = await puppeteer.launch({
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
        const page = await browser.newPage()

        for (const route of routes) {
          const url = `${serverUrl}${route}`
          console.log(`[prerender] Rendering route: ${route}`)
          
          // Navigate and wait for network activity to be idle
          await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
          
          const html = await page.content()

          // Determine target directory
          const targetDir = route === '/' ? outDir : resolve(outDir, route.replace(/^\//, ''))
          if (!existsSync(targetDir)) {
            mkdirSync(targetDir, { recursive: true })
          }

          writeFileSync(resolve(targetDir, 'index.html'), html)
          console.log(`[prerender] Saved static file: ${targetDir}/index.html`)
        }
      } catch (err) {
        console.error('[prerender] Error during pre-rendering:', err)
      } finally {
        if (browser) {
          await browser.close()
        }
        if (previewServer) {
          if (typeof previewServer.close === 'function') {
            await previewServer.close()
          } else if (previewServer.httpServer) {
            previewServer.httpServer.close()
          }
        }
        console.log('[prerender] Pre-rendering complete!\n')
      }
    }
  }
}

function getRoutes() {
  try {
    const appContent = readFileSync(resolve('src/App.jsx'), 'utf-8')
    const routeRegex = /path=["']([^"']+)["']/g
    const routes = []
    let match
    while ((match = routeRegex.exec(appContent)) !== null) {
      const route = match[1]
      // Skip wildcard (*) and dynamic routes containing parameters (e.g. :id)
      if (route !== '*' && !route.includes(':')) {
        routes.push(route)
      }
    }
    return Array.from(new Set(routes))
  } catch (error) {
    console.error('[prerender] Error dynamically reading routes:', error)
    return ['/']
  }
}

export default defineConfig({
  plugins: [
    react(),
    prerenderPlugin({
      routes: getRoutes(),
    }),
  ],
})


