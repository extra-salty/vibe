import { AnimationT, AnimationTypesT, FrameHistoryT } from '@/types/animation.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: {
	frameWidth: number;
	activeFrame: number;
	frameHistory: FrameHistoryT[];
	// effect: AnimationT;
} = {
	frameWidth: 1,
	activeFrame: 0,
	frameHistory: [],
	// effect: {
	// 	type: AnimationTypesT.static,
	// 	_id: '',
	// 	name: '',
	// 	description: '',
	// 	frames: [],
	// 	// dateCreated: new Date(),
	// 	// dateModified: new Date(),
	// 	duration: 0,
	// 	framesLength: 0,
	// 	power: 0,
	// },
};

export const effectCreatorSlice = createSlice({
	name: 'effectCreator',
	initialState,
	reducers: {
		// Frames
		// setFrameWidth: (state, action: PayloadAction<number>) => {
		// 	state.frameWidth = action.payload;
		// },
		// // Effect actions
		// setEffect: (state, action: PayloadAction<AnimationT>) => {
		// 	state.effect = action.payload;
		// },
		// setEffectName: (state, action: PayloadAction<string>) => {
		// 	state.effect.name = action.payload;
		// },
		// setEffectDescription: (state, action: PayloadAction<string>) => {
		// 	state.effect.description = action.payload;
		// },
		// // Frame actions
		// resetFrame: (state, action: PayloadAction<number>) => {
		// 	state.effect.frames[action.payload] = newFrame;
		// },
		// addFrame: (state, action: PayloadAction<number>) => {
		// 	state.effect.frames.splice(++action.payload, 0, newFrame);
		// },
		// duplicateFrame: (state, action: PayloadAction<number>) => {
		// 	const newFrame = state.effect.frames[action.payload];
		// 	state.effect.frames.splice(action.payload, 0, newFrame);
		// },
		// deleteFrame: (state, action: PayloadAction<number>) => {
		// 	state.effect.frames.splice(action.payload, 1);
		// },
		// moveFrame: (
		// 	state,
		// 	action: PayloadAction<{ startIndex: number; endIndex: number }>,
		// ) => {
		// 	const { startIndex, endIndex } = action.payload;
		// 	const temp = state.effect.frames[startIndex];
		// 	state.effect.frames[startIndex] = state.effect.frames[endIndex];
		// 	state.effect.frames[endIndex] = temp;
		// },
		// setFrameDuration: (
		// 	state,
		// 	action: PayloadAction<{ frameIndex: number; value: number }>,
		// ) => {
		// 	const { frameIndex, value } = action.payload;
		// 	state.effect.frames[frameIndex].duration = value;
		// },
		// addToHistory: (
		// 	state,
		// 	action: PayloadAction<{ frameIndex: number; type: FrameHistoryTypes }>,
		// ) => {
		// 	const { frameIndex, type } = action.payload;
		// 	state.frameHistory.push({
		// 		frameIndex,
		// 		type,
		// 		data: state.effect.frames[frameIndex],
		// 	});
		// },
		// nextFrame: (state) => {
		// 	state.activeFrame++;
		// },
		// prevFrame: (state) => {
		// 	state.activeFrame--;
		// },
		// Cell actions
		// setFrameCellColor: (state, action: PayloadAction<FrameCellLocationT>) => {
		// 	const { frameIndex, coordinate } = action.payload;
		// 	const { x, y } = coordinate;
		// 	state.effect.frames[frameIndex].data[x][y] = state.color.selectedColor;
		// },
		// addtoUndo: (state, action: PayloadAction<FrameCellLocationT>) => {
		// 	const { frameIndex, coordinate } = action.payload;
		// 	const { x, y } = coordinate;
		// 	const value = state.effect.frames[frameIndex].data[x][y];
		// 	state.effect.frames[frameIndex].undo.push({ value, coordinate });
		// },
		// applyUndo: (state, action: PayloadAction<number>) => {
		// 	const frameIndex = action.payload;
		// 	const undo = state.effect.frames[frameIndex].undo;
		// 	const { coordinate, value } = undo[undo.length - 1];
		// 	const { x, y } = coordinate;
		// 	const currentValue = state.effect.frames[frameIndex].data[x][y];
		// 	state.effect.frames[frameIndex].redo.push({ value: currentValue, coordinate });
		// 	state.effect.frames[frameIndex].undo.pop();
		// 	state.effect.frames[frameIndex].data[x][y] = value;
		// },
		// applyRedo: (state, action: PayloadAction<number>) => {
		// 	const frameIndex = action.payload;
		// 	const redo = state.effect.frames[frameIndex].redo;
		// 	const { coordinate, value } = redo[redo.length - 1];
		// 	const { x, y } = coordinate;
		// 	const currentValue = state.effect.frames[frameIndex].data[x][y];
		// 	state.effect.frames[frameIndex].undo.push({ value: currentValue, coordinate });
		// 	state.effect.frames[frameIndex].redo.pop();
		// 	state.effect.frames[frameIndex].data[x][y] = value;
		// },
	},
});

export const staticAnimationActions = effectCreatorSlice.actions;
