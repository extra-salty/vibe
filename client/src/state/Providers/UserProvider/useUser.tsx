import { useContext } from 'react';
import { UserContext } from './UserProvider';
import { useRoutes } from '../Routes/useRoutes/useRoutes';

export const useUser = () => {
	const user = useContext(UserContext);

	const goToLogin = useRoutes('login');

	if (!user) {
		goToLogin();
		throw new Error('No active user found. Redirecting to login.');
	}

	return user;
};
