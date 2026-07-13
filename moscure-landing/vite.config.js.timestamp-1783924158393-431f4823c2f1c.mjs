// vite.config.js
import { defineConfig } from "file:///C:/Users/soman/OneDrive/Desktop/Moscure/moscure-landing/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/soman/OneDrive/Desktop/Moscure/moscure-landing/node_modules/@vitejs/plugin-react/dist/index.js";
import { resolve } from "path";
import { writeFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import puppeteer from "file:///C:/Users/soman/OneDrive/Desktop/Moscure/moscure-landing/node_modules/puppeteer/lib/puppeteer/puppeteer.js";
import { preview } from "file:///C:/Users/soman/OneDrive/Desktop/Moscure/moscure-landing/node_modules/vite/dist/node/index.js";
function prerenderPlugin(options) {
  return {
    name: "vite-plugin-prerender-custom",
    apply: "build",
    enforce: "post",
    async closeBundle() {
      console.log("\n[prerender] Starting pre-rendering...");
      const routes = options.routes || ["/"];
      const outDir = options.outDir || resolve("dist");
      let previewServer;
      try {
        previewServer = await preview({
          root: resolve("."),
          preview: {
            port: 5173,
            host: "localhost"
          }
        });
      } catch (err) {
        console.error("[prerender] Failed to start preview server:", err);
        return;
      }
      const serverUrl = "http://localhost:5173";
      console.log(`[prerender] Preview server started at ${serverUrl}`);
      let browser;
      try {
        browser = await puppeteer.launch({
          headless: "new",
          args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        const page = await browser.newPage();
        for (const route of routes) {
          const url = `${serverUrl}${route}`;
          console.log(`[prerender] Rendering route: ${route}`);
          await page.goto(url, { waitUntil: "networkidle0", timeout: 3e4 });
          const html = await page.content();
          const targetDir = route === "/" ? outDir : resolve(outDir, route.replace(/^\//, ""));
          if (!existsSync(targetDir)) {
            mkdirSync(targetDir, { recursive: true });
          }
          writeFileSync(resolve(targetDir, "index.html"), html);
          console.log(`[prerender] Saved static file: ${targetDir}/index.html`);
        }
      } catch (err) {
        console.error("[prerender] Error during pre-rendering:", err);
      } finally {
        if (browser) {
          await browser.close();
        }
        if (previewServer) {
          if (typeof previewServer.close === "function") {
            await previewServer.close();
          } else if (previewServer.httpServer) {
            previewServer.httpServer.close();
          }
        }
        console.log("[prerender] Pre-rendering complete!\n");
      }
    }
  };
}
function getRoutes() {
  try {
    const appContent = readFileSync(resolve("src/App.jsx"), "utf-8");
    const routeRegex = /path=["']([^"']+)["']/g;
    const routes = [];
    let match;
    while ((match = routeRegex.exec(appContent)) !== null) {
      const route = match[1];
      if (route !== "*" && !route.includes(":")) {
        routes.push(route);
      }
    }
    return Array.from(new Set(routes));
  } catch (error) {
    console.error("[prerender] Error dynamically reading routes:", error);
    return ["/"];
  }
}
var vite_config_default = defineConfig({
  plugins: [
    react(),
    prerenderPlugin({
      routes: getRoutes()
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxzb21hblxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXE1vc2N1cmVcXFxcbW9zY3VyZS1sYW5kaW5nXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxzb21hblxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXE1vc2N1cmVcXFxcbW9zY3VyZS1sYW5kaW5nXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9zb21hbi9PbmVEcml2ZS9EZXNrdG9wL01vc2N1cmUvbW9zY3VyZS1sYW5kaW5nL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgd3JpdGVGaWxlU3luYywgZXhpc3RzU3luYywgbWtkaXJTeW5jLCByZWFkRmlsZVN5bmMgfSBmcm9tICdmcydcclxuaW1wb3J0IHB1cHBldGVlciBmcm9tICdwdXBwZXRlZXInXHJcbmltcG9ydCB7IHByZXZpZXcgfSBmcm9tICd2aXRlJ1xyXG5cclxuZnVuY3Rpb24gcHJlcmVuZGVyUGx1Z2luKG9wdGlvbnMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3ZpdGUtcGx1Z2luLXByZXJlbmRlci1jdXN0b20nLFxyXG4gICAgYXBwbHk6ICdidWlsZCcsXHJcbiAgICBlbmZvcmNlOiAncG9zdCcsXHJcbiAgICBhc3luYyBjbG9zZUJ1bmRsZSgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1xcbltwcmVyZW5kZXJdIFN0YXJ0aW5nIHByZS1yZW5kZXJpbmcuLi4nKVxyXG4gICAgICBjb25zdCByb3V0ZXMgPSBvcHRpb25zLnJvdXRlcyB8fCBbJy8nXVxyXG4gICAgICBjb25zdCBvdXREaXIgPSBvcHRpb25zLm91dERpciB8fCByZXNvbHZlKCdkaXN0JylcclxuXHJcbiAgICAgIGxldCBwcmV2aWV3U2VydmVyXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gU3RhcnQgVml0ZSBwcmV2aWV3IHNlcnZlciBwcm9ncmFtbWF0aWNhbGx5XHJcbiAgICAgICAgcHJldmlld1NlcnZlciA9IGF3YWl0IHByZXZpZXcoe1xyXG4gICAgICAgICAgcm9vdDogcmVzb2x2ZSgnLicpLFxyXG4gICAgICAgICAgcHJldmlldzoge1xyXG4gICAgICAgICAgICBwb3J0OiA1MTczLFxyXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0J1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1twcmVyZW5kZXJdIEZhaWxlZCB0byBzdGFydCBwcmV2aWV3IHNlcnZlcjonLCBlcnIpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHNlcnZlclVybCA9ICdodHRwOi8vbG9jYWxob3N0OjUxNzMnXHJcbiAgICAgIGNvbnNvbGUubG9nKGBbcHJlcmVuZGVyXSBQcmV2aWV3IHNlcnZlciBzdGFydGVkIGF0ICR7c2VydmVyVXJsfWApXHJcblxyXG4gICAgICBsZXQgYnJvd3NlclxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGJyb3dzZXIgPSBhd2FpdCBwdXBwZXRlZXIubGF1bmNoKHtcclxuICAgICAgICAgIGhlYWRsZXNzOiAnbmV3JyxcclxuICAgICAgICAgIGFyZ3M6IFsnLS1uby1zYW5kYm94JywgJy0tZGlzYWJsZS1zZXR1aWQtc2FuZGJveCddXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zdCBwYWdlID0gYXdhaXQgYnJvd3Nlci5uZXdQYWdlKClcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCByb3V0ZSBvZiByb3V0ZXMpIHtcclxuICAgICAgICAgIGNvbnN0IHVybCA9IGAke3NlcnZlclVybH0ke3JvdXRlfWBcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBbcHJlcmVuZGVyXSBSZW5kZXJpbmcgcm91dGU6ICR7cm91dGV9YClcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gTmF2aWdhdGUgYW5kIHdhaXQgZm9yIG5ldHdvcmsgYWN0aXZpdHkgdG8gYmUgaWRsZVxyXG4gICAgICAgICAgYXdhaXQgcGFnZS5nb3RvKHVybCwgeyB3YWl0VW50aWw6ICduZXR3b3JraWRsZTAnLCB0aW1lb3V0OiAzMDAwMCB9KVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBjb25zdCBodG1sID0gYXdhaXQgcGFnZS5jb250ZW50KClcclxuXHJcbiAgICAgICAgICAvLyBEZXRlcm1pbmUgdGFyZ2V0IGRpcmVjdG9yeVxyXG4gICAgICAgICAgY29uc3QgdGFyZ2V0RGlyID0gcm91dGUgPT09ICcvJyA/IG91dERpciA6IHJlc29sdmUob3V0RGlyLCByb3V0ZS5yZXBsYWNlKC9eXFwvLywgJycpKVxyXG4gICAgICAgICAgaWYgKCFleGlzdHNTeW5jKHRhcmdldERpcikpIHtcclxuICAgICAgICAgICAgbWtkaXJTeW5jKHRhcmdldERpciwgeyByZWN1cnNpdmU6IHRydWUgfSlcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB3cml0ZUZpbGVTeW5jKHJlc29sdmUodGFyZ2V0RGlyLCAnaW5kZXguaHRtbCcpLCBodG1sKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coYFtwcmVyZW5kZXJdIFNhdmVkIHN0YXRpYyBmaWxlOiAke3RhcmdldERpcn0vaW5kZXguaHRtbGApXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdbcHJlcmVuZGVyXSBFcnJvciBkdXJpbmcgcHJlLXJlbmRlcmluZzonLCBlcnIpXHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgaWYgKGJyb3dzZXIpIHtcclxuICAgICAgICAgIGF3YWl0IGJyb3dzZXIuY2xvc2UoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJldmlld1NlcnZlcikge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBwcmV2aWV3U2VydmVyLmNsb3NlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHByZXZpZXdTZXJ2ZXIuY2xvc2UoKVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChwcmV2aWV3U2VydmVyLmh0dHBTZXJ2ZXIpIHtcclxuICAgICAgICAgICAgcHJldmlld1NlcnZlci5odHRwU2VydmVyLmNsb3NlKClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1twcmVyZW5kZXJdIFByZS1yZW5kZXJpbmcgY29tcGxldGUhXFxuJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Um91dGVzKCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBhcHBDb250ZW50ID0gcmVhZEZpbGVTeW5jKHJlc29sdmUoJ3NyYy9BcHAuanN4JyksICd1dGYtOCcpXHJcbiAgICBjb25zdCByb3V0ZVJlZ2V4ID0gL3BhdGg9W1wiJ10oW15cIiddKylbXCInXS9nXHJcbiAgICBjb25zdCByb3V0ZXMgPSBbXVxyXG4gICAgbGV0IG1hdGNoXHJcbiAgICB3aGlsZSAoKG1hdGNoID0gcm91dGVSZWdleC5leGVjKGFwcENvbnRlbnQpKSAhPT0gbnVsbCkge1xyXG4gICAgICBjb25zdCByb3V0ZSA9IG1hdGNoWzFdXHJcbiAgICAgIC8vIFNraXAgd2lsZGNhcmQgKCopIGFuZCBkeW5hbWljIHJvdXRlcyBjb250YWluaW5nIHBhcmFtZXRlcnMgKGUuZy4gOmlkKVxyXG4gICAgICBpZiAocm91dGUgIT09ICcqJyAmJiAhcm91dGUuaW5jbHVkZXMoJzonKSkge1xyXG4gICAgICAgIHJvdXRlcy5wdXNoKHJvdXRlKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KHJvdXRlcykpXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1twcmVyZW5kZXJdIEVycm9yIGR5bmFtaWNhbGx5IHJlYWRpbmcgcm91dGVzOicsIGVycm9yKVxyXG4gICAgcmV0dXJuIFsnLyddXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBwcmVyZW5kZXJQbHVnaW4oe1xyXG4gICAgICByb3V0ZXM6IGdldFJvdXRlcygpLFxyXG4gICAgfSksXHJcbiAgXSxcclxufSlcclxuXHJcblxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFXLFNBQVMsb0JBQW9CO0FBQ2xZLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsU0FBUyxlQUFlLFlBQVksV0FBVyxvQkFBb0I7QUFDbkUsT0FBTyxlQUFlO0FBQ3RCLFNBQVMsZUFBZTtBQUV4QixTQUFTLGdCQUFnQixTQUFTO0FBQ2hDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULE1BQU0sY0FBYztBQUNsQixjQUFRLElBQUkseUNBQXlDO0FBQ3JELFlBQU0sU0FBUyxRQUFRLFVBQVUsQ0FBQyxHQUFHO0FBQ3JDLFlBQU0sU0FBUyxRQUFRLFVBQVUsUUFBUSxNQUFNO0FBRS9DLFVBQUk7QUFDSixVQUFJO0FBRUYsd0JBQWdCLE1BQU0sUUFBUTtBQUFBLFVBQzVCLE1BQU0sUUFBUSxHQUFHO0FBQUEsVUFDakIsU0FBUztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sTUFBTTtB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
