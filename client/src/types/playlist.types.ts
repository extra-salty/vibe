import {
	MRT_ColumnFiltersState,
	MRT_ColumnPinningState,
	MRT_DensityState,
	MRT_ExpandedState,
	MRT_RowSelectionState,
	MRT_VisibilityState,
} from 'material-react-table';

export type PlaylistStateT = {
	isSaving: boolean;
	expanded: MRT_ExpandedState;
	// sorting: MRT_SortingState;
	rowSelection: MRT_RowSelectionState;
	columnVisibility: MRT_VisibilityState;
	columnPinning: MRT_ColumnPinningState;
	columnFilters: MRT_ColumnFiltersState;
	globalFilter: any;
	density: MRT_DensityState;
};
