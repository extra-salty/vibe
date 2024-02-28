import { ColorT } from '@/types/color.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const DEFAULT_COLOR: ColorT = {
	hue: 0,
	saturation: 100,
	lightness: 0,
};

const initialState: {
	selectedColor: ColorT;
	colorHistory: ColorT[];
	colorPresets: ColorT[];
} = {
	selectedColor: DEFAULT_COLOR,
	colorHistory: [],
	colorPresets: [],
};

export const colorSlice = createSlice({
	name: 'color',
	initialState,
	reducers: {
		setHue: (state, action: PayloadAction<number>) => {
			state.selectedColor.hue = action.payload;
		},
		setSaturation: (state, action: PayloadAction<number>) => {
			state.selectedColor.saturation = action.payload;
		},
		setLightness: (state, action: PayloadAction<number>) => {
			state.selectedColor.lightness = action.payload;
		},
		setColor: (state, action: PayloadAction<ColorT>) => {
			state.selectedColor = action.payload;
		},
		resetColor: (state) => {
			state.selectedColor = DEFAULT_COLOR;
		},
	},
});

export const colorActions = colorSlice.actions;
