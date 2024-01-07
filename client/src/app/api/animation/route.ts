import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/services/mongodb/mongodbService';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const name = searchParams.get('name') || undefined;

		const client = await clientPromise;
		const db = client.db('vibe');

		const animation = await db.collection('animations').findOne({ name: name });

		return NextResponse.json(animation);
	} catch (e) {
		console.log(e);
		console.error(e);
	}
}
