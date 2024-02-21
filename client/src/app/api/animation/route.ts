import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { AnimationT, AnimationStateT } from '@/types/animation.types';
import { AnimationStaticBaseT } from '@/types/effect.types';
import mongoClientPromise from '@/services/mongodb/mongoClient';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const id = searchParams.get('id');

	if (!id) {
		return new NextResponse(null, {
			status: 422,
			statusText: 'Missing required query parameters',
		});
	}

	const client = await mongoClientPromise;
	const db = client.db(process.env.DB_NAME);
	const animationCollection = db.collection(process.env.ANIMATION_COLLECTION);
	const effectCollection = db.collection(process.env.ANIMATION_COLLECTION);

	const animation = await animationCollection.findOne<AnimationT>({
		_id: new ObjectId(id),
	});

	if (!animation) {
		return new NextResponse(null, {
			status: 404,
			statusText: 'Unable to find animation',
		});
	}

	const getEffectGroup = () => {};

	const effects = await client
		.db(process.env.DB_NAME)
		.collection<AnimationStaticBaseT>(process.env.EFFECT_COLLECTION)
		.find({ name: { $in: effectNames } })
		.toArray();

	const animationWithEffectsData: AnimationStateT = {
		...animation,
		effects: animation.effects.map((effect, i) => ({
			type: effect.type,
			repeat: effect.repeat,
			data: effects[i],
		})),
	};

	return NextResponse.json(animationWithEffectsData);
}

export async function POST(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const duplicateId = searchParams.get('duplicateId');
	const data = await req.formData();

	const client = await mongoClientPromise;
	const collection = client
		.db(process.env.DB_NAME)
		.collection(process.env.ANIMATION_COLLECTION);

	let newAnimation: Omit<AnimationT, '_id'> = {
		name: data.get('name') as string,
		type: 'group',
		description: data.get('description') as string,
		dateCreated: new Date(),
		dateModified: new Date(),
		duration: 0,
		framesLength: 0,
		power: 0,
		group: [],
	};

	if (duplicateId) {
		const animationToDuplicate = await collection
			.find<AnimationT>({ _id: new ObjectId(duplicateId) })
			.limit(1)
			.next();

		if (!animationToDuplicate) {
			return new NextResponse(null, {
				status: 410,
			});
		}

		newAnimation = { ...newAnimation, group: animationToDuplicate.group };
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
		const { name, ...animationData }: AnimationT = await req.json();
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
