'use client';
import { AppBar, Box, Toolbar } from '@mui/material';
import Image from 'next/image';
import UILink from '@/components/base/UILink/UILink';
import Account from './Account/Account';
import ThemeToggle from './Themes/ThemeToggle';
import Device from './Device/Device';

const Header = () => {
	return (
		<AppBar
			color='primary'
			position='static'
			sx={{
				height: '100px',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Toolbar>
				<UILink href='/'>Animations</UILink>
				<UILink href='/'>Effect</UILink>
			</Toolbar>
			<Box>
				<Image src={'/vibe.svg'} alt='vibe-logo' width={200} height={80} />
			</Box>
			<Toolbar>
				<Device />
				<ThemeToggle />
				<Account />
			</Toolbar>
		</AppBar>
	);
};

export default Header;
