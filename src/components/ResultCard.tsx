import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Copy, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ResultCardProps {
  title: string;
  original: string;
}

export function ResultCard({ title, original }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const charCount = title.length;
  const isIdealLength = charCount >= 50 && charCount <= 60;
  const isShort = charCount < 50;
  const isLong = charCount > 60;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(title);
    setCopied(true);
    toast.success("Title copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getLengthStatus = () => {
    if (isIdealLength) {
      return {
        icon: CheckCircle2,
        text: "Perfect length for SEO!",
        className: "text-green-600 dark:text-green-400",
      };
    }
    if (isShort) {
      return {
        icon: AlertCircle,
        text: `${50 - charCount} more characters recommended`,
        className: "text-amber-600 dark:text-amber-400",
      };
    }
    return {
      icon: AlertCircle,
      text: `${charCount - 60} characters over ideal length`,
      className: "text-amber-600 dark:text-amber-400",
    };
  };

  const status = getLengthStatus();
  const StatusIcon = status.icon;

  return (
    <Card className="animate-slide-up overflow-hidden shadow-soft">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Original Title
            </span>
          </div>
          <p className="font-hindi text-muted-foreground line-through decoration-muted-foreground/30">
            {original}
          </p>
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              SEO Optimized Title
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-2 hover:bg-accent"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="font-hindi text-xl font-medium text-foreground leading-relaxed">
            {title}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <StatusIcon className={`h-4 w-4 ${status.className}`} />
            <span className={`text-sm ${status.className}`}>{status.text}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className={isIdealLength ? "text-green-600 dark:text-green-400 font-medium" : ""}>
              {charCount} chars
            </span>
          </div>
        </div>

        <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
              isIdealLength
                ? "bg-green-500"
                : isShort
                ? "bg-amber-500"
                : "bg-amber-500"
            }`}
            style={{ width: `${Math.min((charCount / 70) * 100, 100)}%` }}
          />
          <div className="absolute left-[71.4%] top-0 w-0.5 h-full bg-green-600 opacity-50" />
          <div className="absolute left-[85.7%] top-0 w-0.5 h-full bg-amber-600 opacity-50" />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span className="text-green-600">50-60 ideal</span>
          <span>70+</span>
        </div>
      </CardContent>
    </Card>
  );
}
