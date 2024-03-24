import { Tooltip, Link as MUILink, IconButton } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import Link from 'next/link';

const GitHub = () => {
	const githubLink = process.env.NEXT_PUBLIC_GITHUB_LINK;

	return (
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
				<IconButton>
					<GitHubIcon />
				</IconButton>
			</MUILink>
		</Tooltip>
	);
};

export default GitHub;
