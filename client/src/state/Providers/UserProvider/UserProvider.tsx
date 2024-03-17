import { useRouter } from 'next/navigation';
import { createContext, useEffect } from 'react';
import { User, getApp } from 'realm-web';

export const UserContext = createContext<User | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();

	const app = getApp(process.env.NEXT_PUBLIC_APP_ID);
	const user = app.currentUser;

	useEffect(() => {
		if (!user) {
			router.push('/user/login');
		}
	}, [router, user]);

	return (
		<>
			{user ? <UserContext.Provider value={user}>{children}</UserContext.Provider> : null}
		</>
	);
};

export default UserProvider;
