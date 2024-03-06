import { NextRequest, NextResponse } from 'next/server';
import { AnimationT } from '@/types/animation.types';
import mongoClientPromise from '@/libs/mongodb/mongoClient';

export async function GET(req: NextRequest) {
	const name = req.nextUrl.searchParams.get('name');

	if (name) {
		const client = await mongoClientPromise;

		const animation = await client
			.db(process.env.DB_NAME)
			.collection<AnimationT>(process.env.ANIMATIONS_COLLECTION)
			.find({ name: name })
			.limit(1)
			.next();

		if (animation) {
			return new NextResponse(null, {
				status: 404,
				statusText: 'Static animation already exist.',
			});
		} else {
			return new NextResponse(null, {
				status: 200,
				statusText: 'Static animation name is valid.',
			});
		}
	} else {
		return new NextResponse(null, {
			status: 422,
			statusText: 'Missing required query parameters',
		});
	}
}
