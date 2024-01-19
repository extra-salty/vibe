import { NextRequest, NextResponse } from 'next/server';
import mongoClientPromise from '@/services/MongoDB/mongoClient';
import { BaseAnimationT } from '@/state/features/animation/animation.types';
import { EffectDataT } from '@/components/custom/AnimationCreator/AnimationList/useColumns';

export type TableAnimationT = {
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	effects: {
		type: 'static' | 'dynamic';
		name: string;
		repeat: number;
		frames: number;
		duration: number;
	};
};

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const sortOption = searchParams.get('sortOptionValue') || 'name-asc';
		const filterOption = searchParams.get('filterOptionValue') || 'name';
		const filterValue = searchParams.get('filterValue') || '';
		const [sortBy, sortDirection] = sortOption.split('-');

		const client = await mongoClientPromise;

		const animations: BaseAnimationT[] = await client
			.db(process.env.DB_NAME)
			.collection<BaseAnimationT>(process.env.ANIMATION_COLLECTION)
			.find({ [filterOption]: { $regex: filterValue, $options: 'i' } })
			// .project({ _id: false })
			.sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
			.toArray();

		const effectNames: string[] = [];

		animations.map((animation) =>
			animation.effects.map(
				(effect) => !effectNames.includes(effect.name) && effectNames.push(effect.name),
			),
		);

		const effectsData = new Map();

		const effectCollection = client
			.db(process.env.DB_NAME)
			.collection<EffectDataT>(process.env.EFFECT_COLLECTION);

		effectNames.map((effect) => {
			effectCollection.find({ name: effect });
		});

		return NextResponse.json(animations);
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
			.collection<BaseAnimationT>(process.env.ANIMATION_COLLECTION)
			.deleteMany({ name: { $in: names } });

		if (!(result.deletedCount === names.length)) {
			throw Error(
				`Failed animations deletion. Expected delete count ${names.length}, resulted delete count ${result.deletedCount}`,
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
