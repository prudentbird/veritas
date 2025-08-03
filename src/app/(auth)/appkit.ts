"use client";

import { env } from "~/env";
import { ReactNode } from "react";
import { siweConfig } from "./config";
import { createAppKit } from "@reown/appkit/react";
import { monadTestnet } from "@reown/appkit/networks";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";

const metadata = {
  name: "Veritas",
  description: "Veritas",
  url: "http://localhost:3000",
  icons: ["http://localhost:3000/favicon.ico"],
};

createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata,
  networks: [monadTestnet],
  projectId: env.NEXT_PUBLIC_PROJECT_ID,
  features: {
    email: false,
    socials: false,
    analytics: false,
  },
  siweConfig: siweConfig,
});
export function AppKit({ children }: { children: ReactNode }) {
  return children;
}
