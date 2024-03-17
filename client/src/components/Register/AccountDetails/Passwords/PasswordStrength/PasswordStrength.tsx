import usePasswordStrength from './usePasswordStrength';
import { Dispatch, SetStateAction } from 'react';
import { Box, Popover, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import PasswordHint from './PasswordHint/PasswordHint';
import PasswordRequirements from './PasswordRequirements/PasswordRequirements';

const PasswordStrength = ({
	anchorEl,
	password,
	setPasswordInvalid,
}: {
	anchorEl: Element | null;
	password: string;
	setPasswordInvalid: Dispatch<SetStateAction<boolean>>;
}) => {
	const open = Boolean(anchorEl);
	const id = open ? 'password strength' : undefined;

	const { result, resultDetail } = usePasswordStrength(password);
	const value = 20 + (result?.score || 0) * 20;

	return (
		<Popover
			elevation={15}
			id={id}
			open={open}
			disableAutoFocus={true}
			disableEnforceFocus={true}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			slotProps={{ paper: { style: { width: '320px', padding: '10px' } } }}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
				<LinearProgress variant='determinate' color={resultDetail.color} value={value} />
				<Typography>Strength: {resultDetail.text}</Typography>
				<PasswordRequirements
					password={password}
					setPasswordInvalid={setPasswordInvalid}
				/>
				{result && <PasswordHint password={password} result={result} />}
			</Box>
		</Popover>
	);
};

export default PasswordStrength;
