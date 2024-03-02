import { Dispatch, SetStateAction } from 'react';
import { Box, Button, Drawer, Typography } from '@mui/material';
import Image from 'next/image';
import LoginInputs from './LoginInputs/LoginInputs';
import LoginButtons from './LoginButtons/LoginButtons';

const LoginDrawer = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<Drawer
			anchor='right'
			open={open}
			onClose={() => setOpen(false)}
			PaperProps={{
				sx: {
					width: '350px',
					padding: '50px',
				},
			}}
		>
			<Image src={'/vibe.svg'} alt='vibe-logo' width={200} height={80} />
			<LoginInputs />
			<LoginButtons setOpen={setOpen} />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: '20px',
				}}
			>
				<Typography>Don`t have an account?</Typography>
				<Button>Sign Up</Button>
			</Box>
		</Drawer>
	);
};

export default LoginDrawer;

// Appbar z index above side bar
