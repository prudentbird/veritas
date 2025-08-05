"use client";

import { Notif } from "./notif";
import { useState } from "react";
import { Button } from "../ui/button";
import type { Session } from "next-auth";
import { UserBadge } from "./user-badge";
import { signOut } from "next-auth/react";
import { useDisconnect } from "@reown/appkit/react";
import { ChevronLeft, ChevronRight, LockOpen, Loader2 } from "lucide-react";

export const MenuClient = ({
  avatar,
  session,
}: {
  avatar: string;
  session: Session;
}) => {
  const { disconnect } = useDisconnect();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await disconnect();
      await signOut({
        redirect: true,
        redirectTo: "/",
      });
    } catch (error) {
      console.error("Error during signout:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="absolute bottom-5 left-5 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          className="rounded-full flex items-center justify-center size-10 bg-transparent border border-gray-700 hover:bg-gray-700 text-black hover:text-white transition-all duration-300"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
        {!isCollapsed && (
          <Button
            size="icon"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="rounded-full flex items-center justify-center size-10 bg-transparent border border-gray-700 hover:bg-gray-700 text-black hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSigningOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LockOpen />
            )}
          </Button>
        )}
      </div>
      <Notif isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <UserBadge
        avatar={avatar}
        session={session}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
    </div>
  );
};
