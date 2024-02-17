import { memo, useState } from 'react';
import { initialTableState } from '@/state/features/animation/animationSlice';
import { Add, Delete, RestartAlt } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import {
	MRT_FilterOptionMenu,
	MRT_ShowHideColumnsButton,
	MRT_TableInstance,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFiltersButton,
	MRT_ToggleFullScreenButton,
} from 'material-react-table';
import { AnimationBaseT } from '@/types/animation.types';

const TopToolbarInternalActions = ({
	table,
	type,
	isResetDisabled,
}: {
	table: MRT_TableInstance<AnimationBaseT>;
	type: 'staticEffect' | 'animation';
	isResetDisabled: boolean;
}) => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

	// const apiRef = useGridApiContext();

	// const handleTableReset = () => {
	// 	apiRef.current.restoreState(initialTableState.state);
	// 	apiRef.current.setRowSelectionModel(initialTableState.selection);
	// 	apiRef.current.setColumnVisibilityModel(initialTableState.visibility);
	// };

	return (
		// <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
		<div>
			<MRT_ShowHideColumnsButton table={table} />
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
		</div>
		// </Box>
	);
};

export default memo(TopToolbarInternalActions);
