import { useDispatch } from 'react-redux';
import { usePlaylistState } from '@/state/features/playlist/playlistSelector';
import { animationsActions } from '@/state/features/animations/animationSlice';
import { AnimationT } from '@/types/animation.types';
import { MRT_TableOptions } from 'material-react-table';

const usePlaylistStateProps = (): Partial<MRT_TableOptions<AnimationT>> => {
	const dispatch = useDispatch();
	const state = usePlaylistState();

	const stateProps: Partial<MRT_TableOptions<AnimationT>>[] = [
		// Expand
		{
			enableExpanding: true,
			enableExpandAll: true,
			// getSubRows: (row) => row.group,
			onExpandedChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(state.expanded);
				dispatch(animationsActions.setExpanded(nextState));
			},
		},
		// Selection
		{
			enableRowSelection: true,
			positionToolbarAlertBanner: 'bottom',
			onRowSelectionChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(state.rowSelection);
				dispatch(animationsActions.setRowSelection(nextState));
			},
		},
		// Sorting
		{
			enableMultiSort: true,
			enableSortingRemoval: false,
			onSortingChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(state.sorting);
				dispatch(animationsActions.setSorting(nextState));
			},
		},
		// // Filtering
		// {
		// 	muiSearchTextFieldProps: { sx: { backgroundColor: 'red' } },
		// 	onColumnFiltersChange: (updater) => {
		// 		if (typeof updater !== 'function') return;
		// 		const nextState = updater(state.columnFilters);
		// 		dispatch(animationsActions.setColumnFilters(nextState));
		// 	},
		// 	onGlobalFilterChange: (updater) => {
		// 		// if (typeof updater !== 'function') return;
		// 		const nextState = updater(state.globalFilter);
		// 		dispatch(animationsActions.setGlobalFilter(nextState));
		// 	},
		// },
		// Visibility
		{
			onColumnVisibilityChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(state.columnVisibility);
				dispatch(animationsActions.setColumnVisibility(nextState));
			},
		},
		// Pinning
		{
			enableColumnPinning: true,
			onColumnPinningChange: (updater) => {
				if (typeof updater !== 'function') return;
				const nextState = updater(state.columnPinning);
				dispatch(animationsActions.setColumnPinning(nextState));
			},
		},
	];

	return stateProps.reduce((stateProps, props) => ({ ...stateProps, ...props }), {});
};

export default usePlaylistStateProps;
