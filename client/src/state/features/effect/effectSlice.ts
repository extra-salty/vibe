import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Coordinate, EffectType, Effects, setLedColorActionType } from './effectSlice.type';
import { ColorType } from '../attribute/attributeSlice.type';

const NUMBER_OF_COLUMNS = 24;
const NUMBER_OF_ROWS = 12;
const DEFAULT_COLOR: ColorType = {
	hue: 0,
	saturation: 50,
	lightness: 100,
};

const initialState: EffectType = {
	name: Effects.welcome,
	current: Array(NUMBER_OF_COLUMNS)
		.fill(null)
		.map(() => Array(NUMBER_OF_ROWS).fill(DEFAULT_COLOR)),
	history: undefined,
};

export const effect = createSlice({
	name: 'effect',
	initialState,
	reducers: {
		resetLedMatrix: (state) => {
			state = initialState;
		},
		setLedColor: (state, action: PayloadAction<setLedColorActionType>) => {
			const {
				coordinate: { x, y },
				selectedColor,
			} = action.payload;
			state.current[x][y] = selectedColor;
		},
	},
});

export const { setLedColor, resetLedMatrix } = effect.actions;

export default effect.reducer;
