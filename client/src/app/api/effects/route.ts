import { NextRequest, NextResponse } from 'next/server';
import { EffectBaseT, EffectTableT } from '@/types/effect.types';
import { ObjectId } from 'mongodb';
import mongoClientPromise from '@/services/mongodb/mongoClient';

export async function GET() {
	try {
		const client = await mongoClientPromise;

		const effects: EffectBaseT[] = await client
			.db(process.env.DB_NAME)
			.collection<EffectBaseT>(process.env.EFFECT_COLLECTION)
			.find({})
			.sort({ name: 1 })
			.toArray();

		const effectTableData: EffectTableT[] = effects.map((effect) => ({
			_id: effect._id,
			name: effect.name,
			description: effect.description,
			dateCreated: effect.dateCreated,
			dateModified: effect.dateModified,
			framesLength: effect.frames.length,
			duration: effect.frames.reduce((duration, effect) => duration + effect.duration, 0) / 1000,
		}));

		return NextResponse.json(effectTableData);
	} catch (e) {
		console.log(e);
		console.error(e);
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
