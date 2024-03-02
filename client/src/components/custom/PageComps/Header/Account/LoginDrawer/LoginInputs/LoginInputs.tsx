import { Facebook, Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const LoginInputs = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<Box
			sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}
		>
			<Typography variant='h4'>Log in to your account</Typography>
			<Button variant='contained' startIcon={<Google />}>
				Google
			</Button>
			<Button variant='contained' startIcon={<Facebook />}>
				Facebook
			</Button>
			<Divider>Or with email and password</Divider>
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
		</Box>
	);
};

export default LoginInputs;
