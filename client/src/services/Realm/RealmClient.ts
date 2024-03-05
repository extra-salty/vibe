'use client';
import * as Realm from 'realm-web';

export const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID });
// export const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID);
