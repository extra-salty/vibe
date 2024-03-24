import { useEffect, useState } from 'react';
import { useApp } from '@/state/Providers/AppProvider/useApp';
import {
	CredentialResponse,
	GoogleLogin,
	GoogleOAuthProvider,
} from '@react-oauth/google';
import { Credentials } from 'realm-web';
import { Alert, Snackbar } from '@mui/material';
import { useRoutes } from '@/state/Providers/Routes/useRoutes/useRoutes';
import CustomGoogleButton from './CustomGoogleButton';

const ExternalLoginProviders = () => {
	const app = useApp();
	const goToHome = useRoutes('home');

	const [isGoogleFailure, setGoogleFailure] = useState<boolean>(false);
	const [isGoogleLoginFailed, setGoogleLoginFailed] = useState<boolean>(false);

	const handleClose = () => setGoogleLoginFailed(false);

	const handleLogin = async (response: CredentialResponse) => {
		if (response.credential) {
			try {
				const credentials = Credentials.google({ idToken: response.credential });

				await app.logIn(credentials);
				goToHome();
			} catch (e) {
				console.log('🚀 ~ handleLogin ~ e:', e);
			}
		}
	};

	return (
		<>
			<GoogleOAuthProvider
				clientId={process.env.NEXT_PUBLIC_GOOGLE_ID}
				onScriptLoadError={() => setGoogleFailure(true)}
			>
				<Snackbar
					open={isGoogleLoginFailed}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				>
					<Alert severity='error'>Google login failed. Please try again.</Alert>
				</Snackbar>
				<GoogleLogin
					useOneTap
					onSuccess={handleLogin}
					onError={() => setGoogleLoginFailed(true)}
					theme='filled_black'
					width='350px'
				/>
				{/* <CustomGoogleButton /> */}
			</GoogleOAuthProvider>
		</>
	);
};

export default ExternalLoginProviders;
