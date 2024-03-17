import { Box, Typography } from '@mui/material';
import RedirectButton from './RedirectButton/RedirectButton';
import AccountDetails from './AccountDetails/AccountDetails';

const RegisterWindow = () => {
	return (
		<>
			<Typography variant='h4'>Create a new account</Typography>
			<AccountDetails />
			<RedirectButton />
		</>
	);
};

export default RegisterWindow;
