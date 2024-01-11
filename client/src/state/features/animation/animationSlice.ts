import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnimationCreatorT, AnimationEffectT, AnimationT } from './animation.types';
import { CoordinateT } from '../effect/effectSlice.types';

const initialState: AnimationCreatorT = {
	selectedEffects: [],
	selectedAnimations: [],
	animations: [],
};

export const animationCreator = createSlice({
	name: 'animationCreator',
	initialState,
	reducers: {
		// Animations - Table
		addSelectedAnimation: (state, action: PayloadAction<string>) => {
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

		// Animations - List
		selectAnimation: (state, action: PayloadAction<AnimationT>) => {
			const selectedAnimation = action.payload;
			const includes = state.animations.find(
				(animation) => animation.name === selectAnimation.name,
			);

			if (!includes) {
				state.animations.push(selectedAnimation);
			}
		},
		moveAnimation: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
			const { startIndex, endIndex } = action.payload;
			const temp = state.animations[startIndex];

			state.animations[startIndex] = state.animations[endIndex];
			state.animations[endIndex] = temp;
		},

		// Effects - Table
		addSelectedEffect: (state, action: PayloadAction<string>) => {
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

		// Effects - List
		moveEffect: (
			state,
			action: PayloadAction<{ startCoordinate: CoordinateT; endCoordinate: CoordinateT }>,
		) => {
			const { startCoordinate: start, endCoordinate: end } = action.payload;
			const effect = state.animations[start.x].effects[start.y];

			if (start.x === end.x) {
				const temp = state.animations[end.x].effects[end.y];

				state.animations[end.x].effects[end.y] = effect;
				state.animations[start.x].effects[start.y] = temp;
			} else {
				state.animations[start.x].effects.splice(start.y, 1);

				state.animations[end.x].effects.splice(end.y, 0, effect);
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

			state.animations[end.x].effects.splice(end.y, 0, effect);
		},
		removeEffect: (state, action: PayloadAction<{ startCoordinate: CoordinateT }>) => {},
	},
});

export const {
	// Effects
	addSelectedEffect,
	removeSelectedEffects,
	// Animations - Table
	addSelectedAnimation,
	removeSelectedAnimations,
	// Animations - List
	selectAnimation,
	moveAnimation,
	moveEffect,
	addEffect,
	removeEffect,
} = animationCreator.actions;

export default animationCreator.reducer;
