'use client';
import { useRoutes } from '@/state/Providers/Routes/useRoutes/useRoutes';
import { usePathname } from 'next/navigation';
import { Box, Link as MUILink, Tooltip } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { Button } from '@mui/material';
import Link from 'next/link';

const LoginFooter = () => {
	const githubLink = process.env.NEXT_PUBLIC_GITHUB_LINK;
	const isLoginPage = usePathname().split('/').pop() === 'login';

	const goToLogin = useRoutes('login');

	return (
		<Box
			sx={{
				height: '75px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: isLoginPage ? 'flex-end' : 'space-between',
			}}
		>
			{!isLoginPage && (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button size='large' fullWidth={false} onClick={goToLogin}>
						Log In
					</Button>
				</Box>
			)}
			<Box component='footer'>
				<Tooltip title='Repository'>
					<MUILink
						variant='caption'
						underline='hover'
						rel='noreferrer'
						target='_blank'
						href={githubLink}
						component={Link}
						sx={{
							display: 'flex',
							gap: '10px',
						}}
					>
						<GitHub fontSize='small' />
						{githubLink}
					</MUILink>
				</Tooltip>
			</Box>
		</Box>
	);
};

export default LoginFooter;
