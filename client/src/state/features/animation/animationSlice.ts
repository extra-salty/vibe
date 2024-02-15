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
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
	animationTable: AnimationTableT;
	staticEffectTable: StaticEffectTableT;
	playlist: {
		loading: boolean;
		expanded: string[];
		selected: string[];
		disabled: string[];
		data: AnimationStateT[];
	};
} = {
	animationTable: { ...initialTableState, data: [] },
	staticEffectTable: { ...initialTableState, data: [] },
	playlist: { loading: false, expanded: [], selected: [], disabled: [], data: [] },
};

export const animationCreatorSlice = createSlice({
	name: 'animationCreator',
	initialState,
	extraReducers: (builder) => {
		// Tables
		builder
			.addCase(getAnimations.pending, (state) => {
				state.animationTable.loading = true;
			})
			.addCase(getAnimations.fulfilled, (state, action) => {
				state.animationTable.data = action.payload;
				state.animationTable.loading = false;
			})
			.addCase(getEffects.pending, (state) => {
				state.staticEffectTable.loading = true;
			})
			.addCase(getEffects.fulfilled, (state, action) => {
				state.staticEffectTable.data = action.payload;
				state.staticEffectTable.loading = false;
			})
			.addCase(createAnimation.pending, (state) => {
				state.animationTable.loading = true;
			})
			.addCase(createAnimation.fulfilled, (state) => {
				state.animationTable.loading = false;
			})
			.addCase(createEffect.pending, (state) => {
				state.animationTable.loading = true;
			})
			.addCase(createEffect.fulfilled, (state) => {
				state.animationTable.loading = false;
			})
			.addCase(deleteAnimations.pending, (state) => {
				state.animationTable.loading = true;
			})
			.addCase(deleteAnimations.fulfilled, (state) => {
				state.animationTable.loading = false;
			})
			.addCase(deleteEffects.pending, (state) => {
				state.animationTable.loading = true;
			})
			.addCase(deleteEffects.fulfilled, (state) => {
				state.animationTable.loading = false;
			});

		// Playlist
		builder
			.addCase(getAnimation.pending, (state) => {
				state.staticEffectTable.loading = true;
			})
			.addCase(
				getAnimation.fulfilled,
				(
					state,
					action: PayloadAction<{ animation: AnimationStateT; index?: number }>,
				) => {
					const { animation, index } = action.payload;

					if (animation) {
						if (index) {
							state.playlist.data.splice(index, 0, animation);
						} else {
							state.playlist.data.push(animation);
						}
					}
					state.staticEffectTable.loading = false;
				},
			);
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
		// Animation - Table
		setAnimationTableData: (state, action: PayloadAction<AnimationBaseT[]>) => {
			state.animationTable.data = action.payload || [];
		},
		setAnimationTableState: (state, action: PayloadAction<GridStateT>) => {
			state.animationTable.state = action.payload;
		},
		setAnimationTableSelection: (state, action: PayloadAction<string[]>) => {
			state.animationTable.selection = action.payload;
		},
		setAnimationTableVisibility: (
			state,
			action: PayloadAction<GridColumnVisibilityModel>,
		) => {
			state.animationTable.visibility = action.payload;
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
	// Animations - Playlist

	// Animations - List
	moveAnimation,
	overAnimation,
	// Effect - List
	addEffect,
	moveEffect,
	// removeEffect,
} = animationCreatorSlice.actions;
