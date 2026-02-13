import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCreateScore } from "@/hooks/use-scores";
import { Trophy, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QueenGame({ onClose }) {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [objects, setObjects] = useState([]);
    const requestRef = useRef();
    const scoreRef = useRef(0); // For immediate access in loop
    const objectsRef = useRef([]);
    const canvasRef = useRef(null);

    const [basketX, setBasketX] = useState(50);
    const basketXRef = useRef(50);
    const gameAreaRef = useRef(null);

    // Timer State
    const [timeLeft, setTimeLeft] = useState(60);
    const timeLeftRef = useRef(60);

    const createScore = useCreateScore();

    const SPAWN_RATE = 800;
    const WIN_SCORE = 100;
    const BASKET_WIDTH = 15; // Width in percentage
    const BASKET_HIT_Y = 85; // Y position where catch happens

    useEffect(() => {
        // Game Loop
        let lastTime = 0;
        let spawnTimer = 0;
        let lastSecond = 0; // consistent timer decrement

        const spawnObject = () => {
            const types = ['heart', 'crown', 'choco', 'redflag'];
            const type = types[Math.floor(Math.random() * types.length)];

            let config = { emoji: '💖', value: 5, speed: 0.5 };
            if (type === 'crown') config = { emoji: '👑', value: 10, speed: 0.5 };
            if (type === 'choco') config = { emoji: '🍫', value: 3, speed: 0.5 };
            if (type === 'redflag') config = { emoji: '🚩', value: -10, speed: 0.5 };

            const newObj = {
                id: Date.now() + Math.random(),
                x: Math.random() * 90 + 5, // Keep within screen bounds
                y: -10,
                type,
                ...config
            };

            objectsRef.current.push(newObj);
        };

        const loop = (time) => {
            if (gameOver || gameWon) return;

            const delta = time - lastTime;
            lastTime = time;
            spawnTimer += delta;

            // Timer Logic
            if (time - lastSecond > 1000) {
                timeLeftRef.current -= 1;
                setTimeLeft(timeLeftRef.current);
                lastSecond = time;

                if (timeLeftRef.current <= 0) {
                    setGameOver(true);
                    return; // Stop the loop
                }
            }

            if (spawnTimer > SPAWN_RATE) {
                spawnObject();
                spawnTimer = 0;
            }

            // Update positions and check collisions
            objectsRef.current = objectsRef.current.filter(obj => {
                // Move object
                obj.y += obj.speed * (delta / 16);

                // Check collision with basket
                const inBasketY = obj.y >= BASKET_HIT_Y && obj.y <= BASKET_HIT_Y + 10;
                // Check if object x is within basket width (centered at basketX)
                // basketX is center, so range is [basketX - width/2, basketX + width/2]
                const basketLeft = basketXRef.current - BASKET_WIDTH / 2;
                const basketRight = basketXRef.current + BASKET_WIDTH / 2;
                const inBasketX = obj.x >= basketLeft && obj.x <= basketRight;

                if (inBasketY && inBasketX) {
                    handleCollect(obj.value);
                    return false; // Remove object
                }

                return obj.y < 110; // Keep if still on screen
            });

            setObjects([...objectsRef.current]);
            requestRef.current = requestAnimationFrame(loop);
        };

        requestRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(requestRef.current);
    }, [gameOver, gameWon]);

    const handleCollect = (value) => {
        if (gameOver || gameWon) return;

        const newScore = scoreRef.current + value;
        setScore(newScore);
        scoreRef.current = newScore;

        if (newScore >= WIN_SCORE) {
            setGameWon(true);
            createScore.mutate({ playerName: "Queen", score: newScore });
        } else if (newScore < 0) {
            // Keep playing even if score goes negative, only lose on time or if logic changes
            // But let's keep the user request logic: "if win score not reached within 1 minute then game lost or else win"
            // We already check timeLeft in loop.
        }
    };

    const handleMouseMove = (e) => {
        if (gameAreaRef.current && !gameOver && !gameWon) {
            const rect = gameAreaRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            const clamped = Math.min(Math.max(percentage, BASKET_WIDTH / 2), 100 - BASKET_WIDTH / 2);
            setBasketX(clamped);
            basketXRef.current = clamped;
        }
    };

    const handleTouchMove = (e) => {
        if (gameAreaRef.current && e.touches[0] && !gameOver && !gameWon) {
            const rect = gameAreaRef.current.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            const clamped = Math.min(Math.max(percentage, BASKET_WIDTH / 2), 100 - BASKET_WIDTH / 2);
            setBasketX(clamped);
            basketXRef.current = clamped;
        }
    };

    const resetGame = () => {
        setScore(0);
        scoreRef.current = 0;
        setTimeLeft(60);
        timeLeftRef.current = 60;
        setGameOver(false);
        setGameWon(false);
        objectsRef.current = [];
        setObjects([]);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-2xl h-[80vh] bg-gradient-to-b from-pink-50 to-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white">

                {/* Header */}
                <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 bg-white/50 backdrop-blur-sm pointer-events-none">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Trophy className="text-yellow-500 w-6 h-6" />
                            <span className="font-bold text-xl text-pink-600">{score} / {WIN_SCORE}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xl">⏳</span>
                            <span className={`font-bold text-xl ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-slate-600'}`}>
                                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors pointer-events-auto">
                        <X className="w-6 h-6 text-slate-500" />
                    </button>
                </div>

                {/* Points Legend */}
                <div className="absolute top-16 left-4 z-10 bg-white/70 backdrop-blur-sm rounded-lg p-2 text-sm shadow-sm pointer-events-none">
                    <div className="font-semibold text-slate-700 mb-1">Points</div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                        <div className="flex items-center gap-1"><span>👑</span><span>+10</span></div>
                        <div className="flex items-center gap-1"><span>💖</span><span>+5</span></div>
                        <div className="flex items-center gap-1"><span>🍫</span><span>+3</span></div>
                        <div className="flex items-center gap-1"><span>🚩</span><span>-10</span></div>
                    </div>
                </div>

                {/* Game Area */}
                <div
                    ref={gameAreaRef}
                    className="w-full h-full relative cursor-none touch-none"
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                >
                    {objects.map(obj => (
                        <div
                            key={obj.id}
                            style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
                            className="absolute text-4xl select-none transform -translate-x-1/2"
                        >
                            {obj.emoji}
                        </div>
                    ))}

                    {/* Basket */}
                    <div
                        className="absolute bottom-[10%] text-6xl transform -translate-x-1/2 transition-transform duration-75"
                        style={{ left: `${basketX}%` }}
                    >
                        🧺
                    </div>
                </div>

                {/* Game Over / Win Screens */}
                {(gameOver || gameWon) && (
                    <div className="absolute inset-0 z-20 bg-white/90 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
                        <h2 className={`text-4xl font-bold font-serif mb-4 ${gameWon ? 'text-green-600' : 'text-red-500'}`}>
                            {gameWon ? "SLAY QUEEN! 👑" : "Time's Up! ⏰"}
                        </h2>
                        <p className="text-xl text-slate-600 mb-8 max-w-md">
                            {gameWon
                                ? "You realized you don't need a Valentine. Valentine needs YOU."
                                : `You scored ${score}. Don't settle for less next time!`}
                        </p>

                        <div className="flex gap-4">
                            <Button onClick={resetGame} size="lg" className="bg-pink-500 hover:bg-pink-600">
                                <RotateCcw className="w-4 h-4 mr-2" /> Play Again
                            </Button>
                            <Button variant="outline" size="lg" onClick={onClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
