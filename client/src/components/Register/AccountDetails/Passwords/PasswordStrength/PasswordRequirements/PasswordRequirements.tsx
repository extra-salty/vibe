import { Dispatch, SetStateAction, useEffect } from 'react';
import { Cancel, Check } from '@mui/icons-material';
import {
	Box,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';

const PasswordRequirements = ({
	password,
	setPasswordInvalid,
}: {
	password: string;
	setPasswordInvalid: Dispatch<SetStateAction<boolean>>;
}) => {
	const validations: Array<{ regex: RegExp; text: string }> = [
		{
			regex: /(?=.{8,})/,
			text: 'At least 8 characters.',
		},
		{
			regex: /(?=.*?[0-9])/,
			text: 'A number.',
		},
		{
			regex: /(?=.*?[A-Z])/,
			text: 'An uppercase letter.',
		},
		{
			regex: /(?=.*?[a-z])/,
			text: 'A lowercase letter.',
		},
		{
			regex: /(?=.*?[#?!@$ %^&*-])/,
			text: 'A special character.',
		},
	];

	let invalid = false;

	useEffect(() => {
		console.log(invalid);
		setPasswordInvalid(invalid);
	}, [invalid, setPasswordInvalid]);

	return (
		<Box>
			<Typography>The password must contain:</Typography>
			<List disablePadding dense>
				{validations.map((validation, i) => {
					const valid = new RegExp(validation.regex).test(password);

					if (!valid) {
						invalid = true;
					}

					return (
						<ListItem key={i} dense>
							<ListItemIcon sx={{ minWidth: '0', paddingRight: '16px' }}>
								{valid ? (
									<Check fontSize='small' color='success' />
								) : (
									<Cancel fontSize='small' color='error' />
								)}
							</ListItemIcon>
							<ListItemText>{validation.text}</ListItemText>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
};

export default PasswordRequirements;
