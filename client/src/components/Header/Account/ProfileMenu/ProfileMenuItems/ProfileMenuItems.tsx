import { useUser } from '@/state/Providers/UserProvider/useUser';
import { Dispatch, SetStateAction, useState } from 'react';
import { Logout, ManageAccounts } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem, SvgIconProps } from '@mui/material';
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';

const ProfileMenuItems = ({
	setOpen,
}: {
	setOpen: Dispatch<SetStateAction<null | HTMLElement>>;
}) => {
	const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState<boolean>(false);
	const { user, actions } = useUser();

	const items: {
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
			onClick: () => actions.logout(),
		},
	];

	return (
		<>
			<ProfileDrawer open={isProfileDrawerOpen} setOpen={setIsProfileDrawerOpen} />
			{items.map(({ icon, label, onClick }, i) => (
				<MenuItem key={i} onClick={onClick}>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText>{label}</ListItemText>
				</MenuItem>
			))}
		</>
	);
};

export default ProfileMenuItems;
