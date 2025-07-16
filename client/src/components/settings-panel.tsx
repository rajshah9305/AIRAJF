import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  apiKeys: Record<string, string>;
  onApiKeysChange: (keys: Record<string, string>) => void;
  temperature: number;
  onTemperatureChange: (value: number) => void;
  maxTokens: number;
  onMaxTokensChange: (value: number) => void;
}

const API_KEY_FIELDS = [
  {
    key: "openai",
    label: "OpenAI API Key",
    placeholder: "sk-...",
    description: "For GPT-4o model"
  },
  {
    key: "anthropic",
    label: "Anthropic API Key",
    placeholder: "sk-ant-...",
    description: "For Claude-4 model"
  },
  {
    key: "google",
    label: "Google AI API Key",
    placeholder: "AIza...",
    description: "For Gemini model"
  },
  {
    key: "mistral",
    label: "Mistral API Key",
    placeholder: "...",
    description: "For Mistral model"
  }
];

export function SettingsPanel({
  isOpen,
  onClose,
  apiKeys,
  onApiKeysChange,
  temperature,
  onTemperatureChange,
  maxTokens,
  onMaxTokensChange
}: SettingsPanelProps) {
  const [localApiKeys, setLocalApiKeys] = useState(apiKeys);

  const handleSaveApiKeys = () => {
    onApiKeysChange(localApiKeys);
    onClose();
  };

  const handleApiKeyChange = (key: string, value: string) => {
    setLocalApiKeys(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "backdrop fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />
      
      {/* Settings Panel */}
      <div 
        className={cn(
          "settings-panel fixed left-0 top-0 h-full w-80 bg-gray-900 border-r border-gray-800 z-50 p-6 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold">Settings</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <XMarkIcon className="w-5 h-5" />
          </Button>
        </div>
        
        {/* API Keys Section */}
        <div className="space-y-6">
          {API_KEY_FIELDS.map((field) => (
            <div key={field.key}>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">
                {field.label}
              </Label>
              <Input
                type="password"
                placeholder={field.placeholder}
                value={localApiKeys[field.key] || ""}
                onChange={(e) => handleApiKeyChange(field.key, e.target.value)}
                className="bg-gray-800 border-gray-700 text-sm focus:border-white"
              />
              <p className="text-xs text-gray-500 mt-1">{field.description}</p>
            </div>
          ))}
          
          <Button 
            onClick={handleSaveApiKeys}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            Save API Keys
          </Button>
        </div>
        
        {/* Generation Settings */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h4 className="text-lg font-semibold mb-4">Generation Settings</h4>
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-4 block">
                Temperature: {temperature}
              </Label>
              <Slider
                value={[temperature]}
                onValueChange={(value) => onTemperatureChange(value[0])}
                max={2}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 (Focused)</span>
                <span>2 (Creative)</span>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">
                Max Tokens
              </Label>
              <Input
                type="number"
                value={maxTokens}
                onChange={(e) => onMaxTokensChange(parseInt(e.target.value) || 2000)}
                min={100}
                max={4000}
                className="bg-gray-800 border-gray-700 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Maximum length of generated code</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
