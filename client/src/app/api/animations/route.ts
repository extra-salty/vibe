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
		const newAnimation: Omit<AnimationT, '_id'> = {
			name: 'animation1',
			description: 'description',
			segments: [
				{
					type: 'static',
					name: 'effect1',
					repeat: 1,
				},
				{
					type: 'static',
					name: 'effect2',
					repeat: 1,
				},
				{
					type: 'static',
					name: 'effect3',
					repeat: 1,
				},
				{
					type: 'static',
					name: 'effect4',
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
