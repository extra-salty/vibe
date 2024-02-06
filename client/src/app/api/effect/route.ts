import { NextRequest, NextResponse } from 'next/server';
import { EffectBaseT, FrameBase } from '@/types/effect.types';
import { ObjectId } from 'mongodb';
import { Color } from '@/types/color.types';
import mongoClientPromise from '@/services/mongodb/mongoClient';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const effectName = searchParams.get('name') || undefined;

		const client = await mongoClientPromise;

		const effect = await client
			.db(process.env.DB_NAME)
			.collection<EffectBaseT>(process.env.EFFECT_COLLECTION)
			.findOne({ name: effectName });

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
		const effectIdToDuplicate = searchParams.get('effectIdToDuplicate');

		const client = await mongoClientPromise;
		const collection = client.db(process.env.DB_NAME).collection(process.env.EFFECT_COLLECTION);

		let newEffect: Omit<EffectBaseT, '_id'> | null = null;

		if (!effectIdToDuplicate) {
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
				frames: [new FrameBase(1000, new Color(0, 0, 0))],
			};
		} else {
			const temp = await collection.findOne({ _id: new ObjectId(effectIdToDuplicate) });

			if (temp) {
				newEffect = {
					name: `${temp.name}_Dup`,
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

export async function PATCH(req: NextRequest) {
	try {
		const { _id, ...effectData }: Omit<EffectBaseT, 'dateCreated'> = await req.json();

		const client = await mongoClientPromise;

		const result = await client
			.db(process.env.DB_NAME)
			.collection(process.env.EFFECT_COLLECTION)
			.findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: effectData });

		if (!result) {
			throw Error(`Failed to save effect modifications: ${effectData.name}`);
		}
	} catch (e) {
		console.log(e);
		console.error(e);
	}

	return new NextResponse(null, {
		status: 200,
	});
}

// export async function POST(req: NextRequest) {
// 	try {
// 		const names: string[] = await req.json();
// 		console.log('🚀 ~ GET ~ names:', names);

// 		const client = await mongoClientPromise;

// 		const effects = await client
// 			.db(process.env.DB_NAME)
// 			.collection(process.env.EFFECT_COLLECTION)
// 			// .find({})
// 			.find({ name: { $in: names[0] } })
// 			.toArray();
// 		console.log('🚀 ~ POST ~ effects:', effects);

// 		return NextResponse.json(effects);
// 	} catch (e) {
// 		console.log(e);
// 		console.error(e);
// 	}
// }
