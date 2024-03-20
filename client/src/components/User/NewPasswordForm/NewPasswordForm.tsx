import { useApp } from '@/state/Providers/AppProvider/useApp';
import { RealmErrorCodes, RealmErrorMessages } from '@/types/realm.types';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Fade } from '@mui/material';
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
		setLoading(true);
		setError('');
		event.preventDefault();

		const formData = new FormData(event.target);
		const firstPassword = formData.get('firstPassword') as string;
		const secondPassword = formData.get('secondPassword') as string;

		if (firstPassword !== secondPassword) {
			setError('Passwords do not match');
			setLoading(false);
			return;
		}

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
			<Password id='firstPassword' label='Password' initialError={error} enableStrength />
			<Password
				id='secondPassword'
				label='Reenter Password'
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
				<Alert variant='outlined'>Password successfully updated.</Alert>
			</Fade>
		</Box>
	);
};
