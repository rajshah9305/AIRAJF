import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cog6ToothIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
  onGenerate: (data: {
    prompt: string;
    model: string;
    apiKeys: Record<string, string>;
    temperature: number;
    maxTokens: number;
  }) => void;
  isGenerating: boolean;
  onOpenSettings: () => void;
  apiKeys: Record<string, string>;
  temperature: number;
  maxTokens: number;
}

const AI_MODELS = [
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google AI",
    icon: "✨",
    apiKeyField: "google"
  }
];

export function ControlPanel({ 
  onGenerate, 
  isGenerating, 
  onOpenSettings, 
  apiKeys, 
  temperature, 
  maxTokens 
}: ControlPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt first");
      return;
    }

    const model = AI_MODELS.find(m => m.id === selectedModel);
    if (!model || !apiKeys[model.apiKeyField]) {
      alert(`Please set the ${model?.provider || "API"} key in settings first`);
      return;
    }

    onGenerate({
      prompt,
      model: selectedModel,
      apiKeys,
      temperature,
      maxTokens
    });
  };

  return (
    <div className="w-[400px] bg-gray-950 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-black text-sm">
              R
            </div>
            <div>
              <h1 className="text-xl font-black">RAJ AI</h1>
              <p className="text-xs text-gray-400 font-medium">Code Generation Studio</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onOpenSettings}
            className="text-gray-400 hover:text-white"
          >
            <Cog6ToothIcon className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="text-center py-4">
          <h2 className="text-2xl font-black mb-2">Generate Code</h2>
          <p className="text-gray-400 text-sm">Create 5 unique variations instantly</p>
        </div>
      </div>
      
      {/* Model Selection */}
      <div className="p-6 border-b border-gray-800">
        <label className="block text-sm font-semibold text-gray-300 mb-4">AI Model</label>
        {AI_MODELS.map((model) => {
          const hasApiKey = !!apiKeys[model.apiKeyField];
          
          return (
            <Card
              key={model.id}
              className={cn(
                "model-card p-4 transition-all duration-200 group relative",
                "border-white bg-gray-800",
                !hasApiKey && "opacity-50"
              )}
            >
              <div className="flex items-center space-x-3">
                <div className="model-icon transition-transform duration-200">
                  <span className="text-2xl">{model.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{model.name}</h3>
                  <p className="text-xs text-gray-500">{model.provider}</p>
                </div>
              </div>
              
              {!hasApiKey && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 text-xs px-1 py-0.5 text-[10px]"
                >
                  No Key
                </Badge>
              )}
            </Card>
          );
        })}
      </div>
      
      {/* Prompt Input */}
      <div className="flex-1 p-6">
        <label className="block text-sm font-semibold text-gray-300 mb-4">Code Prompt</label>
        <div className="relative">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to build...

Example:
Create a modern landing page for a SaaS product with a hero section, features grid, and pricing table. Use gradients and modern design."
            className="code-editor h-64 bg-gray-900 border-gray-800 text-sm font-mono resize-none focus:border-white placeholder-gray-500"
          />
          <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono">
            {prompt.length} characters
          </div>
        </div>
        
        {/* Generate Button */}
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full mt-6 bg-white text-black py-3 font-bold text-sm hover:bg-gray-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin mr-2 w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
              Generating...
            </>
          ) : (
            <>
              <CodeBracketIcon className="w-4 h-4 mr-2" />
              Generate 5 Variations
            </>
          )}
        </Button>
        
        {/* Status */}
        {isGenerating && (
          <div className="mt-4 text-center text-xs text-gray-500 animate-fade-in">
            <div className="animate-spin inline-block mr-2 w-3 h-3 border border-gray-500 border-t-transparent rounded-full" />
            Generating variations...
          </div>
        )}
      </div>
    </div>
  );
}
