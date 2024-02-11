import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { AnimationBaseT, AnimationStateT } from '@/types/animation.types';
import { EffectBaseT } from '@/types/effect.types';
import mongoClientPromise from '@/services/mongodb/mongoClient';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const animationName = searchParams.get('name');

	try {
		if (!animationName) {
			throw Error('Invalid animation name.');
		}

		const client = await mongoClientPromise;

		const animation = await client
			.db(process.env.DB_NAME)
			.collection<AnimationBaseT>(process.env.ANIMATION_COLLECTION)
			.findOne({ name: animationName }, { projection: { _id: false } });

		if (!animation) {
			throw Error('Failed to find animation');
		}

		const effectNames = animation?.effects.map((effect) => effect.name);

		const effects = await client
			.db(process.env.DB_NAME)
			.collection<EffectBaseT>(process.env.EFFECT_COLLECTION)
			.find({ name: { $in: effectNames } }, { projection: { _id: false } })
			.toArray();

		if (!effects) {
			throw Error('Failed to find effects');
		}

		const animationWithEffectsData: AnimationStateT = {
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

export async function POST(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const duplicateId = searchParams.get('duplicateId');
	const data = await req.formData();

	const client = await mongoClientPromise;
	const collection = client.db(process.env.DB_NAME).collection(process.env.ANIMATION_COLLECTION);

	let newAnimation: Omit<AnimationBaseT, '_id'> = {
		name: data.get('name') as string,
		description: data.get('description') as string,
		dateCreated: new Date(),
		dateModified: new Date(),
		effects: [],
	};

	if (duplicateId) {
		const animationToDuplicate = await collection
			.find<AnimationBaseT>({ _id: new ObjectId(duplicateId) })
			.limit(1)
			.next();

		if (!animationToDuplicate) {
			return new NextResponse(null, {
				status: 410,
			});
		}

		newAnimation = { ...newAnimation, effects: animationToDuplicate.effects };
	}

	const result = await collection.insertOne(newAnimation);

	if (result.acknowledged) {
		return new NextResponse(null, {
			status: 201,
		});
	} else {
		return new NextResponse(null, {
			status: 500,
		});
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const dateModified = new Date();
		const { name, ...animationData }: AnimationBaseT = await req.json();
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
