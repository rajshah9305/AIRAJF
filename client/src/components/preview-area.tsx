import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheckIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface PreviewAreaProps {
  variations: string[];
  isGenerating: boolean;
  generationStatus: boolean[];
}

export function PreviewArea({ variations, isGenerating, generationStatus }: PreviewAreaProps) {
  const [currentTab, setCurrentTab] = useState(0);

  // Reset to first tab when new generation starts
  useEffect(() => {
    if (isGenerating) {
      setCurrentTab(0);
    }
  }, [isGenerating]);

  const hasAnyContent = variations.some(v => v.length > 0);

  return (
    <div className="flex-1 flex flex-col bg-gray-950">
      {/* Preview Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Live Preview</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <ShieldCheckIcon className="w-4 h-4" />
              <span>Sandboxed</span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex mt-4 relative">
          <div 
            className="tab-indicator absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300"
            style={{ 
              width: "20%", 
              transform: `translateX(${currentTab * 100}%)` 
            }}
          />
          {Array.from({ length: 5 }, (_, index) => (
            <button
              key={index}
              className={cn(
                "flex-1 py-2 text-sm font-medium transition-colors relative",
                currentTab === index ? "text-white" : "text-gray-400 hover:text-white"
              )}
              onClick={() => setCurrentTab(index)}
            >
              Variation {index + 1}
              {/* Status indicator */}
              <div 
                className={cn(
                  "absolute top-1 right-2 w-2 h-2 bg-green-500 rounded-full transition-all duration-200",
                  generationStatus[index] 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-0"
                )}
              />
            </button>
          ))}
        </div>
      </div>
      
      {/* Preview Content */}
      <div className="flex-1 relative bg-white">
        {/* Variation iframes */}
        {Array.from({ length: 5 }, (_, index) => (
          <iframe
            key={index}
            className={cn(
              "preview-frame absolute inset-0 w-full h-full border-0",
              currentTab === index ? "block" : "hidden"
            )}
            sandbox="allow-scripts allow-same-origin allow-forms"
            srcDoc={variations[index] || ""}
            title={`Variation ${index + 1}`}
          />
        ))}
        
        {/* Empty State */}
        {!hasAnyContent && !isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-950">
            <div className="text-center">
              <div className="text-6xl mb-4 opacity-20">🔧</div>
              <h3 className="text-xl font-semibold mb-2">No Code Generated Yet</h3>
              <p className="text-sm">Enter a prompt and click "Generate 5 Variations" to see live previews</p>
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {isGenerating && !hasAnyContent && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-950">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-gray-600 border-t-white rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Generating Code Variations</h3>
              <p className="text-sm">Creating 5 unique implementations...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
