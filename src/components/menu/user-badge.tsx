import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import type { Session } from "next-auth";
import { Settings2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const UserBadge = ({
  avatar,
  session,
  isCollapsed,
  setIsCollapsed,
}: {
  avatar: string;
  session: Session;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}) => {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-10 p-2 bg-muted rounded-full border border-border cursor-pointer transition-all duration-300",
        isCollapsed && "p-0",
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar onClick={() => setIsCollapsed(!isCollapsed)}>
          <AvatarImage src={avatar} />
          <AvatarFallback>{session?.user?.address?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-sm">tap to edit</span>
            <span className="text-sm">
              {session?.user?.address?.slice(0, 16)}...
            </span>
          </div>
        )}
      </div>
      {!isCollapsed && (
        <Button
          size="icon"
          className={cn(
            "rounded-full flex size-10 bg-transparent border border-gray-700 hover:bg-gray-700 text-black hover:text-white transition-all duration-300",
          )}
        >
          <Settings2 />
        </Button>
      )}
    </div>
  );
};
