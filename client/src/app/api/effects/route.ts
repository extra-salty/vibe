import { NextRequest, NextResponse } from 'next/server';
import { AnimationStaticBaseT, StaticAnimationTableT } from '@/types/effect.types';
import { ObjectId } from 'mongodb';
import mongoClientPromise from '@/services/mongodb/mongoClient';

export async function GET() {
	const client = await mongoClientPromise;

	const effects: StaticAnimationTableT[] = await client
		.db(process.env.DB_NAME)
		.collection<AnimationStaticBaseT>(process.env.EFFECT_COLLECTION)
		.find({}, { projection: { frames: false } })
		.sort({ name: 1 })
		.toArray();

	if (effects) {
		return NextResponse.json(effects);
	} else {
		return new NextResponse(null, {
			status: 404,
		});
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const ids: string[] = await req.json();
		const objectIds = ids.map((id) => new ObjectId(id));

		const client = await mongoClientPromise;

		const result = await client
			.db(process.env.DB_NAME)
			.collection(process.env.EFFECT_COLLECTION)
			.deleteMany({ _id: { $in: objectIds } });

		if (!(result.deletedCount === ids.length)) {
			throw Error(
				`Failed static effect deletion. Expected delete count ${ids.length}, resulted delete count ${result.deletedCount}`,
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
