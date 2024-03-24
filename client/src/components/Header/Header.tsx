'use client';
import { AppBar } from '@mui/material';
import DeviceToolbar from './Device/DeviceToolbar';
import AppToolbar from './AppToolbar/AppToolbar';
import Logo from '../Logo/Logo';

const Header = () => {
	return (
		<AppBar
			color='primary'
			enableColorOnDark={false}
			position='static'
			sx={{
				height: '100px',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingInline: '25px',
			}}
		>
			<DeviceToolbar />
			<Logo />
			<AppToolbar />
		</AppBar>
	);
};

export default Header;
