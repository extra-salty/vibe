import { NextRequest } from 'next/server';
import * as Realm from 'realm-web';

export async function GET(req: NextRequest) {
	Realm.handleAuthRedirect();
}
