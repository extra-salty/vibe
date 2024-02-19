import useAnimationTableHeader from './useAnimationTableHeader';
import { useAnimationTable } from '@/state/features/animations/animationSelector';
import { useDispatch } from 'react-redux';
import {
	animationsActions,
	initialTableState,
} from '@/state/features/animations/animationSlice';
import { memo } from 'react';
import { DataGrid, GridRowCount, GridRowId } from '@mui/x-data-grid';
import { GridStateT } from '@/types/animation.types';
import { LinearProgress } from '@mui/material';
import TableToolbar from '../../../TableComps/TableToolbar/TableToolbar';

const AnimationTable = () => {
	const dispatch = useDispatch();

	const header = useAnimationTableHeader();
	const table = useAnimationTable();

	const { loading: initialLoading, ...initialRest } = initialTableState;
	const { data, loading, ...rest } = table;
	const isResetDisabled = JSON.stringify(initialRest) === JSON.stringify(rest);

	return (
		<DataGrid
			columns={header}
			rows={table.data}
			loading={table.loading}
			getRowId={(row) => row._id}
			slots={{ toolbar: TableToolbar, loadingOverlay: LinearProgress }}
			// noRowsOverlay: CustomNoRowsOverlay
			slotProps={{
				panel: { placement: 'bottom-end' },
				toolbar: {
					type: 'animation',
					isDeleteDisabled: !table.selection.length,
					isResetDisabled: isResetDisabled,
				},
			}}
			// rowCount={10}
			//
			density='compact'
			checkboxSelection
			hideFooterPagination
			disableRowSelectionOnClick
			//
			columnVisibilityModel={table.visibility}
			onColumnVisibilityModelChange={(columnVisibilityModel) => {
				if (JSON.stringify(table.visibility) != JSON.stringify(columnVisibilityModel)) {
					dispatch(animationsActions.setAnimationTableVisibility(columnVisibilityModel));
				}
			}}
			//
			rowSelectionModel={table.selection}
			onRowSelectionModelChange={(selection) => {
				if (JSON.stringify(table.selection) != JSON.stringify(selection)) {
					dispatch(
						animationsActions.setAnimationTableSelection(
							selection.map((id: GridRowId) => id as string),
						),
					);
				}
			}}
			//
			initialState={table.state}
			onStateChange={(wholeState) => {
				const state: GridStateT = {
					sorting: { sortModel: wholeState.sorting.sortModel },
					filter: { filterModel: wholeState.filter.filterModel },
				};

				if (JSON.stringify(table.state) != JSON.stringify(state)) {
					dispatch(animationsActions.setAnimationTableState(state));
				}
			}}
		/>
	);
};

export default memo(AnimationTable);
