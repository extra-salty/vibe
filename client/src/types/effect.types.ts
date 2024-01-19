import { ColorT } from './color.types';
import { CoordinateT } from './misc.types';

export type EffectBaseT = {
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	frames: FrameBaseT[];
};

export type FrameBaseT = {
	data: ColorT[][];
	duration: number;
};

export type EffectTableT = Omit<EffectBaseT, 'frames'> & {
	framesLength: number;
	duration: number;
};

export type EffectStateT = Omit<EffectBaseT, 'frames'> & {
	frames: FrameStateT[];
};

export type FrameStateT = FrameBaseT & HistoriesT;

export type HistoriesT = {
	undo: HistoryT[];
	redo: HistoryT[];
};

export type HistoryT = {
	coordinate: CoordinateT;
	value: ColorT;
};

const NUMBER_OF_COLUMNS = 24;
const NUMBER_OF_ROWS = 12;
export const DEFAULT_COLOR: ColorT = {
	hue: 0,
	saturation: 100,
	lightness: 0,
};

export class EffectBase implements EffectBaseT {
	name: string;
	description: string;
	dateCreated: Date = new Date();
	dateModified: Date = new Date();
	frames: FrameBaseT[] = [new FrameBase(1000, DEFAULT_COLOR)];

	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
	}
}

export class FrameBase implements FrameBaseT {
	duration: number;
	data: ColorT[][];

	constructor(duration: number, color: ColorT) {
		this.duration = duration;
		this.data = Array(NUMBER_OF_COLUMNS).fill(Array(NUMBER_OF_ROWS).fill(color));
	}
}

export class FrameState extends FrameBase {
	undo = [];
	redo = [];
}
