import { Dispatch, SetStateAction, useState } from 'react';
import { Logout, ManageAccounts } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem, SvgIconProps } from '@mui/material';
import { signOut } from 'next-auth/react';
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';

const ProfileMenuItems = ({
	setOpen,
}: {
	setOpen: Dispatch<SetStateAction<null | HTMLElement>>;
}) => {
	const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState<boolean>(false);

	const actions: {
		label: string;
		icon: React.ReactElement<SvgIconProps>;
		onClick: () => void;
	}[] = [
		{
			label: 'Manage Profile',
			icon: <ManageAccounts />,
			onClick: () => {
				// setOpen(null);
				setIsProfileDrawerOpen(true);
			},
		},
		{
			label: 'Log out',
			icon: <Logout />,
			onClick: () => signOut(),
		},
	];

	return (
		<>
			<ProfileDrawer open={isProfileDrawerOpen} setOpen={setIsProfileDrawerOpen} />
			{actions.map(({ icon, label, onClick }, i) => (
				<MenuItem key={i} onClick={onClick}>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText>{label}</ListItemText>
				</MenuItem>
			))}
		</>
	);
};

export default ProfileMenuItems;
