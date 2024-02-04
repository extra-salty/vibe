import { useDispatch } from 'react-redux';
import { EffectServiceInstance } from '@/app/api/effect/_service';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
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

const StaticEffectTableToolbar = () => {
	const apiRef = useGridApiContext();
	const dispatch = useDispatch();
	const selectedStaticEffects = useAnimationTableSelection();

	const handleCreateEffect = async () => {
		// setButtonLoadings((s) => ({ ...s, create: true }));

		try {
			await EffectServiceInstance.createEffect();

			// handleGetEffects();
		} catch (e) {
			console.error(e);
		} finally {
			// setButtonLoadings((s) => ({ ...s, create: false }));
		}
	};

	const handleDeleteEffects = async () => {
		// setButtonLoadings((s) => ({ ...s, delete: true }));
		const asd = apiRef.current.getSelectedRows();
		console.log('🚀 ~ handleDeleteEffects ~ asd:');
		try {
			// await EffectsServiceInstance.deleteEffects();
			// handleGetEffects();
		} catch (e) {
			console.error(e);
		} finally {
			// setButtonLoadings((s) => ({ ...s, delete: false }));
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

export default StaticEffectTableToolbar;
