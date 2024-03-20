'use client';
import { useRoutes } from '@/state/Providers/Routes/useRoutes/useRoutes';
import { usePathname } from 'next/navigation';
import { Box, Link as MUILink } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { Button } from '@mui/material';
import Link from 'next/link';

const LoginFooter = () => {
	const githubLink = process.env.NEXT_PUBLIC_GITHUB_LINK;
	const isLoginPage = usePathname().split('/').pop() === 'login';

	const goToLogin = useRoutes('login');

	return (
		<>
			{!isLoginPage && (
				<Button size='large' fullWidth={false} onClick={goToLogin}>
					Back to login
				</Button>
			)}
			<Box
				component='footer'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '10px',
					marginTop: isLoginPage ? '25px' : '15px',
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
		</>
	);
};

export default LoginFooter;
