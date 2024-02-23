import {
	MRT_ColumnDef,
	MRT_ColumnFiltersState,
	MRT_ColumnPinningState,
	MRT_DensityState,
	MRT_ExpandedState,
	MRT_RowSelectionState,
	MRT_SortingState,
	MRT_TableInstance,
	MRT_TableOptions,
	MRT_VisibilityState,
} from 'material-react-table';
import { ColorT } from './color.types';
import { CoordinateT } from './misc.types';

export enum AnimationTypesT {
	group = 'group',
	static = 'static',
	dynamic = 'dynamic',
}

export type AnimationT = {
	type: AnimationTypesT;
	_id: string;
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	framesLength: number;
	duration: number;
	power: number;
	repeat?: number;
	speed?: number;
	frames?: FrameBaseT[];
	children?: AnimationT[];
};

export type FrameBaseT = {
	data: ColorT[][];
	duration: number;
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

export type AnimationsTablePropsT = Partial<MRT_TableOptions<AnimationT>>;
export type AnimationsTableColumnsT = MRT_ColumnDef<AnimationT>[];
export type AnimationsTableInstanceT = MRT_TableInstance<AnimationT>;
export type AnimationStateT = {
	isSaving: boolean;
	expanded: MRT_ExpandedState;
	sorting: MRT_SortingState;
	rowSelection: MRT_RowSelectionState;
	columnVisibility: MRT_VisibilityState;
	columnFilters: MRT_ColumnFiltersState;
	columnPinning: MRT_ColumnPinningState;
	globalFilter: any;
	density: MRT_DensityState;
};

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

const NUMBER_OF_COLUMNS = 24;
const NUMBER_OF_ROWS = 12;
export const DEFAULT_COLOR: ColorT = {
	hue: 0,
	saturation: 100,
	lightness: 0,
};
