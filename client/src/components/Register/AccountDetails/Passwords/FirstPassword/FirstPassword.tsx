import { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SecondPassword from '../SecondPassword/SecondPassword';
import PasswordStrength from '../PasswordStrength/PasswordStrength';

const FirstPassword = () => {
	const [password, setPassword] = useState<string>('');
	const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);
	console.log('🚀 ~ FirstPassword ~ passwordInvalid:', passwordInvalid);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);

	const handleOnFocus = (event: any) => {
		setAnchorEl(event.target);
	};

	const handleOnBlur = () => setAnchorEl(null);

	const handlePasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const password = target.value.trim();
		setPassword(password);
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	return (
		<>
			<TextField
				required
				id='firstPassword'
				label='Password'
				autoComplete='current-password'
				value={password}
				error={passwordInvalid}
				type={showPassword ? 'text' : 'password'}
				helperText={passwordInvalid ? 'Password is invalid' : ' '}
				onChange={handlePasswordChange}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				InputProps={{
					endAdornment: (
						<>
							<IconButton
								aria-label='toggle password visibility'
								onClick={handleClickShowPassword}
								edge='end'
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</>
					),
				}}
			/>
			<PasswordStrength
				password={password}
				anchorEl={anchorEl}
				setPasswordInvalid={setPasswordInvalid}
			/>
			<SecondPassword firstPassword={password} firstPasswordInvalid={passwordInvalid} />
		</>
	);
};

export default FirstPassword;
