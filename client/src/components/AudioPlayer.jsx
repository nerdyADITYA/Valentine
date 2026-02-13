import { useState, useRef, useEffect } from "react";
import { Play, Pause, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Attempt auto-play when component mounts
        const playAudio = async () => {
            if (audioRef.current) {
                audioRef.current.volume = 0.5;
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Auto-play prevented:", err);
                    setIsPlaying(false);
                }
            }
        };

        playAudio();
    }, []);

    const togglePlay = async () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.error("Playback failed:", err);
                }
            }
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            <audio
                ref={audioRef}
                loop
                src="/music.mp3"
                onError={(e) => console.error("Audio error:", e)}
            />
            <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm border-pink-200 hover:bg-pink-50 shadow-lg"
                onClick={togglePlay}
            >
                {isPlaying ? (
                    <Pause className="h-5 w-5 text-pink-500" />
                ) : (
                    <Play className="h-5 w-5 text-pink-500" />
                )}
            </Button>
        </div>
    );
}
