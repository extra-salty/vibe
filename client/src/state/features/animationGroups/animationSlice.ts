import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { AnimationStateT, AnimationT } from '@/types/animation.types';
import { createAnimation, deleteAnimations, getAnimations } from './animationsThunk';
import {
	MRT_ColumnFiltersState,
	MRT_ColumnPinningState,
	MRT_DensityState,
	MRT_ExpandedState,
	MRT_SortingState,
	MRT_VisibilityState,
} from 'material-react-table';

export const initialAnimationsState: AnimationStateT = {
	isSaving: false,
	expanded: {},
	sorting: [
		{ id: 'type', desc: true },
		{ id: 'name', desc: false },
	],
	rowSelection: {},
	columnVisibility: { _id: false, description: false, dateCreated: false },
	columnFilters: [],
	columnPinning: {
		left: ['mrt-row-expand', 'mrt-row-select', 'mrt-row-numbers', 'name'],
		right: ['mrt-row-drag', 'actions'],
	},
	globalFilter: '',
	density: 'compact',
};

const initialState: {
	data: AnimationT[];
	state: AnimationStateT;
} = {
	data: [],
	state: initialAnimationsState,
};

export const animationsSlice = createSlice({
	name: 'animations',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getAnimations.fulfilled, (state, action) => {
				state.data = action.payload;
				state.state.isSaving = false;
			})
			.addMatcher(
				isAnyOf(getAnimations.pending, createAnimation.pending, deleteAnimations.pending),
				(state) => {
					state.state.isSaving = true;
				},
			)
			.addMatcher(
				isAnyOf(
					getAnimations.rejected,
					createAnimation.rejected,
					deleteAnimations.rejected,
				),
				(state) => {
					state.state.isSaving = false;
				},
			);
	},
	reducers: {
		setData: (state, action: PayloadAction<AnimationT[]>) => {
			state.data = action.payload || [];
		},
		setExpanded: (state, action: PayloadAction<MRT_ExpandedState>) => {
			state.state.expanded = action.payload;
		},
		setRowSelection: (state, action: PayloadAction<Record<string, boolean>>) => {
			state.state.rowSelection = action.payload;
		},
		setSorting: (state, action: PayloadAction<MRT_SortingState>) => {
			state.state.sorting = action.payload;
		},
		setColumnFilters: (state, action: PayloadAction<MRT_ColumnFiltersState>) => {
			state.state.columnFilters = action.payload;
		},
		setGlobalFilter: (state, action: PayloadAction<string | number>) => {
			state.state.globalFilter = action.payload;
		},
		setColumnVisibility: (state, action: PayloadAction<MRT_VisibilityState>) => {
			state.state.columnVisibility = action.payload;
		},
		setColumnPinning: (state, action: PayloadAction<MRT_ColumnPinningState>) => {
			state.state.columnPinning = action.payload;
		},
		setDensity: (state, action: PayloadAction<MRT_DensityState>) => {
			state.state.density = action.payload;
		},
		resetState: (state) => {
			state.state = initialAnimationsState;
		},
	},
});

export const animationsActions = animationsSlice.actions;
