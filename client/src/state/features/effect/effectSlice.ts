import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Actions, EffectI, EffectType, Effects, setLedColorActionType } from './effectSlice.type';
import { ColorType } from '../attributes/attributeSlice.type';

const NUMBER_OF_COLUMNS = 24;
const NUMBER_OF_ROWS = 12;
const DEFAULT_COLOR: ColorType = {
	hue: 0,
	saturation: 50,
	lightness: 100,
};

const newFrame = Array(NUMBER_OF_COLUMNS).fill(Array(NUMBER_OF_ROWS).fill(DEFAULT_COLOR));

// class Effect implements EffectI {
// 	name: string;
// 	description: string = '';
// 	frames: ColorType[][][];
// 	activeFrame: number;
// 	dateCreated: Date;
// 	dateModified?: Date | undefined;

// 	constructor(name: string) {
// 		this.name = 'Effect1';
// 		this.activeFrame = 0;
// 		this.frames = Array(1).fill(
// Array(NUMBER_OF_COLUMNS)
// 	.fill(null)
// 	.map(() => Array(NUMBER_OF_ROWS).fill(DEFAULT_COLOR)),
// 		);
// 		this.dateCreated = new Date();
// 	}

// 	createFrame(): ColorType[][] {
// 		return Array(NUMBER_OF_COLUMNS).fill(Array(NUMBER_OF_ROWS).fill(DEFAULT_COLOR));
// 	}
// }

const initialState: EffectType = {
	effect: {
		name: '',
		description: '',
		frames: [newFrame],
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
		resetFrame: (state) => {
			state.effect.frames[0] = initialState.effect.frames[0];
		},
		addFrame: (state) => {
			state.effect.frames.push(newFrame);
		},
		duplicateFrame: (state, action: PayloadAction<{ activeFrame: number }>) => {
			const { activeFrame } = action.payload;
			state.effect.frames.splice(0, 0, newFrame);
		},
		nextFrame: (state) => {
			state.effect.activeFrame++;
		},
		prevFrame: (state) => {
			state.effect.activeFrame--;
		},

		setLedColor: (state, action: PayloadAction<setLedColorActionType>) => {
			const {
				coordinate: { x, y },
				color,
			} = action.payload;
			state.effect.frames[0][x][y] = color;
		},
	},
});

export const { resetFrame, addFrame, duplicateFrame, nextFrame, prevFrame, setLedColor } =
	effectCreator.actions;

export default effectCreator.reducer;
