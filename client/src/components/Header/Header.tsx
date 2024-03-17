'use client';
import { AppBar, Box, Link, Toolbar } from '@mui/material';
import Image from 'next/image';
// import UILink from '@/components/misc/UILink/UILink';
import ThemeToggle from './ThemeToggle/ThemeToggle';
import Device from './Device/Device';
import AccountMenu from './AccountMenu/AccountMenu';

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
				<Link href='/'>Animations</Link>
				<Link href='/'>Effect</Link>
				<Link href='/'>About</Link>
			</Toolbar>
			<Box>
				<Image src={'/vibe.svg'} priority alt='vibe-logo' width={200} height={80} />
			</Box>
			<Toolbar>
				<Device />
				<ThemeToggle />
				<AccountMenu />
			</Toolbar>
		</AppBar>
	);
};

export default Header;
