import { MRT_ColumnDef, MRT_TableOptions } from 'material-react-table';
import { ColorT } from './color.types';
import { CoordinateT } from './misc.types';
import { AnimationTypesT, TableStateT } from './table.types';

export type StaticAnimationBaseT = {
	type: AnimationTypesT.staticAnimations;
	_id: string;
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	frames: FrameBaseT[];
	framesLength: number;
	duration: number;
	power: number;
};

export type FrameBaseT = {
	data: ColorT[][];
	duration: number;
};

export type StaticAnimationTableT = Omit<StaticAnimationBaseT, 'frames'>;
export type StaticAnimationTablePropsT = Partial<MRT_TableOptions<StaticAnimationTableT>>;
export type StaticAnimationTableColumnsT = MRT_ColumnDef<StaticAnimationTableT>[];
export type StaticAnimationsTableStateT = Omit<TableStateT, 'expanded'>;

export type EffectStateT = Omit<
	StaticAnimationBaseT,
	'frames' | 'dateCreated' | 'dateModified'
> & {
	frames: FrameStateT[];
	dateCreated?: Date;
	dateModified?: Date;
};

export type FrameStateT = FrameBaseT & FrameCellHistoryT;

export type FrameCellHistoryT = {
	undo: FrameCellT[];
	redo: FrameCellT[];
};

export type FrameCellT = {
	coordinate: CoordinateT;
	value: ColorT;
};

export type FrameHistoryT = {
	frameIndex: number;
	type: FrameHistoryTypes;
	data: FrameStateT;
};

export enum FrameHistoryTypes {
	added = 'added',
	deleted = 'deleted',
}

const NUMBER_OF_COLUMNS = 24;
const NUMBER_OF_ROWS = 12;
export const DEFAULT_COLOR: ColorT = {
	hue: 0,
	saturation: 100,
	lightness: 0,
};

// export class EffectBase implements EffectBaseT {
// 	name: string;
// 	description: string;
// 	dateCreated: Date = new Date();
// 	dateModified: Date = new Date();
// 	frames: FrameBaseT[] = [new FrameBase(1000, DEFAULT_COLOR)];

// 	constructor(name: string, description: string) {
// 		this.name = name;
// 		this.description = description;
// 	}
// }

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

export type StaticEffectsT = {
	data: StaticAnimationTableT[];
	state: TableStateT;
};