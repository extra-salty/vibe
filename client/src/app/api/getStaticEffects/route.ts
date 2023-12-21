import clientPromise from '@/services/mongodb/mongodbService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	// const searchParams = req.nextUrl.searchParams;
	// const query = searchParams.get('slug');

	try {
		const client = await clientPromise;
		const db = client.db('vibe');

		const staticEffects = await db
			.collection('effectList')
			.find({})
			// .sort({ metacritic: -1 })
			// .limit(10)
			.toArray();

		return NextResponse.json(staticEffects);
	} catch (e) {
		console.error(e);
	}
}
