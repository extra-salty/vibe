import { useState, ClipboardEvent } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';

const SecondPassword = ({ firstPassword }: { firstPassword: string }) => {
	const [password, setPassword] = useState<string>('password123A@');
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(
		firstPassword === password,
	);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const invalid = !!firstPassword && !passwordsMatch;

	const handleSecondPasswordChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		const password = target.value.trim();
		setPassword(password);

		const passwordsMatch = firstPassword === password;
		setPasswordsMatch(passwordsMatch);
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handlePreventDefault = (event: ClipboardEvent<HTMLInputElement>) => {
		event.preventDefault();
	};

	return (
		<TextField
			required
			id='secondPassword'
			name='secondPassword'
			label='Reenter password'
			autoComplete='current-password'
			value={password}
			error={invalid}
			type={showPassword ? 'text' : 'password'}
			helperText={invalid ? 'Passwords do not match' : ' '}
			onChange={handleSecondPasswordChange}
			onCopy={handlePreventDefault}
			onPaste={handlePreventDefault}
			InputProps={{
				endAdornment: (
					<IconButton
						aria-label='toggle password visibility'
						onClick={handleClickShowPassword}
						edge='end'
					>
						{showPassword ? <VisibilityOff /> : <Visibility />}
					</IconButton>
				),
			}}
		/>
	);
};

export default SecondPassword;
