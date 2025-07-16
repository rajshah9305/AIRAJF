import { pgTable, text, serial, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const codeGenerations = pgTable("code_generations", {
  id: serial("id").primaryKey(),
  prompt: text("prompt").notNull(),
  model: text("model").notNull(),
  variations: json("variations").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCodeGenerationSchema = createInsertSchema(codeGenerations).pick({
  prompt: true,
  model: true,
  variations: true,
});

export type InsertCodeGeneration = z.infer<typeof insertCodeGenerationSchema>;
export type CodeGeneration = typeof codeGenerations.$inferSelect;

// API Types
export const generateCodeSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  model: z.enum(["gpt-4o", "claude-sonnet-4", "gemini-2.5-flash", "mistral-large"]),
  apiKeys: z.object({
    openai: z.string().optional(),
    anthropic: z.string().optional(),
    google: z.string().optional(),
    mistral: z.string().optional(),
  }),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().min(100).max(4000).default(2000),
});

export type GenerateCodeRequest = z.infer<typeof generateCodeSchema>;

export interface GenerateCodeResponse {
  variations: string[];
  generationId: string;
}
