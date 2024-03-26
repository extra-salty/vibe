'use client';
import { Typography } from '@mui/material';
import ConfirmResult from '../../../components/User/ConfirmResult/ConfirmResult';

const Confirm = () => {
	return (
		<>
			<Typography variant='h4' textAlign='center'>
				User account confirmation
			</Typography>
			<ConfirmResult />
		</>
	);
};

export default Confirm;
