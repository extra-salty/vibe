import { useDispatch } from 'react-redux';
import { useAnimations } from '@/state/features/animations/animationSelector';
import { animationsActions } from '@/state/features/animations/animationSlice';
import { AnimationBaseT } from '@/types/animation.types';
import { MRT_TableOptions } from 'material-react-table';

const useAnimationsStateProps = (): Partial<MRT_TableOptions<AnimationBaseT>> => {
	const dispatch = useDispatch();
	const animations = useAnimations();

	const stateProps: Partial<MRT_TableOptions<AnimationBaseT>>[] = [
		// Selection
		{
			enableRowSelection: true,
			positionToolbarAlertBanner: 'bottom',
			onRowSelectionChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(animations.state.rowSelection);
				dispatch(animationsActions.setAnimationsRowSelection(nextState));
			},
		},
		// Sorting
		{
			enableMultiSort: true,
			enableSortingRemoval: false,
			onSortingChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(animations.state.sorting);
				dispatch(animationsActions.setAnimationsSorting(nextState));
			},
		},
		// Filtering
		{
			onColumnFiltersChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(animations.state.columnFilters);
				dispatch(animationsActions.setAnimationsColumnFilters(nextState));
			},
			muiSearchTextFieldProps: { sx: { backgroundColor: 'red' } },
			onGlobalFilterChange: (updater) => {
				// if (typeof updater !== 'function') return;
				const nextState = updater(animations.state.globalFilter);
				dispatch(animationsActions.setAnimationsGlobalFilter(nextState));
			},
		},
		// Visibility
		{
			onColumnVisibilityChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(animations.state.columnVisibility);
				dispatch(animationsActions.setAnimationsColumnVisibility(nextState));
			},
		},
		// Pinning
		{
			enableColumnPinning: true,
			onColumnPinningChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(animations.state.columnPinning);
				dispatch(animationsActions.setAnimationsColumnPinning(nextState));
			},
		},
	];

	return stateProps.reduce((stateProps, props) => ({ ...stateProps, ...props }), {});
};

export default useAnimationsStateProps;
