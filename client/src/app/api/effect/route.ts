import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_COLOR, AnimationStaticBaseT, FrameBase } from '@/types/effect.types';
import { ObjectId } from 'mongodb';
import mongoClientPromise from '@/services/mongodb/mongoClient';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const effectName = searchParams.get('name') || undefined;

		const client = await mongoClientPromise;

		const effect = await client
			.db(process.env.DB_NAME)
			.collection<AnimationStaticBaseT>(process.env.EFFECT_COLLECTION)
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
	const searchParams = req.nextUrl.searchParams;
	const duplicateId = searchParams.get('duplicateId');
	const data = await req.formData();

	const client = await mongoClientPromise;
	const collection = client
		.db(process.env.DB_NAME)
		.collection(process.env.EFFECT_COLLECTION);

	let newEffect: Omit<AnimationStaticBaseT, '_id'> = {
		name: data.get('name') as string,
		description: data.get('description') as string,
		dateCreated: new Date(),
		dateModified: new Date(),
		frames: [new FrameBase(1000, DEFAULT_COLOR)],
		framesLength: 1,
		duration: 1000,
		power: 0,
	};

	if (duplicateId) {
		const effectToDuplicate = await collection.findOne<AnimationStaticBaseT>({
			_id: new ObjectId(duplicateId),
		});
		// .limit(1)
		// .next();

		if (!effectToDuplicate) {
			return new NextResponse(null, {
				status: 410,
			});
		}

		newEffect = { ...newEffect, frames: effectToDuplicate.frames };
	}

	const result = await collection.insertOne(newEffect);

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
		const { _id, ...effectData }: Omit<AnimationStaticBaseT, 'dateCreated'> =
			await req.json();

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
