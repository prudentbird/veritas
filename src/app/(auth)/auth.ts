import { env } from "~/env";
import { authConfig } from "./auth.config";
import { api } from "~/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import type { DefaultJWT } from "next-auth/jwt";
import NextAuth, { type DefaultSession } from "next-auth";
import {
  getAddressFromMessage,
  getChainIdFromMessage,
  SIWESession,
  verifySignature,
} from "@reown/appkit-siwe";
import Credentials from "next-auth/providers/credentials";
import { authSchema } from "./schema";

declare module "next-auth" {
  interface Session extends SIWESession {
    address: string;
    chainId: number;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Monad Testnet",
      async authorize(credentials) {
        const projectId = env.NEXT_PUBLIC_PROJECT_ID;
        const validatedCredentials = authSchema.safeParse(credentials);

        if (!validatedCredentials.success) {
          throw new Error("Invalid credentials");
        }

        if (!projectId) {
          throw new Error("Project ID is not set");
        }

        const { message, signature } = validatedCredentials.data;
        const address = getAddressFromMessage(message);
        const chainId = getChainIdFromMessage(message);

        const isValid = await verifySignature({
          address,
          message,
          signature,
          chainId,
          projectId,
        });

        if (!isValid) {
          throw new Error("Something went wrong");
        }

        return {
          id: `${chainId}:${address}`,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (!token.sub) {
        return session;
      }

      const [, chainId, address] = token.sub.split(":");
      if (chainId && address) {
        session.address = address;
        session.chainId = parseInt(chainId, 10);
      }

      return session;
    },
  },
  trustHost: true,
  debug: ["local", "development"].includes(env.NODE_ENV),
});
