'use client';

import { CredentialResponse } from 'google-one-tap';
import * as Realm from 'realm-web';

// export const useUser = async (response: CredentialResponse | null) => {
// 	if (!response) return;

// 	console.log('🚀 ~ useUser ~ response:', response);
// 	const app = new Realm.App({
// 		id: process.env.NEXT_PUBLIC_APP_ID,
// 	});

// 	const credentials = Realm.Credentials.google({ idToken: response.credential });
// 	console.log('🚀 ~ useUser ~ credentials:', credentials);

// 	const user = app.logIn(credentials);
// 	console.log('🚀 ~ useUser ~ user:', user);
// };
