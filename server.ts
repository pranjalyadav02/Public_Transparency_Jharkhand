import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { transparencyStorage } from "./src/db/storage";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3005;

  app.use(cors());
  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", portal: "Public_Transparency_Jharkhand", port: PORT, timestamp: new Date() });
  });

  // Overview KPIs
  app.get("/api/v1/transparency/overview", (req, res) => {
    try {
      res.json({ success: true, data: transparencyStorage.getOverview() });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // Challenges List with search & filters
  app.get("/api/v1/transparency/challenges", (req, res) => {
    try {
      const { district, category, query, status } = req.query as Record<string, string>;
      const challenges = transparencyStorage.getChallenges({ district, category, query, status });
      res.json({ success: true, data: challenges, meta: { total: challenges.length } });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // Challenge Detail
  app.get("/api/v1/transparency/challenges/:id", (req, res) => {
    try {
      const challenge = transparencyStorage.getChallengeById(req.params.id);
      if (!challenge) return res.status(404).json({ success: false, error: "Challenge not found" });
      res.json({ success: true, data: challenge });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // Challenge Lineage
  app.get("/api/v1/transparency/challenges/:id/lineage", (req, res) => {
    try {
      const lineage = transparencyStorage.getLineage(req.params.id);
      res.json({ success: true, data: lineage });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // Districts Data
  app.get("/api/v1/transparency/districts", (req, res) => {
    try {
      res.json({ success: true, data: transparencyStorage.getDistricts() });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // Solutions Data
  app.get("/api/v1/transparency/solutions", (req, res) => {
    try {
      res.json({ success: true, data: transparencyStorage.getSolutions() });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // Accountability & Scorecards
  app.get("/api/v1/transparency/accountability", (req, res) => {
    try {
      res.json({ success: true, data: transparencyStorage.getAccountabilityData() });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // Open Data Export
  app.get("/api/v1/transparency/opendata", (req, res) => {
    try {
      const format = req.query.format || 'json';
      const challenges = transparencyStorage.getChallenges();
      if (format === 'csv') {
        const headers = 'id,title,category,district,status,beneficiaries\n';
        const rows = challenges.map(c => `"${c.id}","${c.title}","${c.category}","${c.district || c.location?.district || ''}","${c.status}","${c.beneficiariesCount || 0}"`).join('\n');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="jharkhand_transparency_data.csv"');
        return res.send(headers + rows);
      }
      res.json({ success: true, data: challenges, exportedAt: new Date().toISOString() });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // Public Topic Subscription
  app.post("/api/v1/transparency/subscribe", (req, res) => {
    try {
      const { topic, contact, method } = req.body;
      if (!contact) return res.status(400).json({ success: false, error: "Contact information required" });
      const entry = transparencyStorage.addSubscription({ topic: topic || 'All Updates', contact, method: method || 'Email' });
      res.status(201).json({ success: true, data: entry });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // Serve maps static assets
  app.use('/maps', express.static(path.join(process.cwd(), 'public', 'maps')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: { port: PORT + 100 } },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Public_Transparency_Jharkhand] Server running on http://localhost:${PORT}`);
  });
}

startServer();
