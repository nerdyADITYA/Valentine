import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useScores() {
    return useQuery({
        queryKey: ["/api/scores"],
    });
}

export function useCreateScore() {
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (score) => {
            return await apiRequest("POST", "/api/scores", score);
        },
        onSuccess: (data) => {
            // Invalidate queries to refresh the list if needed
            queryClient.invalidateQueries({ queryKey: ["/api/scores"] });

            toast({
                title: "Score Submitted!",
                description: `You scored ${data.score} points. Queen status: CONFIRMED. 👑`,
                variant: "default",
            });
        },
        onError: (error) => {
            toast({
                title: "Error submitting score",
                description: error.message,
                variant: "destructive",
            });
        }
    });
}
