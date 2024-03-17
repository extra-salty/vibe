import { Box, Link as MUILink } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import Link from 'next/link';

const LoginFooter = () => {
	const githubLink = 'https://github.com/extra-salty/vibe';

	return (
		<Box
			component='footer'
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '10px',
				marginTop: '20px',
			}}
		>
			<GitHub fontSize='small' />
			<MUILink
				variant='caption'
				underline='hover'
				rel='noreferrer'
				target='_blank'
				href={githubLink}
				component={Link}
			>
				{githubLink}
			</MUILink>
		</Box>
	);
};

export default LoginFooter;
