import { NextRequest, NextResponse } from 'next/server';
import mongoClientPromise from '@/services/MongoDB/mongoClient';
import { EffectBaseT, FrameBase } from '@/types/effect.types';
import { Color } from '@/types/color.types';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const effectName = searchParams.get('name') || undefined;

		const client = await mongoClientPromise;

		const effect = await client
			.db(process.env.DB_NAME)
			.collection<EffectBaseT>(process.env.EFFECT_COLLECTION)
			.findOne({ name: effectName }, { projection: { _id: false } });

		if (!effect) {
			throw Error('Failed to find static effect');
		}

		return NextResponse.json(effect);
	} catch (e) {
		console.log(e);
		console.error(e);
	}

	// return new NextResponse(null, {
	// 	status: 200,
	// });
}

export async function POST(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const effectName = searchParams.get('name');

		const client = await mongoClientPromise;
		const collection = client.db(process.env.DB_NAME).collection(process.env.EFFECT_COLLECTION);

		let newEffect: Omit<EffectBaseT, '_id'> | null = null;

		if (!effectName) {
			let isFound = false;
			let count = 1;

			while (!isFound) {
				const effects = await collection
					.find({ name: { $regex: `newEffect${count}`, $options: 'i' } })
					.limit(1)
					.toArray();

				if (effects.length) {
					count++;
				} else {
					isFound = true;
				}
			}

			newEffect = {
				name: `newEffect${count}`,
				description: '',
				dateCreated: new Date(),
				dateModified: new Date(),
				frames: [],
			};
		} else {
			const temp = await collection.findOne({ name: effectName });

			if (temp) {
				newEffect = {
					name: `${effectName}_Dup`,
					description: temp?.description,
					dateCreated: new Date(),
					dateModified: new Date(),
					frames: temp?.frames,
				};
			}
		}

		if (newEffect) {
			const result = await client
				.db(process.env.DB_NAME)
				.collection(process.env.EFFECT_COLLECTION)
				.insertOne(newEffect);

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

export async function PUT() {
	try {
		const client = await mongoClientPromise;
		const collection = client.db(process.env.DB_NAME).collection(process.env.EFFECT_COLLECTION);

		let isFound = false;
		let count = 1;

		while (!isFound) {
			const effects = await collection
				.find({ name: { $regex: `newEffect${count}`, $options: 'i' } })
				.limit(1)
				.toArray();

			if (effects.length) {
				count++;
			} else {
				isFound = true;
			}
		}

		const newEffect: Omit<EffectBaseT, '_id'> = {
			name: `newEffect${count}`,
			description: '',
			dateCreated: new Date(),
			dateModified: new Date(),
			frames: [new FrameBase(1000, new Color(0, 0, 0))],
		};
		console.log('🚀 ~ PUT ~ newEffect:', newEffect);

		const result = await client
			.db(process.env.DB_NAME)
			.collection(process.env.EFFECT_COLLECTION)
			.insertOne(newEffect);

		if (!result.acknowledged) {
			throw Error('Failed static effect creation.');
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
		const { name, ...effectData }: Omit<EffectBaseT, 'dateCreated'> = await req.json();

		const client = await mongoClientPromise;

		const result = client
			.db(process.env.DB_NAME)
			.collection(process.env.EFFECT_COLLECTION)
			.findOneAndUpdate({ name: name }, { $set: effectData });
	} catch (e) {
		console.log(e);
		console.error(e);
	}

	return new NextResponse(null, {
		status: 200,
	});
}
