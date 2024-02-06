'use client';
import useAnimationTableHeader from './useAnimationTableHeader';
import { useDispatch } from 'react-redux';
import { DataGrid, GridRowId } from '@mui/x-data-grid';
import { useAnimationTable } from '@/state/features/animation/animationSelector';
import { memo } from 'react';
import {
	setAnimationTableSelection,
	setAnimationTableState,
	setAnimationTableVisibility,
} from '@/state/features/animation/animationSlice';
import { GridStateT } from '@/types/animation.types';
import AnimationTableToolbar from './AnimationTableToolbar/AnimationTableToolbar';

const AnimationTable = () => {
	const dispatch = useDispatch();

	const header = useAnimationTableHeader();
	const table = useAnimationTable();

	return (
		<DataGrid
			columns={header}
			rows={table.data}
			loading={table.loading}
			getRowId={(row) => row._id}
			slots={{ toolbar: AnimationTableToolbar }}
			slotProps={{
				panel: { placement: 'bottom-end' },
			}}
			//
			density='compact'
			checkboxSelection
			hideFooterPagination
			disableRowSelectionOnClick
			//
			columnVisibilityModel={table.visibility}
			onColumnVisibilityModelChange={(columnVisibilityModel) => {
				if (JSON.stringify(table.visibility) != JSON.stringify(columnVisibilityModel)) {
					dispatch(setAnimationTableVisibility(columnVisibilityModel));
				}
			}}
			//
			rowSelectionModel={table.selection}
			onRowSelectionModelChange={(selection) => {
				if (JSON.stringify(table.selection) != JSON.stringify(selection)) {
					dispatch(setAnimationTableSelection(selection.map((id: GridRowId) => id as string)));
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
					dispatch(setAnimationTableState(state));
				}
			}}
		/>
	);
};

export default memo(AnimationTable);
