import { NextRequest, NextResponse } from 'next/server';
import mongoClientPromise from '@/services/MongoDB/mongoClient';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const sortOption = searchParams.get('sortOptionValue') || 'name-asc';
		const filterOption = searchParams.get('filterOptionValue') || 'name';
		const filterValue = searchParams.get('filterValue') || '';
		const [sortBy, sortDirection] = sortOption.split('-');

		const client = await mongoClientPromise;

		const effects = await client
			.db(process.env.DB_NAME)
			.collection(process.env.EFFECT_COLLECTION)
			.find({ [filterOption]: { $regex: filterValue, $options: 'i' } })
			.project({ _id: 0 })
			.sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
			.toArray();

		return NextResponse.json(effects);
	} catch (e) {
		console.log(e);
		console.error(e);
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const names: string[] = await req.json();

		const client = await mongoClientPromise;

		const result = await client
			.db(process.env.DB_NAME)
			.collection(process.env.EFFECT_COLLECTION)
			.deleteMany({ name: { $in: names } });

		if (!(result.deletedCount === names.length)) {
			throw Error(
				`Failed static effect deletion. Expected delete count ${names.length}, resulted delete count ${result.deletedCount}`,
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
