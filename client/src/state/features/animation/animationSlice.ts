import { EffectsServiceInstance } from '@/app/api/effects/_service';
import {
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
import { createAnimation, deleteAnimations, getAnimations, getEffects } from './animationApi';

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
	animationPlaylist: { expanded: string[]; selected: string[]; data: AnimationStateT[] };
} = {
	animationTable: { ...initialTableState, data: [] },
	staticEffectTable: { ...initialTableState, data: [] },
	animationPlaylist: { expanded: [], selected: [], data: [] },
};

export const animationCreator = createSlice({
	name: 'animationCreator',
	initialState,
	extraReducers: (builder) => {
		// Get Animations
		builder
			.addCase(getAnimations.pending, (state) => {
				state.animationTable.loading = true;
			})
			.addCase(getAnimations.fulfilled, (state, action) => {
				state.animationTable.data = action.payload;
				state.animationTable.loading = false;
			});
		// Create Animation
		builder.addCase(createAnimation.pending, (state) => {
			state.animationTable.loading = true;
		});
		builder.addCase(createAnimation.fulfilled, (state) => {
			state.animationTable.loading = false;
		});
		// Delete Animations
		builder.addCase(deleteAnimations.pending, (state) => {
			state.animationTable.loading = true;
		});
		builder.addCase(deleteAnimations.fulfilled, (state) => {
			state.animationTable.loading = false;
		});
		// Get Effects
		builder.addCase(getEffects.pending, (state) => {
			state.staticEffectTable.loading = true;
		});
		builder.addCase(getEffects.fulfilled, (state, action) => {
			state.staticEffectTable.data = action.payload;
			state.staticEffectTable.loading = false;
		});
	},
	reducers: {
		// Animation - Table
		setAnimationTableState: (state, action: PayloadAction<GridStateT>) => {
			state.animationTable.state = action.payload;
		},
		setAnimationTableSelection: (state, action: PayloadAction<string[]>) => {
			state.staticEffectTable.selection = action.payload;
		},
		setAnimationTableVisibility: (state, action: PayloadAction<GridColumnVisibilityModel>) => {
			state.staticEffectTable.visibility = action.payload;
		},

		// Static Effect - Table
		setStaticEffectTableState: (state, action: PayloadAction<GridStateT>) => {
			state.staticEffectTable.state = action.payload;
		},
		setStaticEffectTableSelection: (state, action: PayloadAction<string[]>) => {
			state.staticEffectTable.selection = action.payload;
		},
		setStaticEffectTableVisibility: (state, action: PayloadAction<GridColumnVisibilityModel>) => {
			state.staticEffectTable.visibility = action.payload;
		},

		// Animations - Playlist
		setAnimationPlaylistExpansion: (state, action: PayloadAction<string[]>) => {
			state.animationPlaylist.expanded = action.payload;
		},
		setAnimationPlaylistSelection: (state, action: PayloadAction<string[]>) => {
			state.animationPlaylist.selected = action.payload;
		},

		// Animations - List
		selectAnimation: (
			state,
			action: PayloadAction<{ selectedAnimation: AnimationStateT; index?: number }>,
		) => {
			const { selectedAnimation, index } = action.payload;
			const newIndex = index != undefined ? index + 1 : state.animationPlaylist.data.length;
			const includes = state.animationPlaylist.data.find(
				(animation) => animation.name === selectedAnimation.name,
			);

			if (!includes) {
				state.animationPlaylist.data.splice(newIndex, 0, selectedAnimation);
			}
		},
		moveAnimation: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
			const { startIndex, endIndex } = action.payload;
			const temp = state.animationPlaylist.data[startIndex];

			state.animationPlaylist.data[startIndex] = state.animationPlaylist.data[endIndex];
			state.animationPlaylist.data[endIndex] = temp;
		},
		overAnimation: (
			state,
			action: PayloadAction<{ selectedAnimation: AnimationStateT; index: number }>,
		) => {
			const { index, selectedAnimation } = action.payload;
			const includes = state.animationPlaylist.data.find(
				(animation) => animation.name === selectedAnimation.name,
			);

			if (!includes) {
				state.animationPlaylist.data.splice(index, 0, selectedAnimation);
			}
		},

		// Effects - List
		addEffect: (
			state,
			action: PayloadAction<{ animationEffect: AnimationEffectStateT; coordinate: CoordinateT }>,
		) => {
			const {
				animationEffect,
				coordinate: { x, y },
			} = action.payload;

			if (y) {
				state.animationPlaylist.data[x].effects.splice(y, 0, animationEffect);
			} else {
				state.animationPlaylist.data[x].effects.push(animationEffect);
			}
		},
		moveEffect: (
			state,
			action: PayloadAction<{ startCoordinate: CoordinateT; endCoordinate: CoordinateT }>,
		) => {
			const { startCoordinate: start, endCoordinate: end } = action.payload;
			const effect = state.animationPlaylist.data[start.x].effects[start.y];

			if (start.x === end.x) {
				const temp = state.animationPlaylist.data[end.x].effects[end.y];

				state.animationPlaylist.data[end.x].effects[end.y] = effect;
				state.animationPlaylist.data[start.x].effects[start.y] = temp;
			} else {
				state.animationPlaylist.data[start.x].effects.splice(start.y, 1);

				state.animationPlaylist.data[end.x].effects.splice(end.y, 0, effect);
				// if (state.selectedAnimationsDetails[end.x]?.effects) {
				// } else {
				// 	state.selectedAnimationsDetails[end.x].effects.push(effect);
				// }
			}
		},
	},
});

export const {
	// Animation - Table
	setAnimationTableState,
	setAnimationTableSelection,
	setAnimationTableVisibility,
	// Static Effect - Table
	setStaticEffectTableState,
	setStaticEffectTableSelection,
	setStaticEffectTableVisibility,
	// Animations - Playlist
	setAnimationPlaylistSelection,
	setAnimationPlaylistExpansion,
	// Animations - List
	selectAnimation,
	moveAnimation,
	overAnimation,
	// Effect - List
	addEffect,
	moveEffect,
	// removeEffect,
} = animationCreator.actions;

export default animationCreator.reducer;
