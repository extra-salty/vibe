import { useApp } from '../../../misc/hooks/useApp/useApp';
import { Routes, useRoutes } from '../../../misc/hooks/useRoutes/useRoutes';
import { createContext, useEffect } from 'react';
import { User } from 'realm-web';

export const UserContext = createContext<User | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const app = useApp();
	const user = app.currentUser;

	const goToLogin = useRoutes(Routes.Login);

	useEffect(() => {
		if (!user) {
			goToLogin();
		}
	}, [goToLogin, user]);

	return (
		<>
			{user ? <UserContext.Provider value={user}>{children}</UserContext.Provider> : null}
			{/* <UserContext.Provider value={user}>{children}</UserContext.Provider> */}
		</>
	);
};

export default UserProvider;
