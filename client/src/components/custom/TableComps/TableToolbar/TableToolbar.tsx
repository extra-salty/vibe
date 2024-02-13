import { memo, useState } from 'react';
import { initialTableState } from '@/state/features/animation/animationSlice';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarFilterButton,
	useGridApiContext,
} from '@mui/x-data-grid';
import { Add, Delete, RestartAlt } from '@mui/icons-material';
import { Button } from '@mui/material';
import CreateDialog from '../CreateDialog/CreateDialog';
import DeleteDialog from '../DeleteDialog/DeleteDialog';

const TableToolbar = ({
	type,
	isDeleteDisabled,
	isResetDisabled,
}: {
	type: 'staticEffect' | 'animation';
	isDeleteDisabled: boolean;
	isResetDisabled: boolean;
}) => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

	const apiRef = useGridApiContext();

	const handleTableReset = () => {
		apiRef.current.restoreState(initialTableState.state);
		apiRef.current.setRowSelectionModel(initialTableState.selection);
		apiRef.current.setColumnVisibilityModel(initialTableState.visibility);
	};

	return (
		<>
			<CreateDialog type={type} open={isCreateDialogOpen} setOpen={setIsCreateDialogOpen} />
			<DeleteDialog type={type} open={isDeleteDialogOpen} setOpen={setIsDeleteDialogOpen} />
			<GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					<Button startIcon={<Add />} onClick={() => setIsCreateDialogOpen(true)}>
						Create
					</Button>
					<Button
						startIcon={<Delete />}
						disabled={isDeleteDisabled}
						onClick={() => setIsDeleteDialogOpen(true)}
					>
						Delete
					</Button>
				</div>
				<div>
					<GridToolbarColumnsButton />
					<GridToolbarFilterButton />
					<GridToolbarDensitySelector />
					<Button startIcon={<RestartAlt />} disabled={isResetDisabled} onClick={handleTableReset}>
						Reset
					</Button>
				</div>
			</GridToolbarContainer>
		</>
	);
};

export default memo(TableToolbar);
