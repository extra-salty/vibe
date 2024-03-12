import { CredentialResponse } from 'google-one-tap';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { App, Credentials, User } from 'realm-web';

export const UserContext = createContext<{
	user: User | null;
	actions: {
		logout: () => void;
		login: (response: CredentialResponse) => void;
		delete: () => void;
	};
}>({
	user: null,
	actions: { logout: () => {}, login: () => {}, delete: () => {} },
});

const UserProvider = ({ app, children }: { app: App; children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(app.currentUser);
	const firstLoginRef = useRef(true);

	const handleLogin = useCallback(
		async (response: any) => {
			const credentials = Credentials.google({ idToken: response.credential });

			try {
				const loggedInUser = await app.logIn(credentials);
				setUser(loggedInUser);
			} catch {
				console.log('user log in failed');
			}
		},
		[app],
	);

	const handleLogout = async () => {
		try {
			await user?.logOut();

			setUser(null);
		} catch {}
	};

	const handleDelete = async () => {
		if (app.currentUser) {
			try {
				await app.deleteUser(app.currentUser);

				setUser(null);
			} catch {
				console.log('user deletion failed');
			}
		}
	};

	const value = {
		user: user,
		actions: {
			login: handleLogin,
			logout: handleLogout,
			delete: handleDelete,
		},
	};

	useEffect(() => {
		// console.log('🚀 ~ useEffect ~ !user?.isLoggedIn :', !user?.isLoggedIn);
		// console.log('🚀 ~ useEffect ~ firstLoginRef.current:', firstLoginRef.current);
		if (!user?.isLoggedIn && firstLoginRef.current) {
			console.log('if');
			google.accounts.id.initialize({
				client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
				callback: handleLogin,
			});

			google.accounts.id.prompt();

			firstLoginRef.current = false;
		}
	}, [handleLogin, user]);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
