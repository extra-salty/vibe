'use client';
import { useRoutes } from '@/misc/hooks/useRoutes/useRoutes';
import { Box, Button, Divider, Typography } from '@mui/material';
import ExternalLoginProviders from '@/components/Login/ExternalLoginProviders/ExternalLoginProviders';
import InternalLoginProvider from '@/components/Login/InternalLoginProvider/InternalLoginProvider';

const Login = () => {
	const goToRegister = useRoutes('register');

	return (
		<>
			<Typography variant='h4' textAlign='center'>
				Log in to your account
			</Typography>
			<ExternalLoginProviders />
			<Divider>Or with email and password</Divider>
			<InternalLoginProvider />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Typography>Don`t have an account?</Typography>
				<Button onClick={goToRegister}>Sign Up</Button>
			</Box>
		</>
	);
};

export default Login;
