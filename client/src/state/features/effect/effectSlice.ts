import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	ColorT,
	EffectCreatorT,
	FrameCellLocationT,
	StateEffectT,
	StateFrameT,
} from './effectSlice.types';

const color: ColorT = {
	hue: 0,
	saturation: 100,
	lightness: 50,
};

const defaultColor: ColorT = {
	hue: 0,
	saturation: 100,
	lightness: 0,
};

const newFrame: StateFrameT = {
	data: Array(24).fill(Array(12).fill(defaultColor)),
	duration: 1000,
	redo: [],
	undo: [],
};

const initialState: EffectCreatorT = {
	color: {
		selectedColor: color,
		colorHistory: [],
		colorPresets: [],
	},
	activeFrame: 0,
	effect: {
		name: '',
		description: '',
		frames: [],
		dateCreated: new Date(),
		dateModified: new Date(),
	},
};

export const effectCreator = createSlice({
	name: 'effectCreator',
	initialState,
	reducers: {
		// Color update
		setHue: (state, action: PayloadAction<number>) => {
			state.color.selectedColor.hue = action.payload;
		},
		setSaturation: (state, action: PayloadAction<number>) => {
			state.color.selectedColor.saturation = action.payload;
		},
		setLightness: (state, action: PayloadAction<number>) => {
			state.color.selectedColor.lightness = action.payload;
		},
		setColor: (state, action: PayloadAction<ColorT>) => {
			state.color.selectedColor = action.payload;
		},
		resetColor: (state) => {
			state.color = initialState.color;
		},

		// Effect Actions
		setEffect: (state, action: PayloadAction<StateEffectT>) => {
			state.effect = action.payload;
		},
		setEffectName: (state, action: PayloadAction<string>) => {
			state.effect.name = action.payload;
		},
		setEffectDescription: (state, action: PayloadAction<string>) => {
			state.effect.description = action.payload;
		},
		resetFrame: (state, action: PayloadAction<{ frameIndex: number }>) => {
			const { frameIndex } = action.payload;

			state.effect.frames[frameIndex] = newFrame;
		},
		addFrame: (state) => {
			state.effect.frames.push(newFrame);
			// state.activeFrame++;
		},
		duplicateFrame: (state, action: PayloadAction<{ frameIndex: number }>) => {
			const { frameIndex } = action.payload;
			const newFrame = state.effect.frames[frameIndex];

			state.effect.frames.splice(frameIndex, 0, newFrame);
		},
		deleteFrame: (state, action: PayloadAction<{ frameIndex: number }>) => {
			const { frameIndex } = action.payload;

			state.activeFrame = 0;
			state.effect.frames.splice(frameIndex, 1);
		},
		nextFrame: (state) => {
			state.activeFrame++;
		},
		prevFrame: (state) => {
			state.activeFrame--;
		},

		// Frame actions
		setFrameCellColor: (state, action: PayloadAction<FrameCellLocationT>) => {
			const { frameIndex, coordinate } = action.payload;
			const { x, y } = coordinate;

			state.effect.frames[frameIndex].data[x][y] = state.color.selectedColor;
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
	// Effect actions
	setEffect,
	setEffectName,
	setEffectDescription,
	resetFrame,
	addFrame,
	duplicateFrame,
	deleteFrame,
	nextFrame,
	prevFrame,
	// Frame actions
	setFrameCellColor,
	setFrameDuration,
	addtoUndo,
	applyUndo,
	applyRedo,
} = effectCreator.actions;

export default effectCreator.reducer;
