import { useApp } from '@/state/Providers/AppProvider/useApp';
import { FormEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { MongoDBRealmError } from 'realm-web';
import { Alert, Box, Button, Fade, TextField } from '@mui/material';
import { RealmErrorMessages, RealmErrorCodes } from '@/types/realm.types';
import EmailAddress from '../../User/EmailAddress/EmailAddress';
import Password from '@/components/User/Password/Password';

const RegisterForm = () => {
	const app = useApp();

	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [alertText, setAlertText] = useState<string>('');

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		setLoading(true);
		event.preventDefault();

		if (!event.currentTarget.checkValidity()) {
		}

		const formData = new FormData(event.currentTarget);
		const firstPassword = formData.get('firstPassword') as string;
		const secondPassword = formData.get('secondPassword') as string;
		const email = formData.get('email') as string;

		if (firstPassword !== secondPassword) {
			setError('Passwords do not match');
			setLoading(false);
			return;
		}

		try {
			setError('');
			await app.emailPasswordAuth.registerUser({ email, password: secondPassword });

			setAlertText('Confirmation email sent to the address');
		} catch (error) {
			const e = error as MongoDBRealmError;

			switch (e?.errorCode) {
				case RealmErrorCodes.UserNotFound:
					setError(RealmErrorMessages.NotFound);
					break;
				default:
					console.log(e);
					break;
			}
		}

		setLoading(false);
	};

	return (
		<>
			<Box
				component='form'
				onSubmit={handleSubmit}
				style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
			>
				<EmailAddress errorText={error} setErrorText={setError} />
				<Password id='firstPassword' label='Password' initialError='' enableStrength />
				<Password
					id='secondPassword'
					label='Reenter Password'
					initialError=''
					enableStrength
				/>
				<Box
					sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
				>
					<LoadingButton type='submit' size='large' variant='outlined' loading={loading}>
						Create
					</LoadingButton>
				</Box>
				<Fade in={!!alertText}>
					<Alert variant='outlined'>{alertText}</Alert>
				</Fade>
			</Box>
		</>
	);
};

export default RegisterForm;

{
	/* <LoadingButton size='large' variant='text' onClick={handleResend}>
					Resend validation email
				</LoadingButton> */
}

// const handleResend = async () => {
// 	setIsLoading(true);

// 	try {
// 		await app.emailPasswordAuth.resendConfirmationEmail({
// 			email: resendEmail,
// 		});
// 		setAlertText('Confirmation email sent to the address');
// 	} catch (e) {
// 		console.log('🚀 ~ handleResend ~ e:', e);
// 		// setErrorText(e as MongoDBRealmError);
// 	}

// 	setIsLoading(false);
// };
