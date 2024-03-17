import { NextRequest, NextResponse } from 'next/server';
import { StaticAnimationT } from '@/types/animation.types';
import { Collection, ObjectId } from 'mongodb';
import mongoClientPromise from '@/libs/mongodb/mongoClient';

export async function GET() {
	const client = await mongoClientPromise;

	// const staticAnimations: Collection<StaticAnimationT> = await client
	// 	.db('vibe')
	// 	.collection<StaticAnimationT>('staticAnimations')
	// 	.find({})
	// 	.sort({ name: 1 })
	// 	.toArray();
	const staticAnimations = undefined;

	if (staticAnimations) {
		return NextResponse.json(staticAnimations);
	} else {
		return new NextResponse(null, {
			status: 404,
		});
	}
}

// export async function DELETE(req: NextRequest) {
// 	const ids = req.nextUrl.searchParams.get('ids');

// 	if (ids) {
// 		const objectIds: ObjectId[] = decodeURIComponent(ids)
// 			.split('&')
// 			.map((id) => new ObjectId(id));

// 		const client = await mongoClientPromise;

// 		const result = await client
// 			.db(process.env.DB_NAME)
// 			.collection(process.env.DB_STATIC_ANIMATION_COLLECTION)
// 			.deleteMany({ _id: { $in: objectIds } });

// 		if (result.deletedCount === objectIds.length) {
// 			return new NextResponse(null, {
// 				status: 200,
// 				statusText: `${result.deletedCount} document(s) deleted.`,
// 			});
// 		} else {
// 			return new NextResponse(null, {
// 				status: 500,
// 				statusText: 'Server unable to delete document(s)',
// 			});
// 		}
// 	} else {
// 		return new NextResponse(null, {
// 			status: 422,
// 			statusText: 'Missing required query parameters',
// 		});
// 	}
// }
