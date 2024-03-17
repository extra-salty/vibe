import { useApp } from '@/state/Providers/AppProvider/useApp';
import { FormEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { getApp } from 'realm-web';
import EmailAddress from './EmailAddress/EmailAddress';
import Passwords from './Passwords/Passwords';
import { Box } from '@mui/material';

const AccountDetails = () => {
	const app = useApp();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('🚀 ~ handleCreate ~ event:', event);

		const formData = new FormData(event.currentTarget);
		const email = formData.get('email') as string;
		const password = formData.get('secondPassword') as string;

		setIsLoading(true);

		// await app.emailPasswordAuth.registerUser({ email, password });

		try {
		} catch {
			console.log('user log in failed');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<form
				onSubmit={handleCreate}
				// autoComplete="off"
			>
				<EmailAddress />
				<Passwords />
				<Box
					sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
				>
					<LoadingButton
						type='submit'
						size='large'
						variant='outlined'
						loading={isLoading}
					>
						Create
					</LoadingButton>
					<LoadingButton type='submit' size='large' variant='text' loading={isLoading}>
						Resend validation email
					</LoadingButton>
				</Box>
			</form>
		</>
	);
};

export default AccountDetails;
