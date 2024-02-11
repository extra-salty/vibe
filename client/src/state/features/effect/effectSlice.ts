import { ColorT } from '@/types/color.types';
import { EffectStateT, FrameHistoryT, FrameHistoryTypes, FrameStateT } from '@/types/effect.types';
import { CoordinateT, FrameCellLocationT } from '@/types/misc.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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

const newFrame: FrameStateT = {
	data: Array(24).fill(Array(12).fill(defaultColor)),
	duration: 1000,
	redo: [],
	undo: [],
};

const initialState: {
	color: {
		selectedColor: ColorT;
		colorHistory: ColorT[];
		colorPresets: ColorT[];
	};
	frameWidth: number;
	activeFrame: number;
	frameHistory: FrameHistoryT[];
	effect: EffectStateT;
} = {
	color: {
		selectedColor: color,
		colorHistory: [],
		colorPresets: [],
	},
	frameWidth: 1,
	activeFrame: 0,
	frameHistory: [],
	effect: {
		_id: '',
		name: '',
		description: '',
		frames: [],
		dateCreated: undefined,
		dateModified: undefined,
	},
};

export const effectCreatorSlice = createSlice({
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

		// Frames
		setFrameWidth: (state, action: PayloadAction<number>) => {
			state.frameWidth = action.payload;
		},

		// Effect actions
		setEffect: (state, action: PayloadAction<EffectStateT>) => {
			state.effect = action.payload;
		},
		setEffectName: (state, action: PayloadAction<string>) => {
			state.effect.name = action.payload;
		},
		setEffectDescription: (state, action: PayloadAction<string>) => {
			state.effect.description = action.payload;
		},

		// Frame actions
		resetFrame: (state, action: PayloadAction<number>) => {
			state.effect.frames[action.payload] = newFrame;
		},
		addFrame: (state, action: PayloadAction<number>) => {
			state.effect.frames.splice(++action.payload, 0, newFrame);
		},
		duplicateFrame: (state, action: PayloadAction<number>) => {
			const newFrame = state.effect.frames[action.payload];

			state.effect.frames.splice(action.payload, 0, newFrame);
		},
		deleteFrame: (state, action: PayloadAction<number>) => {
			state.effect.frames.splice(action.payload, 1);
		},
		moveFrame: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
			const { startIndex, endIndex } = action.payload;
			const temp = state.effect.frames[startIndex];

			state.effect.frames[startIndex] = state.effect.frames[endIndex];
			state.effect.frames[endIndex] = temp;
		},
		setFrameDuration: (state, action: PayloadAction<{ frameIndex: number; value: number }>) => {
			const { frameIndex, value } = action.payload;

			state.effect.frames[frameIndex].duration = value;
		},
		addToHistory: (
			state,
			action: PayloadAction<{ frameIndex: number; type: FrameHistoryTypes }>,
		) => {
			const { frameIndex, type } = action.payload;

			state.frameHistory.push({
				frameIndex,
				type,
				data: state.effect.frames[frameIndex],
			});
		},
		nextFrame: (state) => {
			state.activeFrame++;
		},
		prevFrame: (state) => {
			state.activeFrame--;
		},

		// Cell actions
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
		applyUndo: (state, action: PayloadAction<number>) => {
			const frameIndex = action.payload;
			const undo = state.effect.frames[frameIndex].undo;
			const { coordinate, value } = undo[undo.length - 1];
			const { x, y } = coordinate;
			const currentValue = state.effect.frames[frameIndex].data[x][y];

			state.effect.frames[frameIndex].redo.push({ value: currentValue, coordinate });
			state.effect.frames[frameIndex].undo.pop();
			state.effect.frames[frameIndex].data[x][y] = value;
		},
		applyRedo: (state, action: PayloadAction<number>) => {
			const frameIndex = action.payload;
			const redo = state.effect.frames[frameIndex].redo;
			const { coordinate, value } = redo[redo.length - 1];
			const { x, y } = coordinate;
			const currentValue = state.effect.frames[frameIndex].data[x][y];

			state.effect.frames[frameIndex].undo.push({ value: currentValue, coordinate });
			state.effect.frames[frameIndex].redo.pop();
			state.effect.frames[frameIndex].data[x][y] = value;
		},
	},
});

export const {
	// Color update
	setHue,
	setSaturation,
	setLightness,
	setColor,
	resetColor,
	// Frames
	setFrameWidth,
	// Effect actions
	setEffect,
	setEffectName,
	setEffectDescription,
	// Frame actions
	resetFrame,
	addFrame,
	duplicateFrame,
	deleteFrame,
	moveFrame,
	setFrameDuration,
	addToHistory,
	nextFrame,
	prevFrame,
	// Frame actions
	setFrameCellColor,
	addtoUndo,
	applyUndo,
	applyRedo,
} = effectCreatorSlice.actions;
