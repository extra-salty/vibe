import { useDispatch } from 'react-redux';
import { useGridApiContext } from '@mui/x-data-grid';
import { deleteAnimations, getAnimations } from '@/state/features/animation/animationApi';
import { Dispatch, SetStateAction, memo, useState } from 'react';
import { AppDispatch } from '@/state/store';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteTable from './DeleteTable/DeleteTable';

const DeleteDialog = ({
	type,
	id,
	open,
	setOpen,
}: {
	type: 'staticEffect' | 'animation';
	id?: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const apiRef = useGridApiContext();

	// if (id) {
	// 	const ids = [id];
	// } else {
	const rows = apiRef.current.getSelectedRows();
	const data = Array.from(rows.values());
	const ids = data.map((row) => row._id);
	// }

	const [selection, setSelection] = useState<string[]>(ids);

	const typeText = type === 'animation' ? 'animation(s)' : 'static effect(s)';

	const handleDeleteEffects = async () => {
		handleClose();
		await dispatch(deleteAnimations(selection));
		await dispatch(getAnimations());
	};

	const handleClose = () => setOpen(false);

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Delete the following {typeText}:</DialogTitle>
			<DialogContent dividers>
				<DeleteTable data={data} selection={selection} setSelection={setSelection} />
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button autoFocus onClick={handleClose}>
					Cancel
				</Button>
				<Button disabled={!selection.length} onClick={handleDeleteEffects}>
					Accept
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default memo(DeleteDialog);
