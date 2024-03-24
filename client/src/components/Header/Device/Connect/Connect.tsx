import { Cast, CastConnected } from '@mui/icons-material';
import { CircularProgress, IconButton, Tooltip, useTheme } from '@mui/material';

const Connect = () => {
	const isLoading = false;
	const isConnected = false;

	const theme = useTheme();

	return (
		<Tooltip title={isConnected ? 'Disconnect' : 'Connect'}>
			{isLoading ? (
				<CircularProgress size='10px' />
			) : (
				<IconButton>{isConnected ? <CastConnected /> : <Cast />}</IconButton>
			)}
		</Tooltip>
	);
};

export default Connect;
