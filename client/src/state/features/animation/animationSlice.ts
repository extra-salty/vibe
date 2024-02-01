import { AnimationEffectStateT, AnimationStateT } from '@/types/animation.types';
import { CoordinateT } from '@/types/misc.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: {
	selectedAnimations: string[];
	animations: AnimationStateT[];
} = {
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
		setSelectedAnimations: (state, action: PayloadAction<string[]>) => {
			state.selectedAnimations = action.payload;
		},
		resetSelectedAnimations: (state) => {
			state.selectedAnimations = [];
		},

		// // Effects - Table
		// addSelectedEffect: (state, action: PayloadAction<string>) => {
		// 	const name = action.payload;
		// 	const index = state.selectedEffects.indexOf(name);

		// 	if (index < 0) {
		// 		state.selectedEffects.push(name);
		// 	} else {
		// 		state.selectedEffects.splice(index, 1);
		// 	}
		// },
		// removeSelectedEffects: (state, action: PayloadAction<string[]>) => {
		// 	const names = action.payload;

		// 	names.map((name) => {
		// 		const index = state.selectedEffects.indexOf(name);

		// 		state.selectedEffects.splice(index, 1);
		// 	});
		// },
		// setSelectedEffects: (state, action: PayloadAction<string[]>) => {
		// 	state.selectedEffects = action.payload;
		// },
		// resetSelectedEffects: (state) => {
		// 	state.selectedEffects = [];
		// },

		// Animations - List
		selectAnimation: (
			state,
			action: PayloadAction<{ selectedAnimation: AnimationStateT; index?: number }>,
		) => {
			const { selectedAnimation, index } = action.payload;
			const newIndex = index != undefined ? index + 1 : state.animations.length;
			const includes = state.animations.find(
				(animation) => animation.name === selectedAnimation.name,
			);

			if (!includes) {
				state.animations.splice(newIndex, 0, selectedAnimation);
			}
		},
		moveAnimation: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
			const { startIndex, endIndex } = action.payload;
			const temp = state.animations[startIndex];

			state.animations[startIndex] = state.animations[endIndex];
			state.animations[endIndex] = temp;
		},
		overAnimation: (
			state,
			action: PayloadAction<{ selectedAnimation: AnimationStateT; index: number }>,
		) => {
			const { index, selectedAnimation } = action.payload;
			const includes = state.animations.find(
				(animation) => animation.name === selectedAnimation.name,
			);

			if (!includes) {
				state.animations.splice(index, 0, selectedAnimation);
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
				state.animations[x].effects.splice(y, 0, animationEffect);
			} else {
				state.animations[x].effects.push(animationEffect);
			}
		},
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
	},
});

export const {
	// Animations - Table
	addSelectedAnimation,
	removeSelectedAnimations,
	setSelectedAnimations,
	resetSelectedAnimations,
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
