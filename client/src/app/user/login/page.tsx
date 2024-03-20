'use client';
import { useRoutes } from '@/state/Providers/Routes/useRoutes/useRoutes';
import { Box, Button, Divider, Typography } from '@mui/material';
import ExternalLoginProviders from '@/components/Login/ExternalLoginProviders/ExternalLoginProviders';
import InternalLoginProvider from '@/components/Login/InternalLoginProvider/InternalLoginProvider';

const Login = () => {
	const goToRegister = useRoutes('register');

	return (
		<>
			<Typography variant='h4'>Log in to your account</Typography>
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

{
	/* <Snackbar
open={isGoogleFailure}
anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
<Alert severity='error'>
  Google login is unavailable. Choose a different login method.
</Alert>
			</Snackbar>
 */
}
