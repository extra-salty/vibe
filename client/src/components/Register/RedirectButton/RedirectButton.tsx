import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const RedirectButton = () => {
	const router = useRouter();

	const handleBackRedirect = () => router.push('/user/login');

	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
			<Typography>Already have an account?</Typography>
			<Button onClick={handleBackRedirect}>Back to login</Button>
		</Box>
	);
};

export default RedirectButton;
