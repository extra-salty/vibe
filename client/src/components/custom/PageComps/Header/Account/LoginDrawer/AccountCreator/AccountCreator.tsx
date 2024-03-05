import { Box, Button, Typography } from '@mui/material';

const AccountCreator = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginTop: '20px',
			}}
		>
			<Typography>Don`t have an account?</Typography>
			<Button>Sign Up</Button>
		</Box>
	);
};

export default AccountCreator;
