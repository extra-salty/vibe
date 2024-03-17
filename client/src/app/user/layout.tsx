import { Paper } from '@mui/material';
import ThemeProvider from '@/state/Providers/ThemeProvider/ThemeProvider';
import Logo from '@/components/Logo/Logo';
import LoginFooter from '@/components/Login/LoginFooter/LoginFooter';
import './layout.scss';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main>
			<ThemeProvider themeMode='dark'>
				<div className='gradientBorder'>
					<Paper elevation={10} classes={{ root: 'paper' }}>
						<Logo />
						<div className='content'>{children}</div>
						<LoginFooter />
					</Paper>
				</div>
			</ThemeProvider>
		</main>
	);
};

export default UserLayout;
