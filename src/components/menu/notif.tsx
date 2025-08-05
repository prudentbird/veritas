import { cn } from "~/lib/utils";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export const Notif = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-10 p-2 bg-muted rounded-full border border-border cursor-pointer transition-all duration-300",
        isCollapsed && "p-0",
      )}
    >
      <div className="flex items-center gap-3">
        <Button
          className="rounded-full flex size-10 bg-transparent border border-gray-700 hover:bg-gray-700 text-black hover:text-white transition-all duration-300"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Bell />
        </Button>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-sm">Notifications</span>
          </div>
        )}
      </div>
    </div>
  );
};
