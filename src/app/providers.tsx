"use client";

import { env } from "~/env";
import { ReactNode } from "react";
import { AppKit } from "./(auth)/appkit";
import { Menu } from "~/components/menu";
import { SessionProvider } from "next-auth/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const Providers = ({ children }: { children: ReactNode }) => {
  const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

  return (
    <SessionProvider>
      <ConvexProvider client={convex}>
        <AppKit>{children}</AppKit>
        <Menu />
      </ConvexProvider>
    </SessionProvider>
  );
};

export default Providers;
