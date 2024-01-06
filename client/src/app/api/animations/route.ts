import { NextRequest, NextResponse } from 'next/server';
import { AnimationT } from '@/state/features/animation/animation.types';
import clientPromise from '@/services/mongodb/mongodbService';

export async function GET(req: NextRequest) {
	try {
		const client = await clientPromise;
		const db = client.db('vibe');

		const staticEffects = await db.collection('animations').find({}).toArray();

		return NextResponse.json(staticEffects);
	} catch (e) {
		console.log(e);
		console.error(e);
	}
}

export async function POST(req: NextRequest) {
	try {
		const client = await clientPromise;
		const db = client.db('vibe');

		// const newAnimation = await req.json();
		const newAnimation: AnimationT = {
			name: 'name',
			description: 'description',
			segments: [
				{
					type: 'static',
					id: '658ee3bbeb664cbf828d5e70',
					repeat: 1,
				},
				{
					type: 'static',
					id: '658ee3d5eb664cbf828d5e71',
					repeat: 1,
				},
			],
		};

		const result = db.collection('animations').insertOne(newAnimation);
	} catch (e) {
		console.log(e);
		console.error(e);
	}

	return new NextResponse(null, {
		status: 200,
	});
}
