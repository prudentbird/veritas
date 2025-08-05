"use client";

import { Button } from "../ui/button";
import { useAppKit, useAppKitState } from "@reown/appkit/react";

export const Auth = () => {
  const { open } = useAppKit();
  const { loading } = useAppKitState();

  return (
    <Button
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
      onClick={() => open()}
    >
      {loading ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};
