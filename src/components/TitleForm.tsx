import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";

interface TitleFormProps {
  onSubmit: (title: string) => void;
  isLoading: boolean;
}

export function TitleForm({ onSubmit, isLoading }: TitleFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
    }
  };

  const charCount = title.length;
  const wordCount = title.trim() ? title.trim().split(/\s+/).length : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          हिंदी न्यूज़ टाइटल डालें
        </label>
        <Textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="यहाँ अपना न्यूज़ टाइटल लिखें..."
          className="min-h-[120px] font-hindi text-lg resize-none transition-all duration-200 focus:shadow-glow"
          disabled={isLoading}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{charCount} characters</span>
          <span>{wordCount} words</span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!title.trim() || isLoading}
        className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-soft hover:shadow-glow"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            SEO टाइटल बनाएं
          </>
        )}
      </Button>
    </form>
  );
}
