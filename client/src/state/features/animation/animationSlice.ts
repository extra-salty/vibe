import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnimationCreatorT, AnimationEffectT, AnimationT } from './animation.types';
import { CoordinateT } from '../effect/effectSlice.types';

const initialState: AnimationCreatorT = {
	selectedEffects: [],
	selectedAnimations: [],
	selectedAnimationsDetails: [],
};

export const animationCreator = createSlice({
	name: 'animationCreator',
	initialState,
	reducers: {
		// Effects
		setSelectedEffect: (state, action: PayloadAction<string>) => {
			const name = action.payload;
			const index = state.selectedEffects.indexOf(name);

			if (index < 0) {
				state.selectedEffects.push(name);
			} else {
				state.selectedEffects.splice(index, 1);
			}
		},
		removeSelectedEffects: (state, action: PayloadAction<string[]>) => {
			const names = action.payload;

			names.map((name) => {
				const index = state.selectedEffects.indexOf(name);

				state.selectedEffects.splice(index, 1);
			});
		},

		// Animations
		setSelectedAnimations: (state, action: PayloadAction<string>) => {
			const name = action.payload;
			const index = state.selectedAnimations.indexOf(name);

			if (index < 0) {
				state.selectedAnimations.push(name);
			} else {
				state.selectedAnimations.splice(index, 1);
			}
		},
		removeSelectedAnimations: (state, action: PayloadAction<string[]>) => {
			const names = action.payload;

			names.map((name) => {
				const index = state.selectedAnimations.indexOf(name);

				state.selectedAnimations.splice(index, 1);
			});
		},
		setSelectedAnimationsDetails: (state, action: PayloadAction<AnimationT>) => {
			const includes = state.selectedAnimationsDetails.find(
				(animation) => animation.name === action.payload.name,
			);

			if (!includes) {
				state.selectedAnimationsDetails.push(action.payload);
			}
		},
		moveEffect: (
			state,
			action: PayloadAction<{ startCoordinate: CoordinateT; endCoordinate: CoordinateT }>,
		) => {
			const { startCoordinate: start, endCoordinate: end } = action.payload;
			const effect = state.selectedAnimationsDetails[start.x].effects[start.y];

			if (start.x === end.x) {
				const temp = state.selectedAnimationsDetails[end.x].effects[end.y];

				state.selectedAnimationsDetails[end.x].effects[end.y] = effect;
				state.selectedAnimationsDetails[start.x].effects[start.y] = temp;
			} else {
				state.selectedAnimationsDetails[start.x].effects.splice(start.y, 1);

				state.selectedAnimationsDetails[end.x].effects.splice(end.y, 0, effect);
				// if (state.selectedAnimationsDetails[end.x]?.effects) {
				// } else {
				// 	state.selectedAnimationsDetails[end.x].effects.push(effect);
				// }
			}
		},
		addEffect: (
			state,
			action: PayloadAction<{ effectName: string; endCoordinate: CoordinateT }>,
		) => {
			const { effectName, endCoordinate: end } = action.payload;
			const effect: AnimationEffectT = { name: effectName, repeat: 1, type: 'static' };

			state.selectedAnimationsDetails[end.x].effects.splice(end.y, 0, effect);
		},
		removeEffect: (state, action: PayloadAction<{ startCoordinate: CoordinateT }>) => {},
	},
});

export const {
	// Effects
	setSelectedEffect,
	removeSelectedEffects,
	// Animations
	setSelectedAnimations,
	removeSelectedAnimations,
	setSelectedAnimationsDetails,
	moveEffect,
	addEffect,
	removeEffect,
} = animationCreator.actions;

export default animationCreator.reducer;
