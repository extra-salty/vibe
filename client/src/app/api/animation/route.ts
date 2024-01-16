import { NextRequest, NextResponse } from 'next/server';
import { BaseAnimationT } from './_types';
import mongoClientPromise from '@/services/MongoDB/mongoClient';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const animationName = searchParams.get('name') || undefined;

		const client = await mongoClientPromise;

		const result = await client
			.db(process.env.DB_NAME)
			.collection(process.env.ANIMATION_COLLECTION)
			.findOne({ name: animationName }, { projection: { _id: false } });

		if (!result) {
			throw Error('Failed to find animation');
		}

		return NextResponse.json(result);
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
