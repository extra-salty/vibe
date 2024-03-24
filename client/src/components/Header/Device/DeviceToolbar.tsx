import { Box, Toolbar, Typography, Divider } from '@mui/material';
import Speakers from './Speakers/Speakers';
import Connect from './Connect/Connect';
import { Construction } from '@mui/icons-material';

const DeviceToolbar = () => {
	return (
		<Toolbar
			sx={{
				position: 'absolute',
				left: '25px',
			}}
			disableGutters
		>
			<Connect />
			<Divider />
			<Speakers deviceConnected={false} />
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: '10px',
					marginRight: '5px',
				}}
			>
				<Typography color='warning.main'>Website under construction</Typography>
				<Construction color='warning' />
			</Box>
		</Toolbar>
	);
};

export default DeviceToolbar;
