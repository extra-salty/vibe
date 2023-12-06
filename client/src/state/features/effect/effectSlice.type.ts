import { ColorType } from '../attributes/attributeSlice.type';

export type EffectType = {
	name: string;
	ledMatrix: ColorType[][];
	history?: {
		values: ColorType[][];
		repeat: number;
		delay: number;
	}[];
	actionsState: { [key in Actions]?: boolean };
};

export type Coordinate = {
	x: number;
	y: number;
};

export type setLedColorActionType = {
	coordinate: Coordinate;
	color: ColorType;
};

export enum Effects {
	welcome = 'welcome',
}

export enum Actions {
	add = 'Add',
	delete = 'Delete',
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
