import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnimationCreatorT, AnimationT } from './animation.types';
import { CoordinateT } from '../effect/effectSlice.types';

const initialState: AnimationCreatorT = {
	selectedAnimations: [],
};

export const animationCreator = createSlice({
	name: 'animationCreator',
	initialState,
	reducers: {
		setSelectedAnimations: (state, action: PayloadAction<AnimationT>) => {
			const includes = state.selectedAnimations.find(
				(animation) => animation.name === action.payload.name,
			);

			if (!includes) {
				state.selectedAnimations.push(action.payload);
			}
		},
		moveAnimationEffect: (
			state,
			action: PayloadAction<{ startCoordinate: CoordinateT; endCoordinate: CoordinateT }>,
		) => {
			const { startCoordinate: start, endCoordinate: end } = action.payload;
			const effect = state.selectedAnimations[start.x].effects[start.y];

			if (start.x === end.x) {
				const temp = state.selectedAnimations[end.x].effects[end.y];

				state.selectedAnimations[end.x].effects[end.y] = effect;
				state.selectedAnimations[start.x].effects[start.y] = temp;
			} else {
				state.selectedAnimations[start.x].effects.splice(start.y, 1);

				if (state.selectedAnimations[end.x]?.effects) {
					state.selectedAnimations[end.x].effects.splice(end.y, 0, effect);
				} else {
					state.selectedAnimations[end.x].effects.push(effect);
				}
			}
		},
		deleteAnimationEffect: (state, action: PayloadAction<{ startCoordinate: CoordinateT }>) => {},
	},
});

export const { setSelectedAnimations, moveAnimationEffect, deleteAnimationEffect } =
	animationCreator.actions;

export default animationCreator.reducer;
