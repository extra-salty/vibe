import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Actions, ColorT, EffectCreatorT, setLedColorActionT } from './effectSlice.type';

const NUMBER_OF_COLUMNS = 24;
const NUMBER_OF_ROWS = 12;
const DEFAULT_COLOR: ColorT = {
	hue: 0,
	saturation: 0,
	lightness: 100,
};
const initialFrame = Array(NUMBER_OF_COLUMNS).fill(Array(NUMBER_OF_ROWS).fill(DEFAULT_COLOR));

const initialState: EffectCreatorT = {
	color: {
		hue: 0,
		saturation: 100,
		lightness: 50,
	},
	effect: {
		name: '',
		description: '',
		frames: [initialFrame, initialFrame],
		activeFrame: 0,
	},
	actionsState: {
		[Actions.reset]: false,
	},
};

export const effectCreator = createSlice({
	name: 'effectCreator',
	initialState,
	reducers: {
		// Color Actions
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
		resetFrame: (state, action: PayloadAction<{ frameIndex: number }>) => {
			const { frameIndex } = action.payload;
			state.effect.frames[frameIndex] = initialFrame;
		},
		addFrame: (state) => {
			state.effect.frames.push(initialFrame);
		},
		duplicateFrame: (state, action: PayloadAction<{ frameIndex: number }>) => {
			const { frameIndex } = action.payload;
			const newFrame = state.effect.frames[frameIndex];
			state.effect.frames.splice(frameIndex, 0, newFrame);
		},
		deleteFrame: (state, action: PayloadAction<{ frameIndex: number }>) => {
			const { frameIndex } = action.payload;
			const newFrame = state.effect.frames[frameIndex];
			state.effect.frames.splice(frameIndex, 0, newFrame);
		},
		nextFrame: (state) => {
			state.effect.activeFrame++;
		},
		prevFrame: (state) => {
			state.effect.activeFrame--;
		},
		setLedColor: (state, action: PayloadAction<setLedColorActionT>) => {
			const {
				frameIndex,
				coordinate: { x, y },
			} = action.payload;
			state.effect.frames[frameIndex][x][y] = state.color;
		},
	},
});

export const {
	setHue,
	setSaturation,
	setLightness,
	resetColor,
	resetFrame,
	addFrame,
	duplicateFrame,
	nextFrame,
	prevFrame,
	setLedColor,
} = effectCreator.actions;

export default effectCreator.reducer;
