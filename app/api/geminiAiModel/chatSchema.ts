import { z } from "zod";

export const chatResponseSchema = z.object({
  text: z.string().describe("The AI response text to display to the user"),
  ui: z
    .enum(["none", "budget", "groupSize", "tripDuration", "final"])
    .describe(
      "The UI component to display: none for no UI, budget for budget selection, groupSize for group size selection, tripDuration for duration selection, final for final trip generation",
    ),
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;
