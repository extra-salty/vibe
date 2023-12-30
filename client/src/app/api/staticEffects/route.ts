import { EffectDataUpdateT } from '@/services/vibe/vibeService.types';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/services/mongodb/mongodbService';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const sortOption = searchParams.get('sortOption') || 'name-asc';
		const filterOption = searchParams.get('filterOption') || 'name';
		const filterValue = searchParams.get('filterValue') || '';

		const [sortBy, sortDirection] = sortOption.split('-');

		const client = await clientPromise;
		const db = client.db('vibe');

		const staticEffects = await db
			.collection('effectList')
			.find({ [filterOption]: { $regex: filterValue, $options: 'i' } })
			.sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
			.toArray();

		// const staticEffects = await db.collection('effectList').aggregate([
		// 	{
		// 		$project: {
		// 			frames: 1,
		// 			length: { $size: '$frames' },
		// 		},
		// 	},
		// 	{ $sort: { length: -1 } },
		// 	{ $find: {} },
		// ]);
		return NextResponse.json(staticEffects);
	} catch (e) {
		console.log(e);
		console.error(e);
	}
}

export async function POST(req: NextRequest) {
	try {
		const client = await clientPromise;
		const db = client.db('vibe');

		const newEffect = await req.json();

		const result = db.collection('effectList').insertOne(newEffect);
	} catch (e) {
		console.log(e);
		console.error(e);
	}

	return new NextResponse(null, {
		status: 200,
	});
}

export async function PUT(req: NextRequest) {
	try {
		const client = await clientPromise;
		const db = client.db('vibe');

		const { _id, ...effectData }: EffectDataUpdateT = await req.json();

		const result = await db
			.collection('effectList')
			.findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: effectData });
	} catch (e) {
		console.log(e);
		console.error(e);
	}

	return new NextResponse(null, {
		status: 200,
	});
}

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
