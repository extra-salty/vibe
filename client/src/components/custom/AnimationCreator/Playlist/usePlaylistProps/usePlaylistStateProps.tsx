import { useDispatch } from 'react-redux';
import { usePlaylistState } from '@/state/features/playlist/playlistSelector';
import {
	initialPlaylistState,
	playlistActions,
} from '@/state/features/playlist/playlistSlice';
import { AnimationsTablePropsT } from '@/types/animation.types';
import { useEffect, useState } from 'react';
import { MRT_DensityState } from 'material-react-table';

const usePlaylistStateProps = (): AnimationsTablePropsT => {
	const dispatch = useDispatch();
	const state = usePlaylistState();

	const [density, setDensity] = useState<MRT_DensityState>(initialPlaylistState.density);

	useEffect(() => {
		dispatch(playlistActions.setDensity(density));
	}, [density, dispatch]);

	return {
		// State
		state,
		// Internal actions
		onDensityChange: setDensity,
		// Sorting
		enableSorting: false,
		// Expand
		enableExpanding: true,
		enableExpandAll: true,
		getSubRows: (row) => row.children,
		// getSubRows: (row) => row.group,
		onExpandedChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.expanded);
			dispatch(playlistActions.setExpanded(nextState));
		},
		// Selection
		enableRowSelection: true,
		positionToolbarAlertBanner: 'bottom',
		onRowSelectionChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.rowSelection);
			dispatch(playlistActions.setRowSelection(nextState));
		},
		// // Filtering
		muiSearchTextFieldProps: { sx: { backgroundColor: 'red' } },
		onColumnFiltersChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.columnFilters);
			dispatch(playlistActions.setColumnFilters(nextState));
		},
		// 	onGlobalFilterChange: (updater) => {
		// 		// if (typeof updater !== 'function') return;
		// 		const nextState = updater(state.globalFilter);
		// 		dispatch(playlistActions.setGlobalFilter(nextState));
		// 	},
		// },
		// Visibility
		onColumnVisibilityChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.columnVisibility);
			dispatch(playlistActions.setColumnVisibility(nextState));
		},
		// Pinning
		enableColumnPinning: true,
		onColumnPinningChange: (updater) => {
			if (typeof updater !== 'function') return;
			const nextState = updater(state.columnPinning);
			dispatch(playlistActions.setColumnPinning(nextState));
		},
	};
};

export default usePlaylistStateProps;
