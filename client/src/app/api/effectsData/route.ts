import { NextRequest, NextResponse } from 'next/server';
import mongoClientPromise from '@/services/MongoDB/mongoClient';

export async function POST(req: NextRequest) {
	try {
		const names: string[] = await req.json();
		console.log('🚀 ~ GET ~ names:', names);

		const client = await mongoClientPromise;

		const effects = await client
			.db(process.env.DB_NAME)
			.collection(process.env.EFFECT_COLLECTION)
			// .find({})
			.find({ name: { $in: names[0] } })
			.toArray();
		console.log('🚀 ~ POST ~ effects:', effects);

		return NextResponse.json(effects);
	} catch (e) {
		console.log(e);
		console.error(e);
	}
}
