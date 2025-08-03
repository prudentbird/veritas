"use client";

import { Button } from "~/components/ui/button";
import { useDisconnect } from "@reown/appkit/react";

export default function Logout() {
  const { disconnect } = useDisconnect();
 
  return <Button variant="outline" onClick={() => disconnect()}>Sign Out</Button>;
}