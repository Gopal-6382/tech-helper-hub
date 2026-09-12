import { LucideIcon } from "lucide-react";

export function Icon({ icon: IconComp, className }: { icon: LucideIcon; className?: string }) {
  return <IconComp className={className ?? "h-5 w-5"} strokeWidth={1.75} />;
}