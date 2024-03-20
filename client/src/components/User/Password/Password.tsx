import { useState, ClipboardEvent } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { FocusEvent } from 'react';
import PasswordStrength from '@/components/Register/AccountDetails/Passwords/PasswordStrength/PasswordStrength';

const Password = ({
	id,
	label,
	initialError,
	enableStrength = false,
}: {
	id: string;
	label: string;
	initialError: string;
	enableStrength: boolean;
}) => {
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>(initialError);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);

	const handlePasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const password = target.value.trim();
		setPassword(password);
		setError('');
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handlePreventDefault = (event: ClipboardEvent<HTMLInputElement>) =>
		event.preventDefault();

	const handleOnBlur = () => setAnchorEl(null);

	const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
		setAnchorEl(event.target);
	};

	const showError = !!password && !!error;

	return (
		<>
			<TextField
				required
				fullWidth
				id={id}
				name={id}
				label={label}
				value={password}
				error={showError}
				helperText={showError ? error : ' '}
				type={showPassword ? 'text' : 'password'}
				autoComplete='current-password'
				inputProps={{
					pattern: '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}',
				}}
				onChange={handlePasswordChange}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				onCopy={handlePreventDefault}
				onPaste={handlePreventDefault}
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
			{enableStrength && (
				<PasswordStrength anchorEl={anchorEl} password={password} setError={setError} />
			)}
		</>
	);
};

export default Password;
