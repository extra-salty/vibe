import { NextRequest, NextResponse } from 'next/server';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { BaseAnimationT, StateAnimationT } from '@/state/features/animation/animation.types';
import mongoClientPromise from '@/services/MongoDB/mongoClient';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const animationName = searchParams.get('name');

		if (!animationName) {
			throw Error('Invalid animation name.');
		}

		const client = await mongoClientPromise;

		const animation = await client
			.db(process.env.DB_NAME)
			.collection<BaseAnimationT>(process.env.ANIMATION_COLLECTION)
			.findOne({ name: animationName }, { projection: { _id: false } });

		if (!animation) {
			throw Error('Failed to find animation');
		}

		const effectNames = animation?.effects.map((effect) => effect.name);

		const effects = await client
			.db(process.env.DB_NAME)
			.collection<BaseEffectT>(process.env.EFFECT_COLLECTION)
			.find({ name: { $in: effectNames } }, { projection: { _id: false } })
			.toArray();

		if (!effects) {
			throw Error('Failed to find effects');
		}

		const animationWithEffectsData: StateAnimationT = {
			...animation,
			effects: animation.effects.map((effect, i) => ({
				type: effect.type,
				repeat: effect.repeat,
				data: effects[i],
			})),
		};

		return NextResponse.json(animationWithEffectsData);
	} catch (e) {
		console.log(e);
		console.error(e);
	}

	return new NextResponse(null, {
		status: 200,
	});
}

export async function PUT() {
	try {
		const client = await mongoClientPromise;
		const collection = client.db(process.env.DB_NAME).collection(process.env.ANIMATION_COLLECTION);

		let isFound = false;
		let count = 1;

		while (!isFound) {
			const animations = await collection
				.find({ name: { $regex: `newAnimation${count}`, $options: 'i' } })
				.limit(1)
				.toArray();

			if (animations.length) {
				count++;
			} else {
				isFound = true;
			}
		}

		const newAnimation: BaseAnimationT = {
			name: `newAnimation${count}`,
			description: '',
			dateCreated: new Date(),
			dateModified: new Date(),
			effects: [],
		};

		const result = await client
			.db(process.env.DB_NAME)
			.collection(process.env.ANIMATION_COLLECTION)
			.insertOne(newAnimation);

		if (!result.acknowledged) {
			throw Error('Failed animation creation.');
		}
	} catch (e) {
		console.log(e);
		console.error(e);
	}

	return new NextResponse(null, {
		status: 200,
	});
}

export async function PATCH(req: NextRequest) {
	try {
		const dateModified = new Date();
		const { name, ...animationData }: BaseAnimationT = await req.json();
		console.log('🚀 ~ PATCH ~ animationData:', animationData);

		const client = await mongoClientPromise;

		const result = await client
			.db(process.env.DB_NAME)
			.collection(process.env.ANIMATION_COLLECTION)
			.findOneAndUpdate({ name: name }, { $set: animationData });
		console.log('🚀 ~ PATCH ~ result:', result);
	} catch (e) {
		console.log(e);
		console.error(e);
	}

	return new NextResponse(null, {
		status: 200,
	});
}
