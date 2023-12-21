import clientPromise from '@/services/mongodb/mongodbService';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
	try {
		const client = await clientPromise;
		const db = client.db(process.env.NEXT_PUBLIC_DB_NAME);
		const collection = db.collection(process.env.NEXT_PUBLIC_EFFECT_COLLECTION);

		const ids: string[] = await req.json();
		const objectIds = ids.map((id) => new ObjectId(id));

		const result = await collection.deleteMany({ _id: { $in: objectIds } });

		if (!(result.deletedCount === ids.length)) {
			throw Error(
				`Failed static effect deletion. 
        Expected delete count ${ids.length}, resulted delete count ${result.deletedCount}`,
			);
		}
	} catch (e) {
		console.log(e);
		console.error(e);
	}

	return new NextResponse(null, {
		status: 200,
	});
}

// db.command({
// 	delete: process.env.NEXT_PUBLIC_EFFECT_COLLECTION,
// 	deletes: [
// 		{
// 			q: {},
// 			limit: 0,
// 		},
// 	],
// 	comment: 'delete selected static effects',
// 	maxTimeMS: 2000,
// });
