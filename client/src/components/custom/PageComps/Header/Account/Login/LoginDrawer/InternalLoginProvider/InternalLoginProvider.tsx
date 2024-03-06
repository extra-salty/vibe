import { Dispatch, SetStateAction, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const InternalLoginProvider = ({
	setOpen,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleLogin = async () => {
		setIsLoading(true);

		if (false) {
			setOpen(false);
		}

		setIsLoading(false);
	};

	return (
		<>
			<TextField type='email' required id='email' label='Email Address' />
			<TextField
				required
				id='password'
				label='Password'
				type={showPassword ? 'text' : 'password'}
				InputProps={{
					endAdornment: (
						<IconButton
							aria-label='toggle password visibility'
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge='end'
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					),
				}}
			/>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
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
		</>
	);
};

export default InternalLoginProvider;
