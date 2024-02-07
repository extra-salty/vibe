import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { createAnimation, getAnimations } from '@/state/features/animation/animationApi';
import { initialTableState } from '@/state/features/animation/animationSlice';
import { Button } from '@mui/material';
import { Add, Delete, RestartAlt } from '@mui/icons-material';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarFilterButton,
	useGridApiContext,
} from '@mui/x-data-grid';

const AnimationTableToolbar = () => {
	const apiRef = useGridApiContext();
	const dispatch = useDispatch<AppDispatch>();

	const handleCreateEffect = async () => {
		dispatch(createAnimation());
		dispatch(getAnimations());
	};

	const handleDeleteEffects = async () => {
		const asd = apiRef.current.getSelectedRows();
		dispatch(getAnimations());
	};

	const handleEffectTableReset = () => {
		apiRef.current.restoreState(initialTableState.state);
		apiRef.current.setRowSelectionModel(initialTableState.selection);
		apiRef.current.setColumnVisibilityModel(initialTableState.visibility);
	};

	return (
		<GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<div>
				<Button startIcon={<Add />} onClick={handleCreateEffect}>
					Create
				</Button>
				<Button startIcon={<Delete />} onClick={handleDeleteEffects}>
					Delete
				</Button>
			</div>
			<div>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
				<Button startIcon={<RestartAlt />} onClick={handleEffectTableReset}>
					Reset
				</Button>
			</div>
		</GridToolbarContainer>
	);
};

export default AnimationTableToolbar;
