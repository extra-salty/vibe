import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { StaticAnimationTableT } from '@/types/effect.types';
import { TableStateT, initialTableState } from '@/types/table.types';
import { createEffect, deleteEffects, getEffects } from './staticEffectsThunk';
import {
	MRT_ColumnFiltersState,
	MRT_ColumnPinningState,
	MRT_SortingState,
	MRT_VisibilityState,
} from 'material-react-table';

const initialState: {
	data: StaticAnimationTableT[];
	state: TableStateT;
} = {
	data: [],
	state: initialTableState,
};

export const staticEffectsSlice = createSlice({
	name: 'staticEffects',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getEffects.fulfilled, (state, action) => {
				state.data = action.payload;
				state.state.isSaving = false;
			})
			.addMatcher(
				isAnyOf(getEffects.pending, createEffect.pending, deleteEffects.pending),
				(state) => {
					state.state.isSaving = true;
				},
			)
			.addMatcher(
				isAnyOf(getEffects.rejected, createEffect.rejected, deleteEffects.rejected),
				(state) => {
					state.state.isSaving = false;
				},
			);
	},
	reducers: {
		setData: (state, action: PayloadAction<StaticAnimationTableT[]>) => {
			state.data = action.payload || [];
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
	},
});

export const staticEffectsActions = staticEffectsSlice.actions;
