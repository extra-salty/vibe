import useAnimationsColumns from './useAnimationsColumns';
import { useAnimations } from '@/state/features/animation/animationSelector';
import { useDispatch } from 'react-redux';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { animationActions } from '@/state/features/animation/animationSlice';
import TopToolbarInternalActions from '../TopToolbarActions/TopToolbarInternalActions/TopToolbarInternalActions';
import TopToolbarCustomActions from '../TopToolbarActions/TopToolbarCustomActions/TopToolbarCustomActions';

const Animations = ({}: {}) => {
	const dispatch = useDispatch();
	const animations = useAnimations();
	const columns = useAnimationsColumns();

	const table = useMaterialReactTable({
		columns,
		data: animations.data,
		state: animations.state,
		//
		enablePagination: false,
		muiTableContainerProps: { sx: { height: '700px' } },
		//
		// muiTableHeadCellProps: { size: 'small' },
		// Indexing
		enableRowNumbers: true,
		rowNumberDisplayMode: 'static',
		getRowId: (row) => row._id,
		// Selection
		enableRowSelection: true,
		positionToolbarAlertBanner: 'bottom',
		onRowSelectionChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(animations.state.rowSelection);

			dispatch(animationActions.setAnimationsRowSelection(nextState));
		},
		// Sorting
		enableMultiSort: true,
		enableSortingRemoval: false,
		onSortingChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(animations.state.sorting);

			dispatch(animationActions.setAnimationsSorting(nextState));
		},
		// Filtering
		onColumnFiltersChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(animations.state.columnFilters);

			dispatch(animationActions.setAnimationsColumnFilters(nextState));
		},
		muiSearchTextFieldProps: { sx: { backgroundColor: 'red' } },
		onGlobalFilterChange: (updater) => {
			// if (typeof updater !== 'function') return;
			const nextState = updater(animations.state.globalFilter);

			dispatch(animationActions.setAnimationsGlobalFilter(nextState));
		},
		// Visibility
		onColumnVisibilityChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(animations.state.columnVisibility);

			dispatch(animationActions.setAnimationsColumnVisibility(nextState));
		},
		// Toolbar
		// renderToolbarInternalActions: ({ table }) => (
		// 	<TopToolbarInternalActions table={table} type='animation' />
		// ),
		renderTopToolbarCustomActions: ({ table }) => (
			<TopToolbarCustomActions
				type='animation'
				selectedRows={table.getSelectedRowModel().rows.map((row) => row.original)}
			/>
		),
	});

	return <MaterialReactTable table={table} />;
};

export default Animations;
