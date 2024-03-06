import { authOptions } from '@/libs/auth/Auth';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
