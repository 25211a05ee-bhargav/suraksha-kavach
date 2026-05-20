import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Mock Credentials",
      credentials: {
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        // Mock authorization for Hackathon Prototype
        if (credentials?.role === 'admin') {
          return {
            id: 'admin-1',
            name: 'School Principal',
            email: 'admin@school.edu',
            role: 'SCHOOL_ADMIN',
            aapdaScore: 0,
            image: 'https://ui-avatars.com/api/?name=School+Principal&background=random'
          };
        }
        
        // Default to student
        return {
          id: 'student-1',
          name: 'G. Akshay Reddy',
          email: 'student@university.edu',
          role: 'STUDENT',
          aapdaScore: 750,
          image: 'https://ui-avatars.com/api/?name=Akshay+Reddy&background=random'
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // If user object is available (during sign in), inject properties
      if (user) {
        // For Google OAuth, role and aapdaScore won't exist on the 'user' object, so provide defaults
        token.role = (user as any).role || 'STUDENT';
        token.aapdaScore = (user as any).aapdaScore !== undefined ? (user as any).aapdaScore : 750;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.aapdaScore = token.aapdaScore as number;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Custom login page
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
