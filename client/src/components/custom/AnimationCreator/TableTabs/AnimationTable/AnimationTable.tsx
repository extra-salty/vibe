import useAnimationTableHeader from './useAnimationTableHeader';
import { useAnimationTable } from '@/state/features/animation/animationSelector';
import { useDispatch } from 'react-redux';
import { animationActions } from '@/state/features/animation/animationSlice';
import { memo } from 'react';
import { DataGrid, GridRowCount, GridRowId } from '@mui/x-data-grid';
import { GridStateT } from '@/types/animation.types';
import TableToolbar from '../../../TableComps/TableToolbar/TableToolbar';

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
			slots={{ toolbar: TableToolbar, footerRowCount: rowCOunt }}
			slotProps={{
				panel: { placement: 'bottom-end' },
				toolbar: { itemType: 'animation', selection: [] },
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
					dispatch(animationActions.setAnimationTableVisibility(columnVisibilityModel));
				}
			}}
			//
			rowSelectionModel={table.selection}
			onRowSelectionModelChange={(selection) => {
				if (JSON.stringify(table.selection) != JSON.stringify(selection)) {
					dispatch(
						animationActions.setAnimationTableSelection(
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
					dispatch(animationActions.setAnimationTableState(state));
				}
			}}
		/>
	);
};

export default memo(AnimationTable);

const rowCOunt = () => {
	return <div>Asd</div>;
};
