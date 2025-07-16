import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { generateCodeSchema } from "@shared/schema";
import { createProvider } from "./services/ai-providers";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate code variations endpoint
  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt, model, apiKeys, temperature, maxTokens } = generateCodeSchema.parse(req.body);
      
      // Create AI provider
      const provider = createProvider(model, apiKeys);
      
      // Generate 5 variations in parallel
      const variationPromises = Array.from({ length: 5 }, (_, index) => {
        const enhancedPrompt = `${prompt}\n\nPlease create variation ${index + 1} with a unique design approach while maintaining the core functionality.`;
        return provider.generateCode(enhancedPrompt, temperature, maxTokens);
      });
      
      const variations = await Promise.all(variationPromises);
      
      // Generate a simple ID for this generation
      const generationId = Date.now().toString();
      
      res.json({
        variations,
        generationId,
      });
    } catch (error) {
      console.error("Code generation error:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Code generation failed" 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
