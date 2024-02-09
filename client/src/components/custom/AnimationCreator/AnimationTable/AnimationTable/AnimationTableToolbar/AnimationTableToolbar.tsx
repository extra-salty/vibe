import { useDispatch } from 'react-redux';
import { useAnimationTableSelection } from '@/state/features/animation/animationSelector';
import { AppDispatch } from '@/state/store';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarFilterButton,
	useGridApiContext,
} from '@mui/x-data-grid';
import { initialTableState } from '@/state/features/animation/animationSlice';
import { Button } from '@mui/material';
import { Add, Delete, RestartAlt } from '@mui/icons-material';
import { memo, useState } from 'react';
import CreateDialog from './CreateDialog/CreateDialog';
import DeleteDialog from './DeleteDialog/DeleteDialog';

const AnimationTableToolbar = () => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

	const apiRef = useGridApiContext();
	const selectedAnimations = useAnimationTableSelection();

	const handleEffectTableReset = () => {
		apiRef.current.restoreState(initialTableState.state);
		apiRef.current.setRowSelectionModel(initialTableState.selection);
		apiRef.current.setColumnVisibilityModel(initialTableState.visibility);
	};

	return (
		<>
			<CreateDialog open={isCreateDialogOpen} setOpen={setIsCreateDialogOpen} />
			<DeleteDialog
				selection={selectedAnimations}
				open={isDeleteDialogOpen}
				setOpen={setIsDeleteDialogOpen}
			/>
			<GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					<Button startIcon={<Add />} onClick={() => setIsCreateDialogOpen(true)}>
						Create
					</Button>
					<Button
						startIcon={<Delete />}
						disabled={!selectedAnimations.length}
						onClick={() => setIsDeleteDialogOpen(true)}
					>
						Delete
					</Button>
				</div>
				<div>
					<GridToolbarColumnsButton />
					<GridToolbarFilterButton />
					<GridToolbarDensitySelector />
					<Button
						startIcon={<RestartAlt />}
						// disabled={isResetDisabled}
						onClick={handleEffectTableReset}
					>
						Reset
					</Button>
				</div>
			</GridToolbarContainer>
		</>
	);
};

export default memo(AnimationTableToolbar);
