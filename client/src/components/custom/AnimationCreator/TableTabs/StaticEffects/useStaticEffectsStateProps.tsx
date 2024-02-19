import { useStaticEffects } from '@/state/features/staticEffects/staticEffectsSelector';
import { useDispatch } from 'react-redux';
import { staticEffectsActions } from '@/state/features/staticEffects/staticEffectsSlice';
import { AnimationBaseT } from '@/types/animation.types';
import { MRT_TableOptions } from 'material-react-table';

const useStaticEffectsStateProps = (): Partial<MRT_TableOptions<AnimationBaseT>> => {
	const dispatch = useDispatch();
	const animations = useStaticEffects();

	const stateProps: Partial<MRT_TableOptions<AnimationBaseT>>[] = [
		// Selection
		{
			enableRowSelection: true,
			positionToolbarAlertBanner: 'bottom',
			onRowSelectionChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(animations.state.rowSelection);
				dispatch(staticEffectsActions.setStaticEffectsRowSelection(nextState));
			},
		},
		// Sorting
		{
			enableMultiSort: true,
			enableSortingRemoval: false,
			onSortingChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(animations.state.sorting);
				dispatch(staticEffectsActions.setStaticEffectsSorting(nextState));
			},
		},
		// Filtering
		{
			onColumnFiltersChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(animations.state.columnFilters);
				dispatch(staticEffectsActions.setStaticEffectsColumnFilters(nextState));
			},
			muiSearchTextFieldProps: { sx: { backgroundColor: 'red' } },
			onGlobalFilterChange: (updater) => {
				// if (typeof updater !== 'function') return;
				const nextState = updater(animations.state.globalFilter);
				dispatch(staticEffectsActions.setStaticEffectsGlobalFilter(nextState));
			},
		},
		// Visibility
		{
			onColumnVisibilityChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(animations.state.columnVisibility);
				dispatch(staticEffectsActions.setStaticEffectsColumnVisibility(nextState));
			},
		},
		// Pinning
		{
			enableColumnPinning: true,
			onColumnPinningChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(animations.state.columnPinning);
				dispatch(staticEffectsActions.setStaticEffectsColumnPinning(nextState));
			},
		},
	];

	return stateProps.reduce((stateProps, props) => ({ ...stateProps, ...props }), {});
};

export default useStaticEffectsStateProps;
