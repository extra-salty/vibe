import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { Credentials } from 'realm-web';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useApp } from '@/state/Providers/AppProvider/useApp';

const ExternalLoginProviders = () => {
	const app = useApp();
	const router = useRouter();

	const [isGoogleLoginFailed, setGoogleLoginFailed] = useState<boolean>(false);

	const handleClose = () => setGoogleLoginFailed(false);

	const handleLogin = async (response: any) => {
		const credentials = Credentials.google({ idToken: response.credential });

		try {
			await app.logIn(credentials);
			router.push('/');
		} catch {
			console.log('user log in failed');
		}
	};

	return (
		<>
			<Snackbar
				open={isGoogleLoginFailed}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert severity='error'>Google login failed. Please try again.</Alert>
			</Snackbar>
			{/* <div style={{ height: '44px' }}> */}
			<GoogleLogin
				useOneTap
				onSuccess={handleLogin}
				onError={() => setGoogleLoginFailed(true)}
				theme='filled_black'
				width='344px'
				// containerProps={{ style: { backgroundColor: 'red' } }}
			/>
			{/* </div> */}
		</>
	);
};

export default ExternalLoginProviders;
