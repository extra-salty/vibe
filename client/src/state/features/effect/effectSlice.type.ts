import { Actions } from './effectSlice.enum';

export type EffectCreatorT = {
	color: ColorT;
	effect: EffectT;
	actionsState: { [key in Actions]?: boolean };
};

export type ColorT = {
	hue: number;
	saturation: number;
	lightness: number;
};

export type EffectT = {
	name: string;
	description?: string;
	activeFrame: number;
	frames: FrameT[];
	dateCreated?: Date;
	dateModified?: Date;
};

export type FrameT = {
	data: ColorT[][];
	duration: number;
	undo: HistoryT[];
	redo: HistoryT[];
};

export type HistoryT = {
	coordinate: CoordinateT;
	value: ColorT;
};

export type FrameCellLocationT = {
	frameIndex: number;
	coordinate: CoordinateT;
};

export type CoordinateT = {
	x: number;
	y: number;
};
