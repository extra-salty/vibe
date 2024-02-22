import { useDispatch } from 'react-redux';
import { useAnimationsState } from '@/state/features/animationGroups/animationSelector';
import { animationsActions } from '@/state/features/animationGroups/animationSlice';
import { AnimationsTablePropsT } from '@/types/animation.types';

const useAnimationGroupStateProps = (): AnimationsTablePropsT => {
	const dispatch = useDispatch();
	const state = useAnimationsState();

	return {
		// State
		state: { ...state, density: 'compact' },
		// Expand
		enableExpanding: true,
		enableExpandAll: true,
		getSubRows: (row) => row.children,
		onExpandedChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.expanded);
			dispatch(animationsActions.setExpanded(nextState));
		},
		// Selection
		enableRowSelection: true,
		positionToolbarAlertBanner: 'bottom',
		onRowSelectionChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.rowSelection);
			dispatch(animationsActions.setRowSelection(nextState));
		},
		// Sorting
		enableMultiSort: true,
		enableSortingRemoval: false,
		onSortingChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.sorting);
			dispatch(animationsActions.setSorting(nextState));
		},
		// Filtering
		muiSearchTextFieldProps: { sx: { backgroundColor: 'red' } },
		onColumnFiltersChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.columnFilters);
			dispatch(animationsActions.setColumnFilters(nextState));
		},
		onGlobalFilterChange: (updater) => {
			// if (typeof updater !== 'function') return;
			const nextState = updater(state.globalFilter);
			dispatch(animationsActions.setGlobalFilter(nextState));
		},
		// Visibility
		onColumnVisibilityChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.columnVisibility);
			dispatch(animationsActions.setColumnVisibility(nextState));
		},
		// Pinning
		enableColumnPinning: true,
		onColumnPinningChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.columnPinning);
			dispatch(animationsActions.setColumnPinning(nextState));
		},
	};
};

export default useAnimationGroupStateProps;
