import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ControlPanel } from "@/components/control-panel";
import { PreviewArea } from "@/components/preview-area";
import { SettingsPanel } from "@/components/settings-panel";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { GenerateCodeRequest, GenerateCodeResponse } from "@shared/schema";

export default function Home() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    openai: import.meta.env.VITE_OPENAI_API_KEY || "",
    anthropic: import.meta.env.VITE_ANTHROPIC_API_KEY || "",
    google: import.meta.env.VITE_GOOGLE_API_KEY || "",
    mistral: import.meta.env.VITE_MISTRAL_API_KEY || "",
  });
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [variations, setVariations] = useState<string[]>(Array(5).fill(""));
  const [generationStatus, setGenerationStatus] = useState<boolean[]>(Array(5).fill(false));
  
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (data: GenerateCodeRequest): Promise<GenerateCodeResponse> => {
      const response = await apiRequest("POST", "/api/generate", data);
      return response.json();
    },
    onMutate: () => {
      // Reset state when starting generation
      setVariations(Array(5).fill(""));
      setGenerationStatus(Array(5).fill(false));
    },
    onSuccess: (data) => {
      setVariations(data.variations);
      setGenerationStatus(Array(5).fill(true));
      toast({
        title: "Code Generated Successfully",
        description: "5 unique variations have been created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate code variations.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = (data: {
    prompt: string;
    model: string;
    apiKeys: Record<string, string>;
    temperature: number;
    maxTokens: number;
  }) => {
    generateMutation.mutate({
      prompt: data.prompt,
      model: data.model as any,
      apiKeys: data.apiKeys,
      temperature: data.temperature,
      maxTokens: data.maxTokens,
    });
  };

  return (
    <div className="h-screen flex bg-black text-white overflow-hidden">
      <ControlPanel
        onGenerate={handleGenerate}
        isGenerating={generateMutation.isPending}
        onOpenSettings={() => setSettingsOpen(true)}
        apiKeys={apiKeys}
        temperature={temperature}
        maxTokens={maxTokens}
      />
      
      <PreviewArea
        variations={variations}
        isGenerating={generateMutation.isPending}
        generationStatus={generationStatus}
      />
      
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        apiKeys={apiKeys}
        onApiKeysChange={setApiKeys}
        temperature={temperature}
        onTemperatureChange={setTemperature}
        maxTokens={maxTokens}
        onMaxTokensChange={setMaxTokens}
      />
    </div>
  );
}
