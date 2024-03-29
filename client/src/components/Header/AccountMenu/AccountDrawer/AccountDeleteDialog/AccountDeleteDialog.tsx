import { Dispatch, SetStateAction, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';
import { useUser } from '@/state/Providers/UserProvider/useUser';

const AccountDeletionDialog = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const user = useUser();
	const userName = user?.profile.name;

	const [textInput, setTextInput] = useState<string>('');

	const handleClose = () => setOpen(false);

	const handleSubmit = () => {};

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTextInput(event.target.value);
	};

	const handleDelete = () => {
		user.app.deleteUser(user);
	};

	return (
		<Dialog
			open={open}
			PaperProps={{
				component: 'form',
				sx: { width: '500px' },
				onSubmit: handleSubmit,
			}}
			sx={{ zIndex: '2500' }}
			onClose={handleClose}
		>
			<DialogTitle>Delete User Profile</DialogTitle>
			<DialogContent dividers>
				<DialogContentText
					sx={{ display: 'flex', flexDirection: 'column', marginBottom: '25px' }}
				>
					<span>All data associated with the user profile will be lost.</span>
					<span>
						Enter user name to confirm deletion: <strong>{userName}</strong>
					</span>
				</DialogContentText>
				<TextField fullWidth id='name' label='User Name' onChange={handleOnChange} />
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button onClick={handleClose}>Cancel</Button>
				<LoadingButton
					color='warning'
					loading={false}
					disabled={textInput !== userName}
					onClick={handleDelete}
				>
					DELETE
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default AccountDeletionDialog;
