import { useDispatch } from 'react-redux';
import { staticEffectsActions } from '@/state/features/staticEffects/staticEffectsSlice';
import { MRT_TableOptions } from 'material-react-table';
import { useStaticEffectsState } from '@/state/features/staticEffects/staticEffectsSelector';
import { StaticAnimationTableT } from '@/types/effect.types';

const useStaticEffectsStateProps = (): Partial<
	MRT_TableOptions<StaticAnimationTableT>
> => {
	const dispatch = useDispatch();
	const state = useStaticEffectsState();

	return {
		// State
		state: { ...state, density: 'compact' },
		// Selection
		enableRowSelection: true,
		positionToolbarAlertBanner: 'bottom',
		onRowSelectionChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.rowSelection);
			dispatch(staticEffectsActions.setRowSelection(nextState));
		},
		// Sorting
		enableMultiSort: true,
		enableSortingRemoval: false,
		onSortingChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.sorting);
			dispatch(staticEffectsActions.setSorting(nextState));
		},
		// Filtering
		onColumnFiltersChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.columnFilters);
			dispatch(staticEffectsActions.setColumnFilters(nextState));
		},
		muiSearchTextFieldProps: { sx: { backgroundColor: 'red' } },
		onGlobalFilterChange: (updater) => {
			// if (typeof updater !== 'function') return;
			const nextState = updater(state.globalFilter);
			dispatch(staticEffectsActions.setGlobalFilter(nextState));
		},
		// Visibility
		onColumnVisibilityChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.columnVisibility);
			dispatch(staticEffectsActions.setColumnVisibility(nextState));
		},
		// Pinning
		enableColumnPinning: true,
		onColumnPinningChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.columnPinning);
			dispatch(staticEffectsActions.setColumnPinning(nextState));
		},
	};
};

export default useStaticEffectsStateProps;
