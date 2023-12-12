export type EffectCreatorT = {
	color: ColorT;
	effect: EffectI;
	history?: {
		values: ColorT[][];
		repeat?: number;
		delay?: number;
	}[];
	actionsState: { [key in Actions]?: boolean };
};

export interface EffectI {
	name: string;
	description?: string;
	frames: FrameT[];
	activeFrame: number;
	dateCreated?: Date;
	dateModified?: Date;
	createFrame?: () => ColorT[][];
}

export type CoordinateT = {
	x: number;
	y: number;
};

export type FrameT = ColorT[][];

export type setLedColorActionT = {
	frameIndex: number;
	coordinate: CoordinateT;
	// color: ColorType;
};

export type ColorT = {
	hue: number;
	saturation: number;
	lightness: number;
};

export enum Effects {
	welcome = 'welcome',
}

export enum Actions {
	add = 'Add',
	delete = 'Delete',
	duplicate = 'Duplicate',
	lock = 'Lock',
	next = 'Next',
	pause = 'Pause',
	play = 'Play',
	prev = 'Previous',
	redo = 'Redo',
	remove = 'Remove',
	reset = 'Reset',
	save = 'Save',
	undo = 'Undo',
	unlock = 'Unlock',
}

export enum ModalActions {
	cancel = 'Cancel',
	accept = 'Accept',
}
