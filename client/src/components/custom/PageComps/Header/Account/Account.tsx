import { Login, Logout } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const Account = () => {
	return (
		<div>
			<IconButton sx={{ ml: 1 }}>{true ? <Login /> : <Logout />}</IconButton>
		</div>
	);
};

export default Account;
