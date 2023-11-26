import { createSlice } from '@reduxjs/toolkit';
import { ColorType } from '../color/colorSlice';

const NUMBER_OF_COLUMNS = 23;
const NUMBER_OF_ROWS = 12;
const DEFAULT_COLOR: ColorType = {
	hue: 0,
	saturation: 50,
	lightness: 100,
};

export type LEDMatrixType = {
	current: ColorType[][];
	history: ColorType[][][];
};

const initialState: LEDMatrixType = {
	current: Array(NUMBER_OF_COLUMNS)
		.fill(null)
		.map(() => Array(NUMBER_OF_ROWS).fill(DEFAULT_COLOR)),
	history: [],
};

export const ledMatrixSLice = createSlice({
	name: 'ledMatrix',
	initialState,
	reducers: {
		resetLedMatrix: (state) => {
			state = initialState;
		},
	},
});

export const { resetLedMatrix } = ledMatrixSLice.actions;

export default ledMatrixSLice.reducer;
