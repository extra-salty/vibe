import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';

const SecondPassword = ({
	firstPasswordInvalid,
	firstPassword,
}: {
	firstPassword: string;
	firstPasswordInvalid: boolean;
}) => {
	const [password, setPassword] = useState<string>('');
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const helperTextVisible = !!firstPassword && !firstPasswordInvalid && !passwordsMatch;

	const handleSecondPasswordChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		const password = target.value;
		setPassword(password);

		const passwordsMatch = firstPassword === password;
		setPasswordsMatch(passwordsMatch);
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	return (
		<TextField
			required
			id='secondPassword'
			label='Password'
			value={password}
			error={helperTextVisible}
			type={showPassword ? 'text' : 'password'}
			helperText={helperTextVisible ? 'Must match with the first password' : ' '}
			onChange={handleSecondPasswordChange}
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
