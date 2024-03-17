import { useContext } from 'react';
import { UserContext } from './UserProvider';
import { useRouter } from 'next/navigation';

export const useUser = () => {
	const router = useRouter();
	const user = useContext(UserContext);

	if (!user) {
		router.push('/login');
		throw new Error('No active user found. Redirecting to login.');
	}

	return user;
};
