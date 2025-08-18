import type {
  SIWESession,
  SIWEVerifyMessageArgs,
  SIWECreateMessageArgs,
} from "@reown/appkit-siwe";
import { monadTestnet } from "@reown/appkit/networks";
import { createSIWEConfig, formatMessage } from "@reown/appkit-siwe";
import { getCsrfToken, getSession, signIn, signOut } from "next-auth/react";

export const siweConfig = createSIWEConfig({
  getMessageParams: async () => ({
    domain: typeof window !== "undefined" ? window.location.host : "",
    uri: typeof window !== "undefined" ? window.location.origin : "",
    chains: [monadTestnet.id],
    statement: "Please sign with your account",
  }),
  createMessage: ({ address, ...args }: SIWECreateMessageArgs) =>
    formatMessage(args, address),
  getNonce: async () => {
    const nonce = await getCsrfToken();
    if (!nonce) {
      throw new Error("Failed to get nonce!");
    }

    return nonce;
  },
  getSession: async () => {
    const session = await getSession();
    if (!session) {
      return null;
    }

    if (
      typeof session.user.address !== "string" ||
      typeof session.user.chainId !== "string"
    ) {
      return null;
    }

    return {
      address: session.user.address,
      chainId: parseInt(session.user.chainId.split(":")[1]),
    } satisfies SIWESession;
  },
  verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
    try {
      await signIn("credentials", {
        message,
        signature,
        redirect: true,
        redirectTo: "/",
      });
      return true;
    } catch {
      return false;
    }
  },
  signOut: async () => {
    try {
      await signOut({
        redirect: true,
        redirectTo: "/",
      });
      return true;
    } catch {
      return false;
    }
  },
});
