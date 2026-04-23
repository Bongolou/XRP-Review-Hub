import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { injectSocialMeta } from "./socialMeta";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist — but inject
  // per-route og:image / twitter:image so social-media crawlers (which
  // do not execute JS) see the correct preview image.
  const indexPath = path.resolve(distPath, "index.html");
  app.use("/{*path}", (req, res) => {
    try {
      const template = fs.readFileSync(indexPath, "utf-8");
      const host = req.get("host") ?? "";
      const protocol = (req.headers["x-forwarded-proto"] as string)?.split(",")[0] || req.protocol;
      const page = injectSocialMeta(template, req.originalUrl, host, protocol);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch {
      res.sendFile(indexPath);
    }
  });
}
