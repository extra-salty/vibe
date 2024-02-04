'use client';
import useStaticEffectTableHeader from './useStaticEffectTableHeader';
import { useStaticEffectTable } from '@/state/features/animation/animationSelector';
import { useDispatch } from 'react-redux';
import { memo, useCallback, useState } from 'react';
import { EffectTableT } from '@/types/effect.types';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import { DataGrid, GridRowId } from '@mui/x-data-grid';
import { GridStateT } from '@/types/animation.types';
import {
	setStaticEffectTableSelection,
	setStaticEffectTableState,
	setStaticEffectTableVisibility,
} from '@/state/features/animation/animationSlice';
import StaticEffectTableToolbar from './StaticEffectTableToolbar/StaticEffectTableToolbar';

const StaticEffectTable = ({ initialEffects }: { initialEffects: EffectTableT[] }) => {
	const dispatch = useDispatch();
	const [effects, setEffects] = useState<EffectTableT[]>(initialEffects);

	const header = useStaticEffectTableHeader();
	const table = useStaticEffectTable();

	const handleGetEffects = useCallback(async () => {
		const data = await EffectsServiceInstance.getEffects();

		setEffects(data);
	}, [setEffects]);

	return (
		<DataGrid
			columns={header}
			rows={effects}
			loading={table.loading}
			// footerRowCount: 2
			// noRowsOverlay: CustomNoRowsOverlay,
			// loadingOverlay: LinearProgress,
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
					console.log('dispatch');
					dispatch(setStaticEffectTableState(state));
				}
			}}
		/>
	);
};

export default memo(StaticEffectTable);

// const firstUpdate = useRef(true);
// useEffect(() => {
// 	if (firstUpdate.current) {
// 		firstUpdate.current = false;
// 	} else {
// 		handleGetEffects();
// 	}
// }, [handleGetEffects]);

// function CustomUserItem(props: GridColumnMenuItemProps) {
//   const { myCustomHandler, myCustomValue } = props;
//   return (
//     <MenuItem onClick={myCustomHandler}>
//       <ListItemIcon>
//         <DeleteOutline fontSize='small' />
//       </ListItemIcon>
//       <ListItemText>{myCustomValue}</ListItemText>
//     </MenuItem>
//   );
// }

// function CustomColumnMenu(props: GridColumnMenuProps) {
//   return (
//     <GridColumnMenu
//       {...props}
//       slots={{
//         columnMenuUserItem: CustomUserItem,
//       }}
//       slotProps={{
//         columnMenuUserItem: {
//           displayOrder: 15,
//           myCustomValue: 'Do custom action',
//           myCustomHandler: () => alert('Custom handler fired'),
//         },
//       }}
//     />
//   );
// }
