import { Cast, CastConnected } from '@mui/icons-material';
import { CircularProgress, IconButton, Tooltip, useTheme } from '@mui/material';

const Connect = () => {
	const isLoading = false;
	const isConnected = false;

	const theme = useTheme();

	return (
		<Tooltip
			title={isConnected ? 'Disconnect' : 'Connect'}
			sx={{
				borderRadius: '64px',
				padding: '18px',
				border: '2px solid white',
				margin: '-2px',
			}}
		>
			{isLoading ? (
				<CircularProgress size='10px' />
			) : (
				<IconButton>{isConnected ? <CastConnected /> : <Cast />}</IconButton>
			)}
		</Tooltip>
	);
};

export default Connect;
