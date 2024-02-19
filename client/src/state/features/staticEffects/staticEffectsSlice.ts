import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { EffectTableT } from '@/types/effect.types';
import { TableStateT, initialTableState } from '@/types/table.types';
import { createEffect, deleteEffects, getEffects } from './staticEffectsThunk';
import {
	MRT_ColumnFiltersState,
	MRT_ColumnPinningState,
	MRT_SortingState,
	MRT_VisibilityState,
} from 'material-react-table';

const initialState: {
	data: EffectTableT[];
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
		setStaticEffectsData: (state, action: PayloadAction<EffectTableT[]>) => {
			state.data = action.payload || [];
		},
		setStaticEffectsRowSelection: (
			state,
			action: PayloadAction<Record<string, boolean>>,
		) => {
			state.state.rowSelection = action.payload;
		},
		setStaticEffectsSorting: (state, action: PayloadAction<MRT_SortingState>) => {
			state.state.sorting = action.payload;
		},
		setStaticEffectsColumnFilters: (
			state,
			action: PayloadAction<MRT_ColumnFiltersState>,
		) => {
			state.state.columnFilters = action.payload;
		},
		setStaticEffectsGlobalFilter: (state, action: PayloadAction<string | number>) => {
			state.state.globalFilter = action.payload;
		},
		setStaticEffectsColumnVisibility: (
			state,
			action: PayloadAction<MRT_VisibilityState>,
		) => {
			state.state.columnVisibility = action.payload;
		},
		setStaticEffectsColumnPinning: (
			state,
			action: PayloadAction<MRT_ColumnPinningState>,
		) => {
			state.state.columnPinning = action.payload;
		},
	},
});

export const staticEffectsActions = staticEffectsSlice.actions;
