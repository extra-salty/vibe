export type EffectCreatorT = {
	color: {
		selectedColor: ColorT;
		colorHistory: ColorT[];
		colorPresets: ColorT[];
	};
	activeFrame: number;
	effect: StateEffectT;
};

// Color
export type ColorT = {
	hue: number;
	saturation: number;
	lightness: number;
};

export class Color implements ColorT {
	hue: number;
	saturation: number;
	lightness: number;

	constructor(hue: number, saturation: number, lightness: number) {
		this.hue = hue;
		this.saturation = saturation;
		this.lightness = lightness;
	}
}

// Effect
export type BaseEffectT = {
	_id: string;
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	frames: BaseFrameT[];
};

export type StateEffectT = Omit<BaseEffectT, 'frames'> & {
	frames: StateFrameT[];
};

export type BaseFrameT = {
	data: ColorT[][];
	duration: number;
};

export type StateFrameT = BaseFrameT & HistoriesT;

export type HistoriesT = {
	undo: HistoryT[];
	redo: HistoryT[];
};

export type HistoryT = {
	coordinate: CoordinateT;
	value: ColorT;
};

export type CoordinateT = {
	x: number;
	y: number;
};

export type FrameCellLocationT = {
	frameIndex: number;
	coordinate: CoordinateT;
};

const NUMBER_OF_COLUMNS = 24;
const NUMBER_OF_ROWS = 12;
const DEFAULT_COLOR: ColorT = {
	hue: 0,
	saturation: 0,
	lightness: 100,
};

export class Effect implements BaseEffectT {
	_id: any;
	name: string;
	description: string;
	dateCreated: Date = new Date();
	dateModified: Date = new Date();
	frames: BaseFrameT[] = [new BaseFrame(1000, DEFAULT_COLOR)];

	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
	}
}

export class BaseFrame implements BaseFrameT {
	duration: number;
	data: ColorT[][];

	constructor(duration: number, color: ColorT) {
		this.duration = duration;
		this.data = Array(NUMBER_OF_COLUMNS).fill(Array(NUMBER_OF_ROWS).fill(DEFAULT_COLOR));
	}
}

export class StateFrame extends BaseFrame {
	undo = [];
	redo = [];
}
