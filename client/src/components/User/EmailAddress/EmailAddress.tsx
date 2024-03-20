import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const EmailAddress = ({
	errorText,
	setErrorText,
}: {
	errorText: string;
	setErrorText: Dispatch<SetStateAction<string>>;
}) => {
	const [email, setEmail] = useState<string>('');

	const handleEmailChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const address = target.value.trim();
		setEmail(address);

		if (!address || target.validity.valid) {
			setErrorText('');
		} else {
			setErrorText('Invalid email address');
		}
	};

	return (
		<TextField
			required
			fullWidth
			id='email'
			name='email'
			type='email'
			label='Email Address'
			value={email}
			error={!!email && !!errorText}
			helperText={!!errorText ? errorText : ' '}
			onChange={handleEmailChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<AccountCircle />
					</InputAdornment>
				),
			}}
		/>
	);
};

export default EmailAddress;
