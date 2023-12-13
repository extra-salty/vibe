import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ColorT, EffectCreatorT, setLedColorActionT } from './effectSlice.type';
import { Actions } from './effectSlice.enum';

const NUMBER_OF_COLUMNS = 24;
const NUMBER_OF_ROWS = 12;
const DEFAULT_COLOR: ColorT = {
	hue: 0,
	saturation: 0,
	lightness: 100,
};
const initialFrame = {
	data: Array(NUMBER_OF_COLUMNS).fill(Array(NUMBER_OF_ROWS).fill(DEFAULT_COLOR)),
	duration: 1,
};

const initialState: EffectCreatorT = {
	color: {
		hue: 0,
		saturation: 100,
		lightness: 50,
	},
	effect: {
		name: '',
		description: '',
		activeFrame: 0,
		frames: [initialFrame],
	},
	actionsState: {
		[Actions.reset]: false,
	},
};

export const effectCreator = createSlice({
	name: 'effectCreator',
	initialState,
	reducers: {
		// Color update
		setHue: (state, action: PayloadAction<number>) => {
			state.color.hue = action.payload;
		},
		setSaturation: (state, action: PayloadAction<number>) => {
			state.color.saturation = action.payload;
		},
		setLightness: (state, action: PayloadAction<number>) => {
			state.color.lightness = action.payload;
		},
		setColor: (state, action: PayloadAction<ColorT>) => {
			state.color = action.payload;
		},
		resetColor: (state) => {
			state.color = initialState.color;
		},
		// Frame Actions
		resetFrame: (state, action: PayloadAction<{ index: number }>) => {
			const { index } = action.payload;
			state.effect.frames[index] = initialFrame;
		},
		addFrame: (state) => {
			state.effect.frames.push(initialFrame);
			state.effect.activeFrame++;
		},
		duplicateFrame: (state, action: PayloadAction<{ index: number }>) => {
			const { index } = action.payload;
			const newFrame = state.effect.frames[index];
			state.effect.frames.splice(index, 0, newFrame);
		},
		deleteFrame: (state, action: PayloadAction<{ index: number }>) => {
			const { index } = action.payload;
			state.effect.activeFrame = 0;
			state.effect.frames.splice(index, 1);
		},
		nextFrame: (state) => {
			state.effect.activeFrame++;
		},
		prevFrame: (state) => {
			state.effect.activeFrame--;
		},
		// Frame update
		setFrameCellColor: (state, action: PayloadAction<setLedColorActionT>) => {
			const {
				frameIndex,
				coordinate: { x, y },
			} = action.payload;
			state.effect.frames[frameIndex].data[x][y] = state.color;
		},
		setFrameDuration: (state, action: PayloadAction<{ index: number; value: number }>) => {
			const { index, value } = action.payload;
			state.effect.frames[index].duration = value;
		},
	},
});

export const {
	// Color update
	setHue,
	setSaturation,
	setLightness,
	resetColor,
	// Frame actions
	resetFrame,
	addFrame,
	duplicateFrame,
	deleteFrame,
	nextFrame,
	prevFrame,
	// Frame update
	setFrameCellColor,
	setFrameDuration,
} = effectCreator.actions;

export default effectCreator.reducer;
