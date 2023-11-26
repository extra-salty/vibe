import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ColorType = {
	hue: number;
	saturation: number;
	lightness: number;
};

const initialState: ColorType = {
	hue: 0,
	saturation: 100,
	lightness: 50,
};

export const colorSlice = createSlice({
	name: 'color',
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

export const { setHue, setSaturation, setLightness, resetColor } = colorSlice.actions;

export default colorSlice.reducer;
