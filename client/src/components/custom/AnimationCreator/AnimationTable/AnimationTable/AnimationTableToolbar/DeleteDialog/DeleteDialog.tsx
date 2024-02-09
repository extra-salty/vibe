import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction, memo } from 'react';
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
	selection,
	open,
	setOpen,
}: {
	selection: string[];
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleDeleteEffects = async () => {
		handleClose();
		dispatch(deleteAnimations(selection));
		dispatch(getAnimations());
	};

	const handleClose = () => setOpen(false);

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Animations</DialogTitle>
			<DialogContent dividers>
				<DialogContentText>{`Delete the following animation(s):`}</DialogContentText>
				{selection.length > 1 ? (
					<ul>
						{selection.map((animation, i) => (
							<li key={i}>{animation}</li>
						))}
					</ul>
				) : (
					<span>{selection[0]}</span>
				)}
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

export default memo(DeleteDialog);
