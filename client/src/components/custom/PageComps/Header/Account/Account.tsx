import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Alert, Snackbar } from '@mui/material';
import ProfileMenu from './ProfileMenu/Profile';
import Login from './Login/Login';

const Account = () => {
	const { data: session } = useSession();

	const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
	const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(true);

	const timeRef = useRef(true);

	if (!session && timeRef.current) {
		setTimeout(() => {
			setIsInfoOpen(true);
			timeRef.current = false;
		}, 5000);
	}

	const handleInfoClose = (_: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setIsInfoOpen(false);
	};

	const handleSuccessClose = () => setIsSuccessOpen(false);

	return (
		<>
			{session ? <ProfileMenu /> : <Login />}
			<Snackbar
				open={isInfoOpen}
				autoHideDuration={60000}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				onClose={handleInfoClose}
			>
				<Alert
					severity='info'
					variant='filled'
					onClose={handleInfoClose}
					sx={{ width: '100%' }}
				>
					Log in above to see the features
				</Alert>
			</Snackbar>
			{session && (
				<Snackbar
					open={isSuccessOpen}
					autoHideDuration={3000}
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
			)}
		</>
	);
};

export default Account;
