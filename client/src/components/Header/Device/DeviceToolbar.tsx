import { Toolbar } from '@mui/material';
import Speakers from './Speakers/Speakers';
import Connect from './Connect/Connect';

const DeviceToolbar = () => {
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
			<Connect />
			<Speakers deviceConnected={false} />
		</Toolbar>
	);
};

export default DeviceToolbar;
