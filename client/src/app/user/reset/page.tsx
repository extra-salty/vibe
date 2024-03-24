'use client';
import { Typography } from '@mui/material';
import PasswordResetForm from '@/components/User/PasswordResetForm/PasswordResetForm';

const Reset = () => {
	return (
		<>
			<Typography variant='h4' alignSelf='center'>
				Reset your password
			</Typography>
			<Typography>
				To reset your password, enter your email address below and submit. An email will
				be sent to you with instructions about how to complete the process.
			</Typography>
			<PasswordResetForm />
		</>
	);
};

export default Reset;
