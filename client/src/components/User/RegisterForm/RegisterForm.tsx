import { useApp } from '@/misc/hooks/useApp/useApp';
import { FormEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { MongoDBRealmError } from 'realm-web';
import { Alert, AlertTitle, Box, Fade } from '@mui/material';
import { RealmErrorMessages, RealmErrorCodes } from '@/types/realm.types';
import EmailAddress from '../EmailAddress/EmailAddress';
import Password from '@/components/User/Password/Password';

const RegisterForm = () => {
	const app = useApp();

	const [emailError, setEmailError] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [alert, setAlert] = useState<boolean>(false);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		setPasswordError('');
		setEmailError('');
		setAlert(false);

		const formData = new FormData(event.currentTarget);
		const firstPassword = formData.get('firstPassword') as string;
		const secondPassword = formData.get('secondPassword') as string;
		const email = formData.get('email') as string;

		if (firstPassword !== secondPassword) {
			setPasswordError('Passwords do not match');
		} else {
			try {
				await app.emailPasswordAuth.registerUser({ email, password: secondPassword });

				setAlert(true);
				setPasswordError('');
			} catch (error) {
				const e = error as MongoDBRealmError;

				switch (e?.errorCode) {
					case RealmErrorCodes.AccountNameInUse:
						setEmailError(RealmErrorMessages.InUse);
						break;
					default:
						console.log(e);
						break;
				}
			}
		}

		setLoading(false);
	};

	return (
		<Box
			component='form'
			autoComplete='off'
			onSubmit={handleSubmit}
			style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
		>
			<EmailAddress initialError={emailError} />
			<Password id='firstPassword' label='Password' enableStrength />
			<Password
				id='secondPassword'
				label='Reenter Password'
				initialError={passwordError}
				enableStrength
			/>
			<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
				<LoadingButton
					type='submit'
					size='large'
					variant='outlined'
					fullWidth={false}
					loading={loading}
					sx={{ marginInline: 'auto' }}
				>
					Create
				</LoadingButton>
			</Box>
			<Fade in={alert}>
				<Alert variant='outlined'>
					<AlertTitle>Confirmation email sent successfully</AlertTitle>
					To be able to log in verify your account by following the link from the email.
				</Alert>
			</Fade>
		</Box>
	);
};

export default RegisterForm;
