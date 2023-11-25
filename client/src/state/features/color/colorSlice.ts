import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ColorType = {
	hue: number;
	saturation: number;
	lightness: number;
};

const initialState: ColorType = {
	hue: 0,
	saturation: 0,
	lightness: 0,
};

export const colorSlice = createSlice({
	name: 'color',
	initialState,
	reducers: {
		setHue: (state, action: PayloadAction<number>) => {
			state.hue = action.payload;
		},
		setSaturation: (state, action: PayloadAction<number>) => {
			state.hue = action.payload;
		},
		setLightness: (state, action: PayloadAction<number>) => {
			state.hue = action.payload;
		},
		resetColor: (state) => {
			state = initialState;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setHue, setSaturation, setLightness, resetColor } = colorSlice.actions;

export default colorSlice.reducer;
