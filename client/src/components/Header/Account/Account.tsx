import { useState } from 'react';
import { useUser } from '@/state/Providers/UserProvider/useUser';
import { Alert, Snackbar } from '@mui/material';
import ProfileMenu from './ProfileMenu/ProfileMenu';
import Login from './Login/Login';

const Account = () => {
	const { user } = useUser();

	console.log('🚀 ~ Account:', user?.isLoggedIn);
	const [isSuccessOpen, setIsSuccessOpen] = useState<boolean | undefined>(
		user?.isLoggedIn,
	);
	console.log('🚀 ~ Account ~ isSuccessOpen:', isSuccessOpen);

	const handleSuccessClose = () => setIsSuccessOpen(false);

	return (
		<>
			{user ? <ProfileMenu /> : <Login />}
			<Snackbar
				open={isSuccessOpen}
				autoHideDuration={5000}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				onClose={handleSuccessClose}
			>
				<Alert
					severity='success'
					variant='filled'
					onClose={handleSuccessClose}
					sx={{ width: '100%' }}
				>
					Successfull login
				</Alert>
			</Snackbar>
		</>
	);
};

export default Account;

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
