import { NextRequest, NextResponse } from 'next/server';
import { AnimationT } from '@/state/features/animation/animation.types';
import mongoClientPromise from '@/services/MongoDB/mongoClient';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const animationName = searchParams.get('name') || undefined;

		const client = await mongoClientPromise;

		const result = await client
			.db(process.env.DB_NAME)
			.collection(process.env.ANIMATION_COLLECTION)
			.findOne({ name: animationName });

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

export async function POST(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const animationName = searchParams.get('name');

		const client = await mongoClientPromise;
		const collection = client.db(process.env.DB_NAME).collection(process.env.EFFECT_COLLECTION);

		let newAnimation: AnimationT | null = null;

		if (!animationName) {
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

			newAnimation = {
				name: `newAnimation${count}`,
				description: '',
				dateCreated: new Date(),
				dateModified: new Date(),
				effects: [],
			};
		} else {
			const temp = await collection.findOne({ name: animationName });

			if (temp) {
				newAnimation = {
					name: `${animationName}_Dup`,
					description: temp?.description,
					dateCreated: new Date(),
					dateModified: new Date(),
					effects: temp?.frames,
				};
			}
		}

		if (newAnimation) {
			const result = await client
				.db(process.env.DB_NAME)
				.collection(process.env.EFFECT_COLLECTION)
				.insertOne(newAnimation);

			if (!result.acknowledged) {
				throw Error('Failed static effect creation.');
			}
		}
	} catch (e) {
		console.log(e);
		console.error(e);
	}

	return new NextResponse(null, {
		status: 200,
	});
}
