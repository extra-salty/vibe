import { Facebook, Google } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const ExternalLoginProviders = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleLogin = async () => {
		setIsLoading(true);

		try {
			await signIn('google');
		} catch (e) {
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<LoadingButton
				variant='contained'
				loading={isLoading}
				startIcon={<Google />}
				onClick={handleLogin}
			>
				Google
			</LoadingButton>
			<LoadingButton variant='contained' startIcon={<Facebook />}>
				Facebook
			</LoadingButton>
		</>
	);
};

export default ExternalLoginProviders;
