import { NextRequest, NextResponse } from 'next/server';
import { AnimationBaseT } from '@/types/animation.types';
import mongoClientPromise from '@/services/mongodb/mongoClient';

export async function GET() {
	const client = await mongoClientPromise;

	const animations: AnimationBaseT[] = await client
		.db(process.env.DB_NAME)
		.collection<AnimationBaseT>(process.env.ANIMATION_COLLECTION)
		.find({})
		.sort({ name: 1 })
		.toArray();

	return NextResponse.json(animations);
}

export async function DELETE(req: NextRequest) {
	const names: string[] = await req.json();

	const client = await mongoClientPromise;

	const result = await client
		.db(process.env.DB_NAME)
		.collection<AnimationBaseT>(process.env.ANIMATION_COLLECTION)
		.deleteMany({ name: { $in: names } });

	if (!(result.deletedCount === names.length)) {
		throw Error(
			`Failed animations deletion. Expected delete count ${names.length}, resulted delete count ${result.deletedCount}`,
		);
	}

	return new NextResponse(null, {
		status: 200,
	});
}
