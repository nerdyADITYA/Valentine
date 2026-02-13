import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars, Gamepad2, Sparkles, Lock } from "lucide-react";

import { AudioPlayer } from "@/components/AudioPlayer";
import { ComplimentCard } from "@/components/ComplimentCard";
import { QueenGame } from "@/components/game/QueenGame";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

export default function Home() {
    const headlineRef = useRef(null);
    const [showGame, setShowGame] = useState(false);
    const [secretOpen, setSecretOpen] = useState(false);

    useEffect(() => {
        // Headline animation: Letter by letter
        if (headlineRef.current) {
            const textWrapper = headlineRef.current;
            // Wrap words in inline-block to prevent breaking
            const words = textWrapper.textContent.split(/\s+/);

            textWrapper.innerHTML = words.map(word => {
                const letters = word.split('').map(char =>
                    `<span class='letter inline-block'>${char}</span>`
                ).join('');
                return `<span class='inline-block whitespace-nowrap'>${letters}&nbsp;</span>`;
            }).join('');

            anime.timeline({ loop: false })
                .add({
                    targets: '.letter',
                    translateY: [100, 0],
                    translateZ: 0,
                    opacity: [0, 1],
                    easing: "easeOutExpo",
                    duration: 1400,
                    delay: (el, i) => 300 + 30 * i
                });
        }
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900">

            {/* Background Particles */}
            <FloatingHearts />

            <AudioPlayer />

            {/* Game Modal */}
            {showGame && <QueenGame onClose={() => setShowGame(false)} />}

            {/* Secret Message Dialog */}
            <Dialog open={secretOpen} onOpenChange={setSecretOpen}>
                <DialogContent className="sm:max-w-md bg-black/80 backdrop-blur-xl border-white/20 text-white shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-center font-serif text-3xl text-pink-300">
                            A Special Note 💌
                        </DialogTitle>
                        <DialogDescription className="text-center text-slate-300">
                            Just for you...
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-8 px-4 text-center space-y-4">
                        <p className="text-2xl font-serif leading-relaxed text-pink-100 drop-shadow-lg">
                            "Chahe tum relationship me ho ya single... <br />
                            <span className="text-pink-400 font-bold">Tum sab important ho.</span>"
                        </p>
                        <p className="text-sm text-slate-400 mt-4">
                            Remember this, always. 💖
                        </p>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center gap-16 md:gap-24">

                {/* HERO SECTION */}
                <header className="text-center max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-pink-600 text-sm font-semibold uppercase tracking-wider shadow-sm mb-4">
                        <Sparkles className="w-4 h-4" /> Valentine's Edition
                    </div>

                    <h1
                        ref={headlineRef}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-slate-900 dark:text-white leading-[1.1]"
                    >
                        Happy Valentine's Day, Queen
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto"
                    >
                        Strong. Independent. And still deserving of chocolate.
                    </motion.p>
                </header>

                {/* COMPLIMENT GENERATOR */}
                <section className="w-full">
                    <ComplimentCard />
                </section>

                {/* FEATURES GRID */}
                <section className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
                    {/* Game Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-card rounded-3xl p-8 flex flex-col items-center text-center space-y-4 border border-white/60"
                    >
                        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 mb-2">
                            <Gamepad2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-slate-800 dark:text-white">
                            Queen Energy Collector
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300">
                            Collect crowns & self-love. Dodge the red flags. Can you score 50?
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="mt-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl py-6 px-8 text-lg shadow-lg hover:shadow-pink-500/25 transition-all"
                        >
                            Play Game 🎮
                        </Button>
                    </motion.div>

                    {/* Secret Reveal Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-card rounded-3xl p-8 flex flex-col items-center text-center space-y-4 border border-white/60 bg-gradient-to-br from-indigo-50/50 to-purple-50/50"
                    >
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 mb-2">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-slate-800 dark:text-white">
                            Secret Message
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300">
                            A hidden reminder just for you. Unlock it when you need a boost.
                        </p>
                        <Button
                            onClick={() => setSecretOpen(true)}
                            variant="outline"
                            className="mt-4 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-xl py-6 px-8 text-lg"
                        >
                            Reveal Secret 🔓
                        </Button>
                    </motion.div>
                </section>

                {/* FOOTER */}
                <footer className="text-center pb-8 opacity-60">
                    <p className="font-cursive text-2xl text-pink-400">
                        Made with love (and code) 💖
                    </p>
                </footer>

            </div>
        </div>
    );
}
