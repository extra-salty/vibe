import {
	AnimationStateT,
	AnimationT,
	AnimationTypesT,
	FrameStateT,
} from '@/types/animation.types';
import { PlaylistIndex, PlaylistStateT } from '@/types/playlist.types';
import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
	MRT_ColumnFiltersState,
	MRT_ColumnPinningState,
	MRT_DensityState,
	MRT_ExpandedState,
	MRT_VisibilityState,
} from 'material-react-table';
import { getAnimationsDetail } from './playlistThunk';

const newStatic: AnimationStateT = {
	type: AnimationTypesT.static,
	name: 'newStatic',
	dateCreated: new Date(),
	dateModified: new Date(),
	framesLength: 0,
	duration: 0,
	power: 0,
	frames: [],
	children: [],
};

const newGroup: AnimationStateT = {
	type: AnimationTypesT.group,
	name: 'newGroup',
	dateCreated: new Date(),
	dateModified: new Date(),
	framesLength: 0,
	duration: 0,
	power: 0,
	children: [],
};

export const initialPlaylistState: PlaylistStateT = {
	isSaving: false,
	expanded: {},
	rowSelection: {},
	columnVisibility: { _id: false, description: false, dateCreated: false },
	columnFilters: [],
	columnPinning: {
		left: ['mrt-row-expand', 'index', 'mrt-row-select', 'name'],
		right: ['mrt-row-drag', 'actions'],
	},
	globalFilter: '',
	density: 'compact',
};

const initialState: {
	children: AnimationStateT[];
	state: PlaylistStateT;
} = {
	children: [],
	state: initialPlaylistState,
};

export const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getAnimationsDetail.fulfilled, (state, action) => {
				const length = state.children.length;
				const { animations, index } = action.payload;

				const addFrameHistory = (animation: AnimationT): AnimationStateT => {
					if (animation.frames) {
						return {
							...animation,
							frames: animation.frames.map((frame) => ({
								...frame,
								undo: [],
								redo: [],
							})),
						};
					} else if (animation.children) {
						return {
							...animation,
							frames: animation.frames as unknown as FrameStateT[],
							children: animation.children.map(addFrameHistory),
						};
					} else {
						return animation as AnimationStateT;
					}
				};

				const animationsWithHistory = animations.map((animation) =>
					addFrameHistory(animation),
				);

				state.children.splice(index || length, 0, ...animationsWithHistory);
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
		setData: (state, action: PayloadAction<AnimationStateT[]>) => {
			state.children = action.payload || [];
		},
		setRowSelection: (state, action: PayloadAction<Record<string, boolean>>) => {
			state.state.rowSelection = action.payload;
		},
		setExpanded: (state, action: PayloadAction<MRT_ExpandedState>) => {
			state.state.expanded = action.payload;
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
			state.state = initialPlaylistState;
		},
		//
		removeAnimation: (state, action: PayloadAction<number[]>) => {
			// const { parentIndexes, childIndex } = action.payload;
			// // const animationIndex = parentIndexes ? parentIndexes[0] : childIndex;
			// if (!parentIndexes) {
			// 	state.children.splice(childIndex, 1);
			// } else {
			// 	state.children[parentIndexes[0]];
			// }
		},
		resetData: (state) => {
			state.children = [];
			state.state.rowSelection = {};
		},
		//
		addGroup: (state, action: PayloadAction<number[]>) => {
			const indexes = action.payload;
			const recursive = (children: AnimationStateT[]) => {};

			const newState = recursive(state.children);

			state.children[0].children?.push(newGroup);
		},
		addStatic: (state, action: PayloadAction<number[]>) => {
			state.children[1].children.push(newStatic);
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
