'use client';
import useStaticEffectTableHeader from './useStaticEffectTableHeader';
import { useStaticEffectTable } from '@/state/features/animation/animationSelector';
import { useDispatch } from 'react-redux';
import { memo } from 'react';
import { DataGrid, GridRowId } from '@mui/x-data-grid';
import { GridStateT } from '@/types/animation.types';
import {
	setStaticEffectTableSelection,
	setStaticEffectTableState,
	setStaticEffectTableVisibility,
} from '@/state/features/animation/animationSlice';
import StaticEffectTableToolbar from './StaticEffectTableToolbar/StaticEffectTableToolbar';

const StaticEffectTable = () => {
	const dispatch = useDispatch();

	const header = useStaticEffectTableHeader();
	const table = useStaticEffectTable();

	return (
		<DataGrid
			columns={header}
			rows={table.data}
			loading={table.loading}
			getRowId={(row) => row._id}
			slots={{ toolbar: StaticEffectTableToolbar }}
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
					dispatch(setStaticEffectTableVisibility(columnVisibilityModel));
				}
			}}
			//
			rowSelectionModel={table.selection}
			onRowSelectionModelChange={(selection) => {
				if (JSON.stringify(table.selection) != JSON.stringify(selection)) {
					dispatch(setStaticEffectTableSelection(selection.map((id: GridRowId) => id as string)));
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
					dispatch(setStaticEffectTableState(state));
				}
			}}
		/>
	);
};

export default memo(StaticEffectTable);

// footerRowCount: 2
// noRowsOverlay: CustomNoRowsOverlay,
// loadingOverlay: LinearProgress,
