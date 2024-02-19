import { memo } from 'react';
import { initialTableState } from '@/state/features/animations/animationSlice';
import { RestartAlt } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { AnimationBaseT } from '@/types/animation.types';
import {
	MRT_GlobalFilterTextField,
	MRT_ShowHideColumnsButton,
	MRT_TableInstance,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFiltersButton,
	MRT_ToggleFullScreenButton,
	MRT_ToggleGlobalFilterButton,
} from 'material-react-table';

const TopToolbarInternalActions = ({
	table,
	type,
}: {
	table: MRT_TableInstance<AnimationBaseT>;
	type: 'staticEffect' | 'animation';
}) => {
	// const handleTableReset = () => {
	// 	apiRef.current.restoreState(initialTableState.state);
	// 	apiRef.current.setRowSelectionModel(initialTableState.selection);
	// 	apiRef.current.setColumnVisibilityModel(initialTableState.visibility);
	// };

	return (
		<>
			{/* <MRT_GlobalFilterTextField table={table} /> */}
			<MRT_ToggleGlobalFilterButton table={table} />
			<MRT_ToggleFiltersButton table={table} />
			<MRT_ShowHideColumnsButton table={table} />
			<MRT_ToggleDensePaddingButton table={table} />
			<MRT_ToggleFullScreenButton table={table} />
			<IconButton
			// startIcon={}
			// disabled={isResetDisabled}
			// onClick={handleTableReset}
			>
				<RestartAlt />
			</IconButton>
		</>
	);
};

export default memo(TopToolbarInternalActions);
