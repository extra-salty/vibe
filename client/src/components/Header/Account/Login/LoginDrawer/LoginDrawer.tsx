import { Dispatch, SetStateAction } from 'react';
import { Box, Divider, Drawer, Typography } from '@mui/material';
import Image from 'next/image';
import ExternalLoginProviders from './ExternalLoginProviders/ExternalLoginProviders';
import InternalLoginProvider from './InternalLoginProvider/InternalLoginProvider';
import AccountCreator from './AccountCreator/AccountCreator';

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
			<Image src={'/vibe.svg'} priority alt='vibe-logo' width={200} height={80} />
			<Box
				sx={{ display: 'flex', flexDirection: 'column', gap: '25px', marginTop: '30px' }}
			>
				<Typography variant='h4'>Log in to your account</Typography>
				<ExternalLoginProviders />
				<Divider>Or with email and password</Divider>
				<InternalLoginProvider setOpen={setOpen} />
				<AccountCreator />
			</Box>
		</Drawer>
	);
};

export default LoginDrawer;
