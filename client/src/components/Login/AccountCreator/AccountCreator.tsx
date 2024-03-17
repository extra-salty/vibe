import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const AccountCreator = () => {
	const router = useRouter();

	const handleSignUpRedirect = () => router.push('/user/register');

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Typography>Don`t have an account?</Typography>
			<Button onClick={handleSignUpRedirect}>Sign Up</Button>
		</Box>
	);
};

export default AccountCreator;
