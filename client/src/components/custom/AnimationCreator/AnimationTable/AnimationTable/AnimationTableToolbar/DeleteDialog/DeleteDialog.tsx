import { useDispatch } from 'react-redux';
import { useAnimationTable } from '@/state/features/animation/animationSelector';
import { Dispatch, SetStateAction } from 'react';
import { deleteAnimations, getAnimations } from '@/state/features/animation/animationApi';
import { AppDispatch } from '@/state/store';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';

const DeleteDialog = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const table = useAnimationTable();

	const handleDeleteEffects = async () => {
		handleClose();
		dispatch(deleteAnimations(table.selection));
		dispatch(getAnimations());
	};

	const handleClose = () => setOpen(false);

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Animations</DialogTitle>
			<DialogContent dividers>
				<DialogContentText>Delete the following animations:</DialogContentText>
				<ul>
					{table.selection.map((animation, i) => (
						<li key={i}>{animation}</li>
					))}
				</ul>
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button autoFocus onClick={handleClose}>
					Cancel
				</Button>
				<Button onClick={handleDeleteEffects}>Accept</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteDialog;
