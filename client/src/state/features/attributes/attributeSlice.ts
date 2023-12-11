import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AttributesType } from './attributeSlice.type';

const initialState: AttributesType = {
	color: {
		hue: 0,
		saturation: 100,
		lightness: 50,
	},
};

export const attributesSlice = createSlice({
	name: 'attributes',
	initialState,
	reducers: {
		setHue: (state, action: PayloadAction<number>) => {
			state.color.hue = action.payload;
		},
		setSaturation: (state, action: PayloadAction<number>) => {
			state.color.saturation = action.payload;
		},
		setLightness: (state, action: PayloadAction<number>) => {
			state.color.lightness = action.payload;
		},
		resetColor: (state) => {
			state.color = initialState.color;
		},
	},
});

export const { setHue, setSaturation, setLightness, resetColor } = attributesSlice.actions;

export default attributesSlice.reducer;
