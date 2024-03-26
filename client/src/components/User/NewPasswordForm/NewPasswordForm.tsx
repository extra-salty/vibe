import { useApp } from '@/misc/hooks/useApp/useApp';
import { RealmErrorCodes, RealmErrorMessages } from '@/types/realm.types';
import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Box, Fade } from '@mui/material';
import { FormEvent, useState } from 'react';
import { MongoDBRealmError } from 'realm-web';
import Password from '../Password/Password';

export const NewPasswordForm = ({
	token,
	tokenId,
}: {
	token: string;
	tokenId: string;
}) => {
	const app = useApp();

	const [loading, setLoading] = useState<boolean>(false);
	const [alert, setAlert] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const handleSubmit = async (event: FormEvent<HTMLFormElement> | any) => {
		event.preventDefault();
		setLoading(true);
		setError('');

		const formData = new FormData(event.target);
		const firstPassword = formData.get('firstPassword') as string;
		const secondPassword = formData.get('secondPassword') as string;

		if (firstPassword !== secondPassword) {
			setError('Passwords do not match');
		} else {
			try {
				await app.emailPasswordAuth.resetPassword({
					password: secondPassword,
					token,
					tokenId,
				});

				setAlert(true);
			} catch (error) {
				setAlert(false);

				const e = error as MongoDBRealmError;

				switch (e?.errorCode) {
					case RealmErrorCodes.UserNotFound:
						// setErrorText(RealmErrorMessages.NotFound);
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
			onSubmit={handleSubmit}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '25px',
			}}
		>
			<Password id='firstPassword' label='New password' enableStrength />
			<Password
				id='secondPassword'
				label='Reenter new password'
				initialError={error}
				enableStrength
			/>
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
					<AlertTitle>Password successfully updated.</AlertTitle>
					Go back to the log in page to access your account.
				</Alert>
			</Fade>
		</Box>
	);
};
