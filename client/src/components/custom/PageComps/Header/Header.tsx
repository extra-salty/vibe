import Image from 'next/image';
import UILink from '@/components/base/UILink/UILink';
import { AppBar, Box, Container, Toolbar } from '@mui/material';

const Header = () => {
	return (
		<AppBar position='static' enableColorOnDark={true}>
			<Container sx={{ display: 'flex', justifyContent: 'space-around' }}>
				<Toolbar>
					<UILink href='/'>Animations</UILink>
					<UILink href='/'>Effect</UILink>
				</Toolbar>
				<Box>
					<Image src={'/vibe.svg'} alt='vibe-logo' width={200} height={80} />
				</Box>
				<Toolbar>Asd</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;
