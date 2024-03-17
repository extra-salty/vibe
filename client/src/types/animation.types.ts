import {
	MRT_ColumnDef,
	MRT_ColumnFiltersState,
	MRT_ColumnPinningState,
	MRT_DensityState,
	MRT_ExpandedState,
	MRT_Row,
	MRT_RowSelectionState,
	MRT_SortingState,
	MRT_TableInstance,
	MRT_TableOptions,
	MRT_VisibilityState,
} from 'material-react-table';
import { ColorT } from './color.types';
import { CoordinateT } from './misc.types';
import { DEFAULT_COLOR } from '@/state/features/color/colorSlice';

export enum AnimationTypesT {
	group = 'group',
	static = 'static',
	dynamic = 'dynamic',
}

export type AnimationT = {
	_id: string;
	type: AnimationTypesT;
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	framesLength?: number;
	duration?: number;
	power?: number;
	repeat?: number;
	speed?: number;
	children?: AnimationT[];
	frames?: FrameBaseT[];
};

export type FrameBaseT = {
	data: ColorT[][];
	duration: number;
};

export type StaticAnimationT = {
	_id: string;
	user: string;
	type: AnimationTypesT;
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	frames: FrameBaseT[];
};

export type AnimationStateT = Omit<AnimationT, 'frames'> & {
	frames?: FrameStateT[];
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

export type AnimationRowT = MRT_Row<AnimationT>;
export type AnimationsTablePropsT = Partial<MRT_TableOptions<AnimationT>>;
export type AnimationsTableColumnsT = MRT_ColumnDef<AnimationT>[];
export type AnimationsTableInstanceT = MRT_TableInstance<AnimationT>;
export type AnimationTableStateT = {
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

const newFrame: FrameStateT = {
	data: Array(24).fill(Array(12).fill(DEFAULT_COLOR)),
	duration: 1000,
	redo: [],
	undo: [],
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

// export type AnimationNormalizedT = {
// 	_id: string;
// 	// type: AnimationTypesT;
// 	name: string;
// 	description?: string;
// 	dateCreated: Date;
// 	dateModified: Date;
// 	// framesLength: number;
// 	// duration: number;
// 	// power: number;
// 	frames?: FrameBaseT[];
// 	children?: string[];
// };

// type NormalizedChildrenT = {
// 	id: string;
// 	name: string;
// 	description: string;
// 	children: string[];
// 	repeat?: number;
// 	speed?: number;
// };

const staticAnimation = [
	{
		_id: '123',
		user: 1566516,
		name: 'static1',
		description: 'description',
		dateCreated: new Date(),
		dateModified: new Date(),
		frames: [],
	},
	{
		_id: '456',
		user: 1566516,
		name: 'static2',
		description: 'description',
		dateCreated: new Date(),
		dateModified: new Date(),
		frames: [],
	},
];

const animation = {
	_id: '1541646',
	user: 1566516,
	name: 'animation1',
	description: 'description',
	dateCreated: new Date(),
	dateModified: new Date(),
	children: ['1.1,1.2'],
	groups: {
		'1.1': {
			id: '1.1',
			name: 'group1',
			description: 'desc1',
			repeat: 2,
			speed: 1,
			children: ['1.1.1', '1.1.2'],
		},
		'1.1.1': {
			id: '1.1.1',
			name: 'static1',
			description: 'desc1',
			repeat: 2,
			speed: 1,
			children: ['1.1.1', '1.1.2'],
		},
		'1.1.2': {
			id: '1.1.2',
			name: 'static2',
			description: 'desc1',
			repeat: 2,
			speed: 1,
			children: ['1.1.1', '1.1.2'],
		},
		'2': {
			id: '1.2',
			name: 'group2',
			description: 'desc2',
			repeat: 2,
			speed: 1,
			children: ['1541646'],
		},
	},
	statics: [
		{
			_id: '123',
			user: 1566516,
			name: 'static1',
			description: 'description',
			dateCreated: new Date(),
			dateModified: new Date(),
			frames: [],
		},
		{
			_id: '456',
			user: 1566516,
			name: 'static2',
			description: 'description',
			dateCreated: new Date(),
			dateModified: new Date(),
			frames: [],
		},
	],
};
