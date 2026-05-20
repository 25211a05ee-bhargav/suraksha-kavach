import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      aapdaScore?: number;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    aapdaScore?: number;
  }
}
