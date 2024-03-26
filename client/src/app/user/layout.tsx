'use client';
import { useApp } from '@/misc/hooks/useApp/useApp';
import { useRoutes } from '@/misc/hooks/useRoutes/useRoutes';
import Window from '@/components/Window/Window';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	const app = useApp();
	const user = app.currentUser;

	const goToHome = useRoutes('home');

	if (user) goToHome();

	return <Window>{children}</Window>;
};

export default UserLayout;
