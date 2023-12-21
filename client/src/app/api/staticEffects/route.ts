import clientPromise from '@/services/mongodb/mongodbService';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const client = await clientPromise;
		const db = client.db('vibe');
		const collection = db.collection('effectList');

		const newEffect = await req.json();
		collection.insertOne(newEffect);
	} catch (e) {
		console.log(e);
		console.error(e);
	}

	return new NextResponse(null, {
		status: 200,
	});
}
