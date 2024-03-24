import { Box, Toolbar } from '@mui/material';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import AccountMenu from '../AccountMenu/AccountMenu';
import GitHub from '../GitHub/GitHub';

const AppToolbar = () => {
	return (
		<Toolbar
			sx={{
				display: 'flex',
				// backgroundColor: 'gray',
				borderRadius: '64px',
				border: '2px solid white',
				boxSizing: 'border-box',
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
