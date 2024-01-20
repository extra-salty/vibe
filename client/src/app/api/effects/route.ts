import { NextRequest, NextResponse } from 'next/server';
import { EffectBaseT, EffectTableT } from '@/types/effect.types';
import mongoClientPromise from '@/services/MongoDB/mongoClient';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const sortOption = searchParams.get('sortOptionValue') || 'name';
		const sortDirection = searchParams.get('sortDirection') || 'asc';
		const filterOption = searchParams.get('filterOptionValue') || 'name';
		const filterValue = searchParams.get('filterValue') || '';

		const client = await mongoClientPromise;

		const effects: EffectBaseT[] = await client
			.db(process.env.DB_NAME)
			.collection<EffectBaseT>(process.env.EFFECT_COLLECTION)
			.find({ [filterOption]: { $regex: filterValue, $options: 'i' } })
			// .project({ _id: 0 })
			.sort({ [sortOption]: sortDirection === 'asc' ? 1 : -1 })
			.toArray();

		const effectTableData: EffectTableT[] = effects.map((effect) => ({
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
		const names: string[] = await req.json();

		const client = await mongoClientPromise;

		const result = await client
			.db(process.env.DB_NAME)
			.collection(process.env.EFFECT_COLLECTION)
			.deleteMany({ name: { $in: names } });

		if (!(result.deletedCount === names.length)) {
			throw Error(
				`Failed static effect deletion. Expected delete count ${names.length}, resulted delete count ${result.deletedCount}`,
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
