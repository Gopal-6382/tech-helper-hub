import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/frontend/components/ui/avatar";

type UserAvatarProps = {
  name?: string | null;
  src?: string | null;
  size?: "sm" | "default" | "lg";
  className?: string;
};

function getInitials(name?: string | null) {
  if (!name?.trim()) {
    return "U";
  }

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 1).toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export function UserAvatar({
  name,
  src,
  size = "default",
  className,
}: UserAvatarProps) {
  return (
    <Avatar size={size} className={className}>
      {src ? <AvatarImage src={src} alt={name ?? "User"} /> : null}

      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
