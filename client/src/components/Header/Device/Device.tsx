import { Cast, CastConnected, VolumeOff, VolumeUp } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, Tooltip } from '@mui/material';
import Speakers from './Speakers/Speakers';

const Device = () => {
	const isLoading = false;
	const isConnected = false;

	return (
		<Box sx={{ display: 'flex' }}>
			<Tooltip title={isConnected ? 'Disconnect' : 'Connect'}>
				{isLoading ? (
					<CircularProgress size='10px' />
				) : (
					<IconButton>
						{isConnected ? <CastConnected color='success' /> : <Cast />}
					</IconButton>
				)}
			</Tooltip>
			<Speakers deviceConnected={isConnected} />
		</Box>
	);
};

export default Device;

{
	/* <LoadingButton
				variant='text'
				size='large'
				loading={isLoading}
				startIcon={isConnected ? <CastConnected /> : <Cast />}
			></LoadingButton> */
}
