import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction, memo, useState } from 'react';
import {
	getAnimations,
	deleteAnimations,
} from '@/state/features/animationGroups/animationsThunk';
import { AppDispatch } from '@/state/store';
import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { AnimationT } from '@/types/animation.types';
import { MRT_RowSelectionState } from 'material-react-table';
import DeleteTable from './DeleteTable/DeleteTable';
import { animationsActions } from '@/state/features/animationGroups/animationSlice';

const DeleteDialog = ({
	selectedRows,
	setOpen,
}: {
	selectedRows: AnimationT[];
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

	const isAcceptDisabled = !Object.values(rowSelection).includes(true);

	const handleClose = () => setOpen(false);

	const handleDeleteSelected = async () => {
		const ids = Object.entries(rowSelection)
			.filter((entries) => entries[1])
			.map((entries) => entries[0]);

		handleClose();

		await dispatch(deleteAnimations(ids));
		await dispatch(getAnimations());
		dispatch(animationsActions.setRowSelection({}));
	};

	return (
		<>
			<DialogTitle>{'Delete the following animation(s)'}:</DialogTitle>
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
