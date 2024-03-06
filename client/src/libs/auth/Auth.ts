import 'server-only';
import { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import mongoClientPromise from '@/libs/mongodb/mongoClient';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.NEXTAUTH_GOOGLE_ID,
			clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	adapter: MongoDBAdapter(mongoClientPromise, {
		databaseName: process.env.DB_NAME,
	}) as Adapter,
};
