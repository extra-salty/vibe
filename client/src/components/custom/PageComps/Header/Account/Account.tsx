import { useState } from 'react';
import { Login, Logout } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import LoginDrawer from './LoginDrawer/LoginDrawer';

const Account = () => {
	const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState<boolean>(false);

	return (
		<div>
			<LoginDrawer open={isLoginDrawerOpen} setOpen={setIsLoginDrawerOpen} />
			<Tooltip title='Log in'>
				<IconButton onClick={() => setIsLoginDrawerOpen(true)}>
					{true ? <Login /> : <Logout />}
				</IconButton>
			</Tooltip>
		</div>
	);
};

export default Account;
