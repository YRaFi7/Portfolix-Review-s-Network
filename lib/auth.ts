import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@portfolix.tech' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolix.tech';
        const adminPassword = process.env.ADMIN_PASSWORD || 'PortfolixAdmin2026!Secure';

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return {
            id: 'admin-1',
            name: 'Portfolix Lead Moderator',
            email: adminEmail,
            role: 'ADMIN',
          };
        }

        // Allow demo moderator login
        if (
          credentials?.email === 'moderator@portfolix.tech' &&
          credentials?.password === 'Moderator2026!'
        ) {
          return {
            id: 'mod-1',
            name: 'Network Operations Moderator',
            email: 'moderator@portfolix.tech',
            role: 'MODERATOR',
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as unknown as { role?: string }).role || 'USER';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as unknown as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'portfolix_super_secret_jwt_key_2026_change_in_prod',
};
