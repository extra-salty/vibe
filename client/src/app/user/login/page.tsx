'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getApp } from 'realm-web';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Alert, Snackbar } from '@mui/material';
import LoginWindow from '@/components/Login/LoginWindow';

const Login = () => {
	const router = useRouter();

	const [isGoogleFailure, setGoogleFailure] = useState<boolean>(false);

	const app = getApp(process.env.NEXT_PUBLIC_APP_ID);
	const user = app.currentUser;

	if (user) {
		router.push('/');
	}

	return (
		<GoogleOAuthProvider
			clientId={process.env.NEXT_PUBLIC_GOOGLE_ID}
			onScriptLoadError={() => setGoogleFailure(true)}
		>
			<LoginWindow />
			<Snackbar
				open={isGoogleFailure}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert severity='error'>
					Google login is unavailable. Choose a different login method.
				</Alert>
			</Snackbar>
		</GoogleOAuthProvider>
	);
};

export default Login;
