import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import LoginDrawer from './LoginDrawer/LoginDrawer';

const Login = () => {
	const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState<boolean>(false);

	return (
		<>
			<LoginDrawer open={isLoginDrawerOpen} setOpen={setIsLoginDrawerOpen} />
			<Tooltip title='Log in'>
				<IconButton onClick={() => setIsLoginDrawerOpen(true)}>
					<LoginIcon />
				</IconButton>
			</Tooltip>
		</>
	);
};

export default Login;
