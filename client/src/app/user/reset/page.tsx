'use client';
import { useSearchParams } from 'next/navigation';
import { Typography } from '@mui/material';
import ResetForm from '@/components/User/ResetForm/ResetForm';

const Reset = () => {
	const searchParams = useSearchParams();
	const email = searchParams.get('email') || '';

	return (
		<>
			<Typography variant='h4'>Reset your password</Typography>
			<Typography>
				To reset your password, enter your email below and submit. An email will be sent
				to you with instructions about how to complete the process.
			</Typography>
			<ResetForm initialEmail={email} />
		</>
	);
};

export default Reset;
