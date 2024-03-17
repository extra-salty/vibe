import { Divider, Typography } from '@mui/material';
import AccountCreator from '@/components/Login/AccountCreator/AccountCreator';
import ExternalLoginProviders from './ExternalLoginProviders/ExternalLoginProviders';
import InternalLoginProvider from '@/components/Login/InternalLoginProvider/InternalLoginProvider';

const LoginWindow = () => {
	return (
		<>
			<Typography variant='h4'>Log in to your account</Typography>
			<ExternalLoginProviders />
			<Divider>Or with email and password</Divider>
			<InternalLoginProvider />
			<AccountCreator />
		</>
	);
};

export default LoginWindow;
