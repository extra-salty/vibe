import {
	MRT_ColumnFiltersState,
	MRT_ColumnPinningState,
	MRT_RowSelectionState,
	MRT_SortingState,
	MRT_VisibilityState,
} from 'material-react-table';

export type TableStateT = {
	isSaving: boolean;
	sorting: MRT_SortingState;
	rowSelection: MRT_RowSelectionState;
	columnVisibility: MRT_VisibilityState;
	columnFilters: MRT_ColumnFiltersState;
	columnPinning: MRT_ColumnPinningState;
	globalFilter: any;
};

export const initialTableState: TableStateT = {
	isSaving: false,
	sorting: [{ desc: true, id: 'name' }],
	rowSelection: {},
	columnVisibility: { _id: false, description: false, dateCreated: false },
	columnFilters: [],
	columnPinning: {
		left: ['mrt-row-select', 'mrt-row-numbers', 'name'],
		right: ['actions'],
	},
	globalFilter: '',
};
