import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingHearts() {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        // Generate random hearts
        const newHearts = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // Random horizontal start position
            delay: Math.random() * 5, // Random delay
            duration: Math.random() * 10 + 10, // Slow float duration (10-20s)
            size: Math.random() * 20 + 10, // Size between 10px and 30px
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: "100vh", opacity: 0 }}
                    animate={{
                        y: "-20vh",
                        opacity: [0, 1, 0], // Fully visible then fade out
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "linear",
                    }}
                    className="absolute text-pink-400/60 dark:text-pink-600/40"
                    style={{
                        left: `${heart.x}vw`,
                        willChange: "transform"
                    }}
                >
                    <Heart
                        fill="currentColor"
                        size={heart.size}
                    />
                </motion.div>
            ))}
        </div>
    );
}
