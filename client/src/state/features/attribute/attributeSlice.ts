import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ColorType } from './attributeSlice.type';

const initialState: ColorType = {
	hue: 0,
	saturation: 100,
	lightness: 50,
};

export const attributeSlice = createSlice({
	name: 'attribute',
	initialState,
	reducers: {
		setHue: (state, action: PayloadAction<number>) => {
			state.hue = action.payload;
		},
		setSaturation: (state, action: PayloadAction<number>) => {
			state.saturation = action.payload;
		},
		setLightness: (state, action: PayloadAction<number>) => {
			state.lightness = action.payload;
		},
		resetColor: (state) => {
			state = initialState;
		},
	},
});

export const { setHue, setSaturation, setLightness, resetColor } = attributeSlice.actions;

export default attributeSlice.reducer;
