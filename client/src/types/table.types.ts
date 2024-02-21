import {
	MRT_ColumnFiltersState,
	MRT_ColumnPinningState,
	MRT_ExpandedState,
	MRT_RowSelectionState,
	MRT_SortingState,
	MRT_VisibilityState,
} from 'material-react-table';

export enum AnimationTypesT {
	animationGroups = 'animationGroups',
	staticAnimations = 'staticAnimations',
	dynamicAnimations = 'dynamicAnimations',
}

export type TableStateT = {
	isSaving: boolean;
	expanded: MRT_ExpandedState;
	sorting: MRT_SortingState;
	rowSelection: MRT_RowSelectionState;
	columnVisibility: MRT_VisibilityState;
	columnFilters: MRT_ColumnFiltersState;
	columnPinning: MRT_ColumnPinningState;
	globalFilter: any;
};

export const initialTableState: TableStateT = {
	isSaving: false,
	expanded: {},
	sorting: [{ desc: false, id: 'name' }],
	rowSelection: {},
	columnVisibility: { _id: false, description: false, dateCreated: false },
	columnFilters: [],
	columnPinning: {
		left: ['mrt-row-expand', 'mrt-row-select', 'mrt-row-numbers', 'name'],
		right: ['mrt-row-drag', 'actions'],
	},
	globalFilter: '',
};
