import { z } from "zod";

export const insertScoreSchema = z.object({
    playerName: z.string().min(1, "Name is required"),
    score: z.number().int(),
});
