import { useState } from 'react';
import { useUser } from '@/state/Providers/UserProvider/useUser';
import { Avatar, Menu, Tooltip } from '@mui/material';
import AccountMenuItems from './AccountMenuItems/AccountMenuItems';

const AccountMenu = () => {
	const user = useUser();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget);

	const handleClose = () => setAnchorEl(null);

	return (
		<>
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
				<AccountMenuItems setOpen={setAnchorEl} />
			</Menu>
		</>
	);
};

export default AccountMenu;

// const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

// const timeRef = useRef(true);

// // if (!session && timeRef.current) {
// // 	setTimeout(() => {
// // 		setIsInfoOpen(true);
// // 		timeRef.current = false;
// // 	}, 5000);
// // }

// const handleInfoClose = (_: React.SyntheticEvent | Event, reason?: string) => {
//   if (reason === 'clickaway') {
//     return;
//   }

//   setIsInfoOpen(false);
// };
