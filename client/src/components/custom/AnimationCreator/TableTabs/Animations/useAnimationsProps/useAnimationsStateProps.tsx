import { useDispatch } from 'react-redux';
import { useAnimationsState } from '@/state/features/animationGroups/animationSelector';
import {
	animationsActions,
	initialAnimationsState,
} from '@/state/features/animationGroups/animationSlice';
import { AnimationsTablePropsT } from '@/types/animation.types';
import { useEffect, useState } from 'react';
import { MRT_DensityState } from 'material-react-table';

const useAnimationStateProps = (): AnimationsTablePropsT => {
	const dispatch = useDispatch();
	const state = useAnimationsState();

	const [density, setDensity] = useState<MRT_DensityState>(
		initialAnimationsState.density,
	);

	useEffect(() => {
		dispatch(animationsActions.setDensity(density));
	}, [density, dispatch]);

	return {
		// State
		state,
		// Internal actions
		onDensityChange: setDensity,
		// Expand
		enableExpanding: true,
		enableExpandAll: true,
		// getSubRows: (row) => row.children,
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

export default useAnimationStateProps;
