import { getApp } from 'realm-web';

export const useApp = () => getApp(process.env.NEXT_PUBLIC_APP_ID);
