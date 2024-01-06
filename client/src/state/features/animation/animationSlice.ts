import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnimationCreatorT } from './animation.types';

const initialState: AnimationCreatorT = {
	animations: [],
};

export const animationCreator = createSlice({
	name: 'animation',
	initialState,
	reducers: {
		setSelectedEffects: (state, action: PayloadAction<{ _id: string }>) => {
			// const { _id } = action.payload;
		},
	},
});

export const { setSelectedEffects } = animationCreator.actions;

export default animationCreator.reducer;
