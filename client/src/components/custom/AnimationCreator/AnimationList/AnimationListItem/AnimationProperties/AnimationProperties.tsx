import { Box, Divider, Typography } from '@mui/material';

function AnimationProperties({}: {}) {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				border: '1px solid',
				borderColor: 'divider',
				borderRadius: 2,
				bgcolor: 'background.paper',
				color: 'text.secondary',
				'& svg': {
					m: 1,
				},
			}}
		>
			<Typography margin={2}>0</Typography>
			<Divider orientation='vertical' variant='middle' flexItem />
			<Typography margin={2}>0</Typography>
			<Divider orientation='vertical' variant='middle' flexItem />
			<Typography margin={2}>0</Typography>
		</Box>
	);
}

export default AnimationProperties;
