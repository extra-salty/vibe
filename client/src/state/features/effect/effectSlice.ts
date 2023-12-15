import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ColorT, EffectCreatorT, FrameCellLocationT } from './effectSlice.type';
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
	duration: 1000,
	redo: [],
	undo: [],
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
		resetFrame: (state, action: PayloadAction<{ frameIndex: number }>) => {
			const { frameIndex } = action.payload;

			state.effect.frames[frameIndex] = initialFrame;
		},
		addFrame: (state) => {
			state.effect.frames.push(initialFrame);
			state.effect.activeFrame++;
		},
		duplicateFrame: (state, action: PayloadAction<{ frameIndex: number }>) => {
			const { frameIndex } = action.payload;
			const newFrame = state.effect.frames[frameIndex];

			state.effect.frames.splice(frameIndex, 0, newFrame);
		},
		deleteFrame: (state, action: PayloadAction<{ frameIndex: number }>) => {
			const { frameIndex } = action.payload;

			state.effect.activeFrame = 0;
			state.effect.frames.splice(frameIndex, 1);
		},
		nextFrame: (state) => {
			state.effect.activeFrame++;
		},
		prevFrame: (state) => {
			state.effect.activeFrame--;
		},

		// Frame update
		setFrameCellColor: (state, action: PayloadAction<FrameCellLocationT>) => {
			const { frameIndex, coordinate } = action.payload;
			const { x, y } = coordinate;

			state.effect.frames[frameIndex].data[x][y] = state.color;
		},
		addtoUndo: (state, action: PayloadAction<FrameCellLocationT>) => {
			const { frameIndex, coordinate } = action.payload;
			const { x, y } = coordinate;
			const value = state.effect.frames[frameIndex].data[x][y];

			state.effect.frames[frameIndex].undo.push({ value, coordinate });
		},
		applyUndo: (state, action: PayloadAction<{ frameIndex: number }>) => {
			const { frameIndex } = action.payload;
			const undo = state.effect.frames[frameIndex].undo;
			const { coordinate, value } = undo[undo.length - 1];
			const { x, y } = coordinate;
			const currentValue = state.effect.frames[frameIndex].data[x][y];

			state.effect.frames[frameIndex].redo.push({ value: currentValue, coordinate });
			state.effect.frames[frameIndex].undo.pop();
			state.effect.frames[frameIndex].data[x][y] = value;
		},
		applyRedo: (state, action: PayloadAction<{ frameIndex: number }>) => {
			const { frameIndex } = action.payload;
			const redo = state.effect.frames[frameIndex].redo;
			const { coordinate, value } = redo[redo.length - 1];
			const { x, y } = coordinate;
			const currentValue = state.effect.frames[frameIndex].data[x][y];

			state.effect.frames[frameIndex].undo.push({ value: currentValue, coordinate });
			state.effect.frames[frameIndex].redo.pop();
			state.effect.frames[frameIndex].data[x][y] = value;
		},
		setFrameDuration: (state, action: PayloadAction<{ frameIndex: number; value: number }>) => {
			const { frameIndex, value } = action.payload;

			state.effect.frames[frameIndex].duration = value;
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
	addtoUndo,
	applyUndo,
	applyRedo,
} = effectCreator.actions;

export default effectCreator.reducer;
