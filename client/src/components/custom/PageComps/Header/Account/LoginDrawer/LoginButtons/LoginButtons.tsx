import { Dispatch, SetStateAction, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';

const LoginButtons = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleLogin = () => {
		setIsLoading(true);

		if (false) {
			setOpen(false);
		}

		setIsLoading(false);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginTop: '20px',
			}}
		>
			<LoadingButton
				size='large'
				variant='outlined'
				loading={isLoading}
				sx={{ paddingInline: '20px' }}
				onClick={handleLogin}
			>
				LOGIN
			</LoadingButton>
			<Button>Forgot Password?</Button>
		</Box>
	);
};

export default LoginButtons;
