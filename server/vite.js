import { createServer as createViteServer, createLogger } from "vite";
import viteConfig from "../vite.config.js"; // Note: this will need vite.config.js to exist
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

export async function setupVite(server, app) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const serverOptions = {
        middlewareMode: true,
        hmr: { server, path: "/vite-hmr" },
        allowedHosts: true,
    };

    const vite = await createViteServer({
        ...viteConfig,
        configFile: false,
        customLogger: {
            ...viteLogger,
            error: (msg, options) => {
                viteLogger.error(msg, options);
                process.exit(1);
            },
        },
        server: serverOptions,
        appType: "custom",
    });

    app.use(vite.middlewares);

    app.use(async (req, res, next) => {
        const url = req.originalUrl;

        try {
            const clientTemplate = path.resolve(
                __dirname,
                "..",
                "client",
                "index.html",
            );

            // always reload the index.html file from disk incase it changes
            let template = await fs.promises.readFile(clientTemplate, "utf-8");
            // Replace main.tsx with main.jsx
            template = template.replace(
                `src="/src/main.tsx"`,
                `src="/src/main.jsx?v=${nanoid()}"`,
            );
            const page = await vite.transformIndexHtml(url, template);
            res.status(200).set({ "Content-Type": "text/html" }).end(page);
        } catch (e) {
            vite.ssrFixStacktrace(e);
            next(e);
        }
    });
}
