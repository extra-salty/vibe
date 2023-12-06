import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Actions, EffectType, Effects, setLedColorActionType } from './effectSlice.type';
import { ColorType } from '../attributes/attributeSlice.type';

const NUMBER_OF_COLUMNS = 24;
const NUMBER_OF_ROWS = 12;
const DEFAULT_COLOR: ColorType = {
	hue: 0,
	saturation: 50,
	lightness: 100,
};

const initialState: EffectType = {
	name: Effects.welcome,
	ledMatrix: Array(NUMBER_OF_COLUMNS)
		.fill(null)
		.map(() => Array(NUMBER_OF_ROWS).fill(DEFAULT_COLOR)),
	history: undefined,
	actionsState: {
		[Actions.reset]: false,
	},
};

export const effect = createSlice({
	name: 'effect',
	initialState,
	reducers: {
		resetLedMatrix: (state) => {
			state.ledMatrix = initialState.ledMatrix;
		},
		setLedColor: (state, action: PayloadAction<setLedColorActionType>) => {
			const {
				coordinate: { x, y },
				color,
			} = action.payload;
			state.ledMatrix[x][y] = color;
		},
	},
});

export const { setLedColor, resetLedMatrix } = effect.actions;

export default effect.reducer;
