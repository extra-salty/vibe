'use client';
import { useApp } from '@/state/Providers/AppProvider/useApp';
import { useRoutes } from '@/state/Providers/Routes/useRoutes/useRoutes';
import { Paper } from '@mui/material';
import ThemeProvider from '@/state/Providers/ThemeProvider/ThemeProvider';
import Logo from '@/components/Logo/Logo';
import LoginFooter from '@/components/Login/LoginFooter/LoginFooter';
import './layout.scss';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	const app = useApp();
	const user = app.currentUser;

	const goToHome = useRoutes('home');

	if (user) goToHome();

	return (
		<ThemeProvider themeMode='dark'>
			<main>
				<div className='gradientBorder'>
					<Paper elevation={10} classes={{ root: 'paper' }}>
						<Logo />
						<div className='content'>{children}</div>
						<LoginFooter />
					</Paper>
				</div>
			</main>
		</ThemeProvider>
	);
};

export default UserLayout;
