import NextAuth, { RequestInternal, User } from "next-auth";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import GitLabProvider from "next-auth/providers/gitlab";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

const authConfig = {
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({user}) {
      const dbUser = await prisma.user.findUnique({where: {id: user.id}})
      if (!dbUser) {
        return true;
      }
      if (user && "state" in user && user.state == "ACTIVE") {
        return true;
      }
      return false;
    },
    jwt({ token, user }) {
      if (user && "role" in user) {
        token.role = user.role;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async function (
        credentials:
          | Record<
              "email" | "password",
              string
            >
          | undefined
      ): Promise<User | null> {
        if (!credentials) {
          return null;
        }
        const {email, password} = credentials;
        if (email.length > 0 && password.length > 0) {
          const user = await prisma.user.findUnique({where: {email}})
          if (user && await bcrypt.compare(password, user!.password!)) {
            const {password, ...safeUser} = user;
            return safeUser;
          }
        }
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),

    GitLabProvider({
      clientId: process.env.GITLAB_CLIENT_ID!,
      clientSecret: process.env.GITLAB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt"
  }
} satisfies AuthOptions;

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
