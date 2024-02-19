import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import { EffectBaseT } from './effect.types';

export type AnimationBaseT = {
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
	group?: AnimationBaseT[];
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

export class AnimationEffectState implements AnimationEffectStateT {
	type: 'static' | 'dynamic' = 'static';
	repeat: number = 1;
	data: EffectBaseT;

	constructor(effect: EffectBaseT) {
		this.data = effect;
	}
}

export type GridStateT = Pick<GridInitialStateCommunity, 'sorting' | 'filter'>;
