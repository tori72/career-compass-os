import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComingSoonCardProps {
  title: string;
  description: string;
  requiredData?: string;
  className?: string;
}

export function ComingSoonCard({
  title,
  description,
  requiredData,
  className,
}: ComingSoonCardProps) {
  return (
    <div
      className={cn(
        "border border-dashed border-border rounded-lg p-6 bg-muted/30",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-md bg-muted">
          <Lock className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-foreground">{title}</h4>
            <span className="coming-soon-badge">Coming Soon</span>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          {requiredData && (
            <p className="text-xs text-muted-foreground italic">
              Requires: {requiredData}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
