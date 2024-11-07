import NextAuth  from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      role: string;
    } & DefaultSession["user"];
  }
  interface customUser {
    id: string,
    role: string
    & User;
  }
}