import { NextRequest, NextResponse } from 'next/server';
import { EffectBaseT, EffectTableT, FrameBase } from '@/types/effect.types';
import { Color } from '@/types/color.types';
import { ObjectId } from 'mongodb';
import mongoClientPromise from '@/services/mongodb/mongoClient';

// export async function GET(req: NextRequest) {
// 	try {
// 		const searchParams = req.nextUrl.searchParams;
// 		const effectName = searchParams.get('name') || undefined;

// 		const client = await mongoClientPromise;

// 		const effect = await client
// 			.db(process.env.DB_NAME)
// 			.collection<EffectBaseT>(process.env.EFFECT_COLLECTION)
// 			.findOne({ name: effectName });

// 		if (!effect) {
// 			throw Error('Failed to find static effect');
// 		}

// 		return NextResponse.json(effect);
// 	} catch (e) {
// 		console.log(e);
// 		console.error(e);
// 	}

// 	// return new NextResponse(null, {
// 	// 	status: 200,
// 	// });
// }

export async function GET() {
	try {
		const client = await mongoClientPromise;

		const effects: EffectBaseT[] = await client
			.db(process.env.DB_NAME)
			.collection<EffectBaseT>(process.env.EFFECT_COLLECTION)
			.find({})
			.sort({ name: 1 })
			.toArray();

		const effectTableData: EffectTableT[] = effects.map((effect) => ({
			id: effect._id,
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

export async function DELETE(req: NextRequest) {
	try {
		const ids: string[] = await req.json();
		const objectIds = ids.map((id) => new ObjectId(id));

		const client = await mongoClientPromise;

		const result = await client
			.db(process.env.DB_NAME)
			.collection(process.env.EFFECT_COLLECTION)
			.deleteMany({ _id: { $in: objectIds } });

		if (!(result.deletedCount === ids.length)) {
			throw Error(
				`Failed static effect deletion. Expected delete count ${ids.length}, resulted delete count ${result.deletedCount}`,
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
