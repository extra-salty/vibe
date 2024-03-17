import { useUser } from '@/state/Providers/UserProvider/useUser';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { Logout, ManageAccounts } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem, SvgIconProps } from '@mui/material';
import AccountDrawer from '../AccountDrawer/AccountDrawer';

const AccountMenuItems = ({
	setOpen,
}: {
	setOpen: Dispatch<SetStateAction<null | HTMLElement>>;
}) => {
	const user = useUser();
	const router = useRouter();

	const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState<boolean>(false);

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
			onClick: async () => {
				try {
					await user.logOut();
					router.push('/login');
					//
					// clear local storage
					//
				} catch {
					console.error('Failed to log out user.');
				}
			},
		},
	];

	return (
		<>
			<AccountDrawer open={isProfileDrawerOpen} setOpen={setIsProfileDrawerOpen} />
			{items.map(({ icon, label, onClick }, i) => (
				<MenuItem key={i} onClick={onClick}>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText>{label}</ListItemText>
				</MenuItem>
			))}
		</>
	);
};

export default AccountMenuItems;
