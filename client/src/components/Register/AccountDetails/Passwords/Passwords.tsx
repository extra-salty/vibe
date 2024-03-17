import { Box } from '@mui/material';
import PasswordStrength from './PasswordStrength/PasswordStrength';
import FirstPassword from './FirstPassword/FirstPassword';
import SecondPassword from './SecondPassword/SecondPassword';
import { useState } from 'react';

const Passwords = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '5px',
			}}
		>
			<FirstPassword />
		</Box>
	);
};

export default Passwords;
