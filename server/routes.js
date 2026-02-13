import { createServer } from "http";
import { storage } from "./storage.js";
import { api } from "../shared/routes.js";
import { z } from "zod";

export async function registerRoutes(httpServer, app) {
    app.get(api.scores.list.path, async (req, res) => {
        const scores = await storage.getScores();
        res.json(scores);
    });

    app.post(api.scores.create.path, async (req, res) => {
        try {
            const input = api.scores.create.input.parse(req.body);
            const score = await storage.createScore(input);
            res.status(201).json(score);
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({ message: err.errors[0].message });
            }
            throw err;
        }
    });

    return httpServer;
}
