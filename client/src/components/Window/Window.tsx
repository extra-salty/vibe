'use client';
import { Box, Paper } from '@mui/material';
import Logo from '@/components/Logo/Logo';
import LoginFooter from '../Login/LoginFooter/LoginFooter';
import './Window.scss';

const Window = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='page'>
			<Paper elevation={10} classes={{ root: 'window' }}>
				<header>
					<Logo />
				</header>
				<Box
					component='main'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						height: '600px',
						gap: '30px',
						marginTop: '50px',
					}}
				>
					{children}
				</Box>
				<LoginFooter />
			</Paper>
		</div>
	);
};

export default Window;
