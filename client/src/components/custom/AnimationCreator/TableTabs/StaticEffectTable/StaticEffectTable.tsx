'use client';
import useStaticEffectTableHeader from './useStaticEffectTableHeader';
import { useStaticEffectTable } from '@/state/features/animation/animationSelector';
import { useDispatch } from 'react-redux';
import { animationActions, initialTableState } from '@/state/features/animation/animationSlice';
import { memo } from 'react';
import { GridStateT } from '@/types/animation.types';
import { DataGrid, GridRowId } from '@mui/x-data-grid';
import TableToolbar from '@/components/custom/TableComps/TableToolbar/TableToolbar';

const StaticEffectTable = () => {
	const dispatch = useDispatch();

	const header = useStaticEffectTableHeader();
	const table = useStaticEffectTable();

	const { loading: initialLoading, ...initialRest } = initialTableState;
	const { data, loading, ...rest } = table;
	const isResetDisabled = JSON.stringify(initialRest) === JSON.stringify(rest);

	return (
		<DataGrid
			columns={header}
			rows={table.data}
			loading={table.loading}
			getRowId={(row) => row._id}
			slots={{ toolbar: TableToolbar }}
			slotProps={{
				panel: { placement: 'bottom-end' },
				toolbar: {
					type: 'staticEffect',
					isDeleteDisabled: !table.selection.length,
					isResetDisabled: isResetDisabled,
				},
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
					dispatch(animationActions.setStaticEffectTableVisibility(columnVisibilityModel));
				}
			}}
			//
			rowSelectionModel={table.selection}
			onRowSelectionModelChange={(selection) => {
				if (JSON.stringify(table.selection) != JSON.stringify(selection)) {
					dispatch(
						animationActions.setStaticEffectTableSelection(
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
					dispatch(animationActions.setStaticEffectTableState(state));
				}
			}}
		/>
	);
};

export default memo(StaticEffectTable);

// footerRowCount: 2
// noRowsOverlay: CustomNoRowsOverlay,
// loadingOverlay: LinearProgress,

// const rowCOunt = () => {
// 	return <div>Asd</div>;
// };
