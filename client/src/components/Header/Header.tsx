'use client';
import { AppBar, Box } from '@mui/material';
import DeviceToolbar from './Device/DeviceToolbar';
import AppToolbar from './AppToolbar/AppToolbar';
import Logo from '../Logo/Logo';

const Header = () => {
	return (
		<AppBar
			elevation={10}
			sx={{
				height: '100px',
				position: 'relative',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
			}}
		>
			<DeviceToolbar />
			<Box
				sx={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			>
				<Logo />
			</Box>
			<AppToolbar />
		</AppBar>
	);
};

export default Header;
