import { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

const EmailAddress = () => {
	const [email, setEmail] = useState<string>('');
	const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false);

	const handleEmailChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(target.value);

		if (target.validity.valid || !target.value) {
			setIsEmailInvalid(false);
		} else {
			setIsEmailInvalid(true);
		}
	};

	return (
		<TextField
			required
			type='email'
			id='email'
			label='Email Address'
			fullWidth
			value={email}
			error={isEmailInvalid}
			helperText={isEmailInvalid ? 'Invalid email address' : ' '}
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
