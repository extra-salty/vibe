import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { EffectServiceInstance } from '@/app/api/effect/_service';
import { useAnimationTableSelection } from '@/state/features/animation/animationSelector';
import { Add, Delete, RestartAlt } from '@mui/icons-material';
import { Button } from '@mui/material';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarFilterButton,
	useGridApiContext,
} from '@mui/x-data-grid';
import { initialTableState } from '@/state/features/animation/animationSlice';

const AnimationTableToolbar = () => {
	const apiRef = useGridApiContext();
	const dispatch = useDispatch<AppDispatch>();
	const selectedStaticEffects = useAnimationTableSelection();

	const handleCreateEffect = async () => {
		await EffectServiceInstance.createEffect();
	};

	const handleDeleteEffects = async () => {
		const asd = apiRef.current.getSelectedRows();
		try {
			// await EffectsServiceInstance.deleteEffects();
			// handleGetEffects();
		} catch (e) {
			console.error(e);
		} finally {
		}
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
