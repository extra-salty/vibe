import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import { EffectBaseT, EffectTableT } from './effect.types';
import { GridColumnVisibilityModel } from '@mui/x-data-grid';

export type AnimationBaseT = {
	_id: string;
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	effects: AnimationEffectBaseT[];
	framesLength: number;
	duration: number;
	power: number;
};

export type AnimationEffectBaseT = {
	type: 'static' | 'dynamic';
	name: string;
	repeat: number;
	// speed: number;
};

export type AnimationStateT = Omit<AnimationBaseT, 'effects'> & {
	effects: AnimationEffectStateT[];
};

export type AnimationEffectStateT = Omit<AnimationEffectBaseT, 'name'> & {
	data: EffectBaseT;
};

export type TableAnimationT = {
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	effects: {
		type: 'static' | 'dynamic';
		name: string;
		repeat: number;
		frames: number;
		duration: number;
	};
};

export class AnimationEffectState implements AnimationEffectStateT {
	type: 'static' | 'dynamic' = 'static';
	repeat: number = 1;
	data: EffectBaseT;

	constructor(effect: EffectBaseT) {
		this.data = effect;
	}
}

export type TableT = {
	loading: boolean;
	state: GridStateT;
	selection: string[];
	visibility: GridColumnVisibilityModel;
};

export type GridStateT = Pick<GridInitialStateCommunity, 'sorting' | 'filter'>;

export type StaticEffectTableT = TableT & {
	data: EffectTableT[];
};

export type AnimationTableT = TableT & {
	data: AnimationBaseT[];
};

export type AnimationCreateT = Pick<AnimationBaseT, '_id' | 'name' | 'description'>;
