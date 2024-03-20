'use client';
import { useRouter } from 'next/navigation';

export type RoutesT = 'home' | 'login' | 'register' | 'reset' | 'confirm';
type ParamT = Record<string, any>;

export const useRoutes = (route: RoutesT, params?: ParamT) => {
	const router = useRouter();

	const routes: Record<RoutesT, string> = {
		home: '/',
		login: '/user/login',
		register: '/user/register',
		reset: '/user/reset',
		confirm: '/user/confirm',
	};

	const urlParams = new URLSearchParams(params);

	const path = `${routes[route]}?${urlParams}`;

	return () => router.push(path);
};
