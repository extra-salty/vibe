import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Credentials, getApp } from 'realm-web';
import { useRouter } from 'next/navigation';
import { useApp } from '@/state/Providers/AppProvider/useApp';

const InternalLoginProvider = () => {
	const router = useRouter();
	const app = useApp();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleLogin = async () => {
		setIsLoading(true);

		const credentials = Credentials.emailPassword('', '');

		try {
			await app.logIn(credentials);
			router.push('/');
		} catch {
			console.log('user log in failed');
		} finally {
			setIsLoading(false);
		}
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
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
