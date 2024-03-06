'use client';
import { AppBar, Box, Toolbar } from '@mui/material';
import Image from 'next/image';
import UILink from '@/components/misc/UILink/UILink';
import ThemeToggle from './Themes/ThemeToggle';
import Device from './Device/Device';
import Account from './Account/Account';

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
			<Toolbar sx={{ display: 'flex', gap: '10px' }}>
				<UILink href='/'>Animations</UILink>
				<UILink href='/'>Effect</UILink>
				<UILink href='/'>About</UILink>
			</Toolbar>
			<Box>
				<Image src={'/vibe.svg'} priority alt='vibe-logo' width={200} height={80} />
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
