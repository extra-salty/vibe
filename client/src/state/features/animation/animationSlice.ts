import {
	AnimationBaseT,
	AnimationEffectStateT,
	AnimationStateT,
	AnimationTableT,
	GridStateT,
	StaticEffectTableT,
	TableT,
} from '@/types/animation.types';
import { CoordinateT } from '@/types/misc.types';
import { GridColumnVisibilityModel, GridLogicOperator } from '@mui/x-data-grid';
import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
	createAnimation,
	createEffect,
	deleteAnimations,
	deleteEffects,
	getAnimation,
	getAnimations,
	getEffect,
	getEffects,
} from './animationApi';
import { EffectTableT } from '@/types/effect.types';
import {
	MRT_ColumnFiltersState,
	MRT_RowSelectionState,
	MRT_SortingState,
	MRT_VisibilityState,
} from 'material-react-table';

export const initialTableState: TableT = {
	loading: false,
	state: {
		sorting: { sortModel: [] },
		filter: {
			filterModel: {
				items: [],
				logicOperator: GridLogicOperator.And,
				quickFilterLogicOperator: GridLogicOperator.And,
				quickFilterValues: [],
			},
		},
	},
	selection: [],
	visibility: { _id: false, description: false, dateCreated: false },
};

const initialState: {
	animations: {
		data: AnimationBaseT[];
		loading: boolean;
		state: {
			sorting: MRT_SortingState;
			rowSelection: MRT_RowSelectionState;
			columnVisibility: MRT_VisibilityState;
			columnFilters: MRT_ColumnFiltersState;
			globalFilter: any;
		};
		expanded: false;
	};
	staticEffectTable: StaticEffectTableT;
	playlist: {
		loading: boolean;
		expanded: string[];
		selected: string[];
		disabled: string[];
		data: AnimationStateT[];
	};
} = {
	animations: {
		data: [],
		loading: false,
		state: {
			sorting: [{ desc: true, id: 'name' }],
			rowSelection: {},
			columnVisibility: { _id: false, description: false, dateCreated: false },
			columnFilters: [],
			globalFilter: '',
		},
		expanded: false,
	},
	staticEffectTable: { ...initialTableState, data: [] },
	playlist: { loading: false, expanded: [], selected: [], disabled: [], data: [] },
};

export const animationCreatorSlice = createSlice({
	name: 'animationCreator',
	initialState,
	extraReducers: (builder) => {
		// Tables
		builder
			.addCase(getAnimations.fulfilled, (state, action) => {
				state.animations.data = action.payload;
				state.animations.loading = false;
			})
			.addCase(getEffects.fulfilled, (state, action) => {
				state.staticEffectTable.data = action.payload;
				state.staticEffectTable.loading = false;
			})
			.addMatcher(
				isAnyOf(getAnimations.pending, createAnimation.pending, deleteAnimations.pending),
				(state) => {
					state.animations.loading = true;
				},
			)
			.addMatcher(
				isAnyOf(getEffects.pending, createEffect.pending, deleteEffects.pending),
				(state) => {
					state.staticEffectTable.loading = true;
				},
			)
			.addMatcher(
				isAnyOf(
					getAnimations.rejected,
					createAnimation.rejected,
					deleteAnimations.rejected,
				),
				(state) => {
					state.animations.loading = false;
				},
			)
			.addMatcher(
				isAnyOf(
					getAnimations.rejected,
					createAnimation.rejected,
					deleteAnimations.rejected,
				),
				(state) => {
					state.animations.loading = false;
				},
			);

		// Playlist
		// builder
		// 	.addCase(getAnimation.pending, (state) => {
		// 		state.staticEffectTable.loading = true;
		// 	})
		// 	.addCase(
		// 		getAnimation.fulfilled,
		// 		(
		// 			state,
		// 			action: PayloadAction<{ animation: AnimationStateT; index?: number }>,
		// 		) => {
		// 			const { animation, index } = action.payload;

		// 			if (animation) {
		// 				if (index) {
		// 					state.playlist.data.splice(index, 0, animation);
		// 				} else {
		// 					state.playlist.data.push(animation);
		// 				}
		// 			}
		// 			state.staticEffectTable.loading = false;
		// 		},
		// 	);
		// builder
		// 	.addCase(getEffect.pending, (state) => {
		// 		state.staticEffectTable.loading = true;
		// 	})
		// 	.addCase(
		// 		getAnimation.fulfilled,
		// 		(
		// 			state,
		// 			action: PayloadAction<{ animation: AnimationStateT; index?: number }>,
		// 		) => {
		// 			const { animation, index } = action.payload;

		// 			if (animation) {
		// 				if (index) {
		// 					state.playlist.data.splice(index, 0, animation);
		// 				} else {
		// 					state.playlist.data.push(animation);
		// 				}
		// 			}
		// 			state.staticEffectTable.loading = false;
		// 		},
		// 	);
	},
	reducers: {
		setAnimationsData: (state, action: PayloadAction<AnimationBaseT[]>) => {
			state.animations.data = action.payload || [];
		},
		setAnimationsRowSelection: (
			state,
			action: PayloadAction<Record<string, boolean>>,
		) => {
			state.animations.state.rowSelection = action.payload;
		},
		setAnimationsSorting: (state, action: PayloadAction<MRT_SortingState>) => {
			state.animations.state.sorting = action.payload;
		},
		setAnimationsColumnFilters: (
			state,
			action: PayloadAction<MRT_ColumnFiltersState>,
		) => {
			state.animations.state.columnFilters = action.payload;
		},
		setAnimationsGlobalFilter: (state, action: PayloadAction<string | number>) => {
			state.animations.state.globalFilter = action.payload;
		},
		setAnimationsColumnVisibility: (
			state,
			action: PayloadAction<MRT_VisibilityState>,
		) => {
			state.animations.state.columnVisibility = action.payload;
		},

		// Static Effect - Table
		setStaticEffectTableData: (state, action: PayloadAction<EffectTableT[]>) => {
			state.staticEffectTable.data = action.payload || [];
		},
		setStaticEffectTableState: (state, action: PayloadAction<GridStateT>) => {
			state.staticEffectTable.state = action.payload;
		},
		setStaticEffectTableSelection: (state, action: PayloadAction<string[]>) => {
			state.staticEffectTable.selection = action.payload;
		},
		setStaticEffectTableVisibility: (
			state,
			action: PayloadAction<GridColumnVisibilityModel>,
		) => {
			state.staticEffectTable.visibility = action.payload;
		},

		// Animations - Playlist
		setPlaylistExpansion: (state, action: PayloadAction<string[]>) => {
			state.playlist.expanded = action.payload;
		},
		setPlaylistSelection: (state, action: PayloadAction<string[]>) => {
			state.playlist.selected = action.payload;
		},
		resetPlaylist: (state, action: PayloadAction<string[]>) => {
			state.playlist.selected = [];
			state.playlist.expanded = [];

			state.playlist.data;
		},

		// Animations - List
		moveAnimation: (
			state,
			action: PayloadAction<{ startIndex: number; endIndex: number }>,
		) => {
			const { startIndex, endIndex } = action.payload;
			const temp = state.playlist.data[startIndex];

			state.playlist.data[startIndex] = state.playlist.data[endIndex];
			state.playlist.data[endIndex] = temp;
		},
		overAnimation: (
			state,
			action: PayloadAction<{ selectedAnimation: AnimationStateT; index: number }>,
		) => {
			const { index, selectedAnimation } = action.payload;
			const includes = state.playlist.data.find(
				(animation) => animation.name === selectedAnimation.name,
			);

			if (!includes) {
				state.playlist.data.splice(index, 0, selectedAnimation);
			}
		},

		// Effects - List
		addEffect: (
			state,
			action: PayloadAction<{
				animationEffect: AnimationEffectStateT;
				coordinate: CoordinateT;
			}>,
		) => {
			const {
				animationEffect,
				coordinate: { x, y },
			} = action.payload;

			if (y) {
				state.playlist.data[x].effects.splice(y, 0, animationEffect);
			} else {
				state.playlist.data[x].effects.push(animationEffect);
			}
		},
		moveEffect: (
			state,
			action: PayloadAction<{ startCoordinate: CoordinateT; endCoordinate: CoordinateT }>,
		) => {
			const { startCoordinate: start, endCoordinate: end } = action.payload;
			const effect = state.playlist.data[start.x].effects[start.y];

			if (start.x === end.x) {
				const temp = state.playlist.data[end.x].effects[end.y];

				state.playlist.data[end.x].effects[end.y] = effect;
				state.playlist.data[start.x].effects[start.y] = temp;
			} else {
				state.playlist.data[start.x].effects.splice(start.y, 1);

				state.playlist.data[end.x].effects.splice(end.y, 0, effect);
				// if (state.selectedAnimationsDetails[end.x]?.effects) {
				// } else {
				// 	state.selectedAnimationsDetails[end.x].effects.push(effect);
				// }
			}
		},
	},
});

export const animationActions = animationCreatorSlice.actions;

export const {
	// Animations - List
	moveAnimation,
	overAnimation,
	// Effect - List
	addEffect,
	moveEffect,
	// removeEffect,
} = animationCreatorSlice.actions;
