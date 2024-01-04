import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/services/mongodb/mongodbService';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const _id = searchParams.get('_id') || undefined;

		const client = await clientPromise;
		const db = client.db('vibe');

		const staticEffect = await db.collection('effectList').findOne({ _id: new ObjectId(_id) });

		return NextResponse.json(staticEffect);
	} catch (e) {
		console.log(e);
		console.error(e);
	}
}
