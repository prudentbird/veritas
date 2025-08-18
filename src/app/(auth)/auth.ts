import {
  SIWESession,
  verifySignature,
  getChainIdFromMessage,
  getAddressFromMessage,
} from "@reown/appkit-siwe";
import { env } from "~/env";
import { authSchema } from "./schema";
import { authConfig } from "./auth.config";
import { fetchMutation } from "convex/nextjs";
import { api } from "~/convex/_generated/api";
import type { DefaultJWT } from "next-auth/jwt";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends SIWESession {
    user: {
      id: string;
      address: string;
      chainId: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    address: string;
    chainId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      address: string;
      chainId: string;
    };
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
          id: address,
          chainId,
          address,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        await fetchMutation(api.users.authCreateUser, {
          address: user.address,
          chainId: user.chainId,
        });
      }

      return !!user;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.sub = user.address;
      }

      return token;
    },
    async session({ session, token }) {
      if (!token.sub) {
        return session;
      }

      session.user = {
        ...session.user,
        address: token.user.address,
        chainId: token.user.chainId,
      };

      return session;
    },
  },
  trustHost: true,
  debug: ["local", "development"].includes(env.NODE_ENV),
});
