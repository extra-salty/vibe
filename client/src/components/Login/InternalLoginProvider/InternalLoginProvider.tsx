import { useRoutes } from '@/state/Providers/Routes/useRoutes/useRoutes';
import { useApp } from '@/state/Providers/AppProvider/useApp';
import { FormEvent, useState } from 'react';
import { RealmErrorMessages, RealmErrorCodes } from '@/types/realm.types';
import { Credentials, MongoDBRealmError } from 'realm-web';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import Password from '@/components/User/Password/Password';
import EmailAddress from '@/components/User/EmailAddress/EmailAddress';

const InternalLoginProvider = () => {
	const app = useApp();

	const [email, setEmail] = useState<string>('');
	const [errorText, setErrorText] = useState<string>(' ');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const goToReset = useRoutes('reset', { email: email });
	const goToHome = useRoutes('home');

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		setErrorText(' ');

		try {
			const credentials = Credentials.emailPassword(email, password);
			await app.logIn(credentials);
			goToHome();
		} catch (error) {
			const e = error as MongoDBRealmError;

			switch (e?.errorCode) {
				case RealmErrorCodes.InvalidPassword:
					setErrorText(RealmErrorMessages.Invalid);
					break;
				default:
					console.log(e);
					break;
			}
		}

		setLoading(false);
	};

	return (
		<Box
			component='form'
			onSubmit={handleLogin}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '15px',
			}}
		>
			<EmailAddress
				email={email}
				setEmail={setEmail}
				errorText={errorText}
				setErrorText={setErrorText}
			/>
			<Password
				id='password'
				label='Password'
				password={password}
				setPassword={setPassword}
			/>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<LoadingButton type='submit' size='large' variant='outlined' loading={loading}>
					LOGIN
				</LoadingButton>
				<Button onClick={goToReset}>Forgot Password?</Button>
			</Box>
		</Box>
	);
};

export default InternalLoginProvider;
