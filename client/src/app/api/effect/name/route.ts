import { NextRequest, NextResponse } from 'next/server';
import { AnimationT } from '@/types/animation.types';
import mongoClientPromise from '@/services/mongodb/mongoClient';

export async function GET(req: NextRequest) {
	const name = req.nextUrl.searchParams.get('name');

	if (name) {
		const client = await mongoClientPromise;

		const effect = await client
			.db(process.env.DB_NAME)
			.collection<AnimationT>(process.env.EFFECT_COLLECTION)
			.find({ name: name })
			.limit(1)
			.next();

		return NextResponse.json({ exist: effect ? true : false });
	} else {
		return new NextResponse(null, {
			status: 422,
			statusText: 'Missing required query parameters',
		});
	}
}
