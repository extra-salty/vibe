import { NextRequest, NextResponse } from 'next/server';
import { AnimationT } from '@/types/animation.types';
import { ObjectId } from 'mongodb';
import mongoClientPromise from '@/libs/mongodb/mongoClient';

export async function GET() {
	const client = await mongoClientPromise;

	const animationGroups: AnimationT[] = await client
		.db(process.env.DB_NAME)
		.collection<AnimationT>(process.env.ANIMATIONS_COLLECTION)
		.find({})
		.sort({ name: 1 })
		.toArray();

	if (animationGroups) {
		return NextResponse.json(animationGroups);
	} else {
		return new NextResponse(null, {
			status: 404,
		});
	}
}

export async function DELETE(req: NextRequest) {
	const ids = req.nextUrl.searchParams.get('ids');

	if (ids) {
		const objectIds: ObjectId[] = decodeURIComponent(ids)
			.split('&')
			.map((id) => new ObjectId(id));

		const client = await mongoClientPromise;

		const result = await client
			.db(process.env.DB_NAME)
			.collection(process.env.ANIMATIONS_COLLECTION)
			.deleteMany({ _id: { $in: objectIds } });

		if (result.deletedCount === objectIds.length) {
			return new NextResponse(null, {
				status: 200,
				statusText: `${result.deletedCount} document(s) deleted.`,
			});
		} else {
			return new NextResponse(null, {
				status: 500,
				statusText: 'Server unable to delete document(s)',
			});
		}
	} else {
		return new NextResponse(null, {
			status: 422,
			statusText: 'Missing required query parameters',
		});
	}
}
