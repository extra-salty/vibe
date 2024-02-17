import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction, memo, useState } from 'react';
import {
	deleteAnimations,
	deleteEffects,
	getAnimations,
	getEffects,
} from '@/state/features/animation/animationApi';
import { AppDispatch } from '@/state/store';
import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { AnimationBaseT } from '@/types/animation.types';
import { MRT_RowSelectionState } from 'material-react-table';
import DeleteTable from './DeleteTable/DeleteTable';

const DeleteDialog = ({
	type,
	id,
	selectedRows,
	setOpen,
}: {
	type: 'staticEffect' | 'animation';
	id?: string;
	selectedRows: AnimationBaseT[];
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const typeText = type === 'animation' ? 'animation(s)' : 'static effect(s)';

	const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

	const isAcceptDisabled = !Object.values(rowSelection).includes(true);

	const handleClose = () => setOpen(false);

	const handleDeleteSelected = async () => {
		const ids = Object.entries(rowSelection)
			.filter((entries) => entries[1])
			.map((entries) => entries[0]);

		handleClose();
		if (typeText === 'animation(s)') {
			await dispatch(deleteAnimations(ids));
			await dispatch(getAnimations());
		} else {
			await dispatch(deleteEffects(ids));
			await dispatch(getEffects());
		}
	};

	return (
		<>
			<DialogTitle>Delete the following {typeText}:</DialogTitle>
			<DialogContent dividers>
				<DeleteTable
					data={selectedRows}
					rowSelection={rowSelection}
					setSelection={setRowSelection}
				/>
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button autoFocus onClick={handleClose}>
					Cancel
				</Button>
				<Button disabled={isAcceptDisabled} onClick={handleDeleteSelected}>
					Accept
				</Button>
			</DialogActions>
		</>
	);
};

export default memo(DeleteDialog);
