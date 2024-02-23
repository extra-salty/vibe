import { AnimationT } from '@/types/animation.types';
import { PlaylistStateT } from '@/types/playlist.types';
import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
	MRT_ColumnPinningState,
	MRT_DensityState,
	MRT_ExpandedState,
	MRT_VisibilityState,
} from 'material-react-table';
import { getAnimationsDetail } from './playlistThunk';

export const initialPlaylistState: PlaylistStateT = {
	isSaving: false,
	expanded: {},
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
	state: PlaylistStateT;
} = {
	data: [],
	state: initialPlaylistState,
};

export const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getAnimationsDetail.fulfilled, (state, action) => {
				const length = state.data.length;
				const { animations, index } = action.payload;

				state.data.splice(index || length, 0, ...animations);
				state.state.isSaving = false;
			})
			.addMatcher(isAnyOf(getAnimationsDetail.pending), (state) => {
				state.state.isSaving = true;
			})
			.addMatcher(isAnyOf(getAnimationsDetail.rejected), (state) => {
				state.state.isSaving = false;
			});
	},
	reducers: {
		setData: (state, action: PayloadAction<AnimationT[]>) => {
			state.data = action.payload || [];
		},
		setRowSelection: (state, action: PayloadAction<Record<string, boolean>>) => {
			state.state.rowSelection = action.payload;
		},
		setExpanded: (state, action: PayloadAction<MRT_ExpandedState>) => {
			state.state.expanded = action.payload;
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
		setDensity: (state, action: PayloadAction<MRT_DensityState>) => {
			state.state.density = action.payload;
		},
		resetState: (state) => {
			state.state = initialPlaylistState;
		},
	},
});

export const playlistActions = playlistSlice.actions;

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
