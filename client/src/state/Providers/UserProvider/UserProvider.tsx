import { useApp } from '../AppProvider/useApp';
import { createContext, useEffect } from 'react';
import { User } from 'realm-web';
import { useRoutes } from '../Routes/useRoutes/useRoutes';

export const UserContext = createContext<User | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const goToLogin = useRoutes('login');

	const app = useApp();
	const user = app.currentUser;

	useEffect(() => {
		if (!user) {
			goToLogin();
		}
	}, [goToLogin, user]);

	return (
		<>
			{user ? <UserContext.Provider value={user}>{children}</UserContext.Provider> : null}
		</>
	);
};

export default UserProvider;
