import { useDispatch } from 'react-redux';
import { useStaticAnimationsState } from '@/state/features/staticAnimations/staticAnimationsSelector';
import { staticAnimationsActions } from '@/state/features/staticAnimations/staticAnimationsSlice';
import { StaticAnimationTablePropsT } from '@/types/staticAnimation.types';
import { MRT_RowData, MRT_TableOptions } from 'material-react-table';

const useStaticAnimationsStateProps = (): StaticAnimationTablePropsT => {
	const dispatch = useDispatch();
	const state = useStaticAnimationsState();

	return {
		// State
		state: { ...state },
		// Selection
		enableRowSelection: true,
		positionToolbarAlertBanner: 'bottom',
		onRowSelectionChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.rowSelection);
			dispatch(staticAnimationsActions.setRowSelection(nextState));
		},
		// Sorting
		enableMultiSort: true,
		enableSortingRemoval: false,
		onSortingChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.sorting);
			dispatch(staticAnimationsActions.setSorting(nextState));
		},
		// Filtering
		onColumnFiltersChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.columnFilters);
			dispatch(staticAnimationsActions.setColumnFilters(nextState));
		},
		muiSearchTextFieldProps: { sx: { backgroundColor: 'red' } },
		onGlobalFilterChange: (updater) => {
			// if (typeof updater !== 'function') return;
			const nextState = updater(state.globalFilter);
			dispatch(staticAnimationsActions.setGlobalFilter(nextState));
		},
		// Visibility
		onColumnVisibilityChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.columnVisibility);
			dispatch(staticAnimationsActions.setColumnVisibility(nextState));
		},
		// Pinning
		enableColumnPinning: true,
		onColumnPinningChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.columnPinning);
			dispatch(staticAnimationsActions.setColumnPinning(nextState));
		},
	};
};

export default useStaticAnimationsStateProps;
