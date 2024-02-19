import { animationsActions } from '@/state/features/animations/animationSlice';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

const RemoveDialog = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch();
	const handleClose = () => setOpen(false);

	const handleAccept = () => {
		handleClose();
		dispatch(animationsActions.resetPlaylist([]));
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				sx: { width: '500px' },
			}}
		>
			<DialogTitle>Remove selection</DialogTitle>
			<DialogContent dividers>
				<DialogContentText>
					Removes the selected animations from the playlist. Any unsaved progress will be
					lost.
				</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleAccept}>Accept</Button>
			</DialogActions>
		</Dialog>
	);
};

export default RemoveDialog;
