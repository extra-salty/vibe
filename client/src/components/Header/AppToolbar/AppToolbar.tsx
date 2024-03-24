import { Box, Toolbar } from '@mui/material';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import AccountMenu from '../AccountMenu/AccountMenu';
import GitHub from '../GitHub/GitHub';

const AppToolbar = () => {
	return (
		<Toolbar
			sx={{
				position: 'absolute',
				right: '25px',
			}}
			disableGutters
		>
			<Box sx={{ display: 'flex', alignItems: 'center', paddingInline: '12px' }}>
				<ThemeToggle />
				<GitHub />
			</Box>
			<AccountMenu />
		</Toolbar>
	);
};

export default AppToolbar;
