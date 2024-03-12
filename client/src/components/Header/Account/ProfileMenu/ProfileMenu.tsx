import { useState } from 'react';
import { useUser } from '@/state/Providers/UserProvider/useUser';
import { Avatar, Menu, Tooltip } from '@mui/material';
import ProfileMenuItems from './ProfileMenuItems/ProfileMenuItems';

const ProfileMenu = () => {
	const { user } = useUser();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget);

	const handleClose = () => setAnchorEl(null);

	return (
		<div>
			<Tooltip title='Profile'>
				<Avatar
					id='profile-menu-button'
					aria-haspopup='true'
					aria-controls={isOpen ? 'profile-menu' : undefined}
					aria-expanded={isOpen ? 'true' : undefined}
					// src={data?.user?.image as string | undefined}
					alt={user?.profile.name}
					onClick={handleOpen}
					sx={{ width: 24, height: 24 }}
					imgProps={{ referrerPolicy: 'no-referrer' }}
				/>
			</Tooltip>
			<Menu
				id='profile-menu'
				open={isOpen}
				anchorEl={anchorEl}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'profile-menu-button',
				}}
			>
				<ProfileMenuItems setOpen={setAnchorEl} />
			</Menu>
		</div>
	);
};

export default ProfileMenu;
