import { useUser } from '@/state/Providers/UserProvider/useUser';
import { useRoutes } from '@/state/Providers/Routes/useRoutes/useRoutes';
import { Dispatch, SetStateAction, useState } from 'react';
import { Logout, ManageAccounts } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem, SvgIconProps } from '@mui/material';
import { googleLogout } from '@react-oauth/google';
import AccountDrawer from '../AccountDrawer/AccountDrawer';
import { purgeStoredState } from 'redux-persist';
import { persistConfig } from '@/state/store';

const AccountMenuItems = ({
	setOpen,
}: {
	setOpen: Dispatch<SetStateAction<null | HTMLElement>>;
}) => {
	const user = useUser();
	const goToLogin = useRoutes('login');

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
					// purgeStoredState(persistConfig);
					googleLogout();

					goToLogin();
				} catch (e) {
					console.error(e);
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
