import { AnimationT } from '@/types/animation.types';
import { TableStateT, initialTableState } from '@/types/table.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	MRT_ColumnFiltersState,
	MRT_ColumnPinningState,
	MRT_SortingState,
	MRT_VisibilityState,
} from 'material-react-table';

const initialState: {
	data: AnimationT[] | any;
	state: Omit<TableStateT, 'columnFilters' | 'globalFilter'>;
} = {
	data: [],
	state: initialTableState,
};

export const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	extraReducers: (builder) => {},
	reducers: {
		setData: (state, action: PayloadAction<AnimationT[]>) => {
			state.data = action.payload || [];
		},
		setRowSelection: (state, action: PayloadAction<Record<string, boolean>>) => {
			state.state.rowSelection = action.payload;
		},
		setSorting: (state, action: PayloadAction<MRT_SortingState>) => {
			state.state.sorting = action.payload;
		},
		// setColumnFilters: (state, action: PayloadAction<MRT_ColumnFiltersState>) => {
		// 	state.state.columnFilters = action.payload;
		// },
		// setGlobalFilter: (state, action: PayloadAction<string | number>) => {
		// 	state.state.globalFilter = action.payload;
		// },
		setColumnVisibility: (state, action: PayloadAction<MRT_VisibilityState>) => {
			state.state.columnVisibility = action.payload;
		},
		setColumnPinning: (state, action: PayloadAction<MRT_ColumnPinningState>) => {
			state.state.columnPinning = action.payload;
		},
	},
});

export const playlistAction = playlistSlice.actions;

// Animations - List
// moveAnimation: (
// 	state,
// 	action: PayloadAction<{ startIndex: number; endIndex: number }>,
// ) => {
// 	const { startIndex, endIndex } = action.payload;
// 	const temp = state.playlist.data[startIndex];

// 	state.playlist.data[startIndex] = state.playlist.data[endIndex];
// 	state.playlist.data[endIndex] = temp;
// },
// overAnimation: (
// 	state,
// 	action: PayloadAction<{ selectedAnimation: AnimationStateT; index: number }>,
// ) => {
// 	const { index, selectedAnimation } = action.payload;
// 	const includes = state.playlist.data.find(
// 		(animation) => animation.name === selectedAnimation.name,
// 	);

// 	if (!includes) {
// 		state.playlist.data.splice(index, 0, selectedAnimation);
// 	}
// },

// Effects - List
// addEffect: (
// 	state,
// 	action: PayloadAction<{
// 		animationEffect: AnimationEffectStateT;
// 		coordinate: CoordinateT;
// 	}>,
// ) => {
// 	const {
// 		animationEffect,
// 		coordinate: { x, y },
// 	} = action.payload;

// 	if (y) {
// 		state.playlist.data[x].effects.splice(y, 0, animationEffect);
// 	} else {
// 		state.playlist.data[x].effects.push(animationEffect);
// 	}
// },
// moveEffect: (
// 	state,
// 	action: PayloadAction<{ startCoordinate: CoordinateT; endCoordinate: CoordinateT }>,
// ) => {
// 	const { startCoordinate: start, endCoordinate: end } = action.payload;
// 	const effect = state.playlist.data[start.x].effects[start.y];

// 	if (start.x === end.x) {
// 		const temp = state.playlist.data[end.x].effects[end.y];

// 		state.playlist.data[end.x].effects[end.y] = effect;
// 		state.playlist.data[start.x].effects[start.y] = temp;
// 	} else {
// 		state.playlist.data[start.x].effects.splice(start.y, 1);

// 		state.playlist.data[end.x].effects.splice(end.y, 0, effect);
// 		// if (state.selectedAnimationsDetails[end.x]?.effects) {
// 		// } else {
// 		// 	state.selectedAnimationsDetails[end.x].effects.push(effect);
// 		// }
// 	}
// },
