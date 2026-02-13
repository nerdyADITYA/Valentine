export class MemStorage {
    constructor() {
        this.scores = [];
        this.currentId = 1;
    }

    async getScores() {
        return this.scores.sort((a, b) => b.score - a.score).slice(0, 10);
    }

    async createScore(insertScore) {
        const id = this.currentId++;
        const score = { ...insertScore, id, createdAt: new Date() };
        this.scores.push(score);
        return score;
    }
}

export const storage = new MemStorage();
