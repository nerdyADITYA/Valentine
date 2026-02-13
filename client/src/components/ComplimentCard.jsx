import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RefreshCw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const COMPLIMENTS = [
    "You have the kind of strength that inspires everyone around you.",
    "Your smile literally lights up the room (and my world).",
    "You're not just beautiful on the outside, your soul is gorgeous.",
    "The way you handle challenges with grace is incredible.",
    "You make ordinary moments feel like magic.",
    "Your intelligence and wit are unmatched.",
    "You deserve all the love and happiness in the universe.",
    "Being around you is the best part of any day.",
    "You are capable of achieving absolutely anything you set your mind to.",
    "Your kindness makes the world a better place.",
];

export function ComplimentCard() {
    const [index, setIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % COMPLIMENTS.length);
        setCopied(false);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(COMPLIMENTS[index]);
        setCopied(true);
        toast({
            description: "Compliment copied to clipboard! 💖",
            duration: 2000,
        });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="glass-card w-full max-w-2xl mx-auto overflow-hidden border-2 border-pink-100/50">
            <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center animate-pulse-slow">
                    <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                </div>

                <div className="min-h-[120px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-2xl md:text-4xl font-serif font-medium text-slate-800 dark:text-slate-100 leading-tight"
                        >
                            "{COMPLIMENTS[index]}"
                        </motion.p>
                    </AnimatePresence>
                </div>

                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleCopy}
                        className="rounded-full border-pink-200 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                        {copied ? (
                            <Check className="w-5 h-5 mr-2" />
                        ) : (
                            <Copy className="w-5 h-5 mr-2" />
                        )}
                        {copied ? "Copied" : "Copy This"}
                    </Button>

                    <Button
                        size="lg"
                        onClick={handleNext}
                        className="rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-200 transition-all hover:scale-105 active:scale-95"
                    >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        New Compliment
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
