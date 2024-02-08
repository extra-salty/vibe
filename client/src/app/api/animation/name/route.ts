import { NextRequest, NextResponse } from 'next/server';
import { AnimationBaseT } from '@/types/animation.types';
import mongoClientPromise from '@/services/mongodb/mongoClient';

export async function HEAD(req: NextRequest) {
	const name = req.nextUrl.searchParams.get('name');
	console.log('🚀 ~ GET ~ name:', name);

	if (name) {
		const client = await mongoClientPromise;

		const animations = await client
			.db(process.env.DB_NAME)
			.collection<AnimationBaseT>(process.env.ANIMATION_COLLECTION)
			.find({ name: name })
			.limit(1)
			.toArray();

		console.log('🚀 ~ GET ~ animations:', animations);

		return new NextResponse(null, {
			status: animations.length ? 204 : 404,
			headers: {},
		});
	} else {
		return new NextResponse(null, {
			status: 422,
			statusText: 'Missing required query parameters',
		});
	}
}
