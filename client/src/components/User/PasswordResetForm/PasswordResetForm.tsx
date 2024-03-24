import { useApp } from '@/state/Providers/AppProvider/useApp';
import { FormEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Box, Fade } from '@mui/material';
import { MongoDBRealmError } from 'realm-web';
import { RealmErrorMessages, RealmErrorCodes } from '@/types/realm.types';
import EmailAddress from '@/components/User/EmailAddress/EmailAddress';

const PasswordResetForm = () => {
	const app = useApp();

	const [errorText, setErrorText] = useState<string>(' ');
	const [loading, setLoading] = useState<boolean>(false);
	const [alert, setAlert] = useState<boolean>(false);

	const handleReset = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		const formData = new FormData(event.currentTarget);
		const email = formData.get('email') as string;

		try {
			await app.emailPasswordAuth.sendResetPasswordEmail({ email });

			setAlert(true);
		} catch (error) {
			setAlert(false);

			const e = error as MongoDBRealmError;

			switch (e?.errorCode) {
				case RealmErrorCodes.UserNotFound:
					setErrorText(RealmErrorMessages.NotFound);
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
			onSubmit={handleReset}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '15px',
			}}
		>
			<EmailAddress initialError={errorText} />
			<Box
				sx={{
					marginInline: 'auto',
				}}
			>
				<LoadingButton
					type='submit'
					variant='outlined'
					size='large'
					fullWidth={false}
					loading={loading}
					sx={{ width: 'auto' }}
				>
					Reset Password
				</LoadingButton>
			</Box>
			<Fade in={alert}>
				<Alert variant='outlined'>
					<AlertTitle>Password reset email sent successfully</AlertTitle>
					To be able to log in create a new password by following the link from the email.
				</Alert>
			</Fade>
		</Box>
	);
};

export default PasswordResetForm;
