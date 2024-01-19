import { EffectBaseT } from './effect.types';

export type AnimationBaseT = {
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	effects: AnimationEffectBaseT[];
};

export type AnimationEffectBaseT = {
	type: 'static' | 'dynamic';
	name: string;
	repeat: number;
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
