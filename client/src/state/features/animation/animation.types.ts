import { BaseEffectT } from '../effect/effectSlice.types';

export type AnimationCreatorT = {
	selectedEffects: string[];
	selectedAnimations: string[];
	animations: StateAnimationT[];
};

export type BaseAnimationT = {
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	effects: BaseAnimationEffectT[];
};

export type BaseAnimationEffectT = {
	type: 'static' | 'dynamic';
	name: string;
	repeat: number;
};

export type StateAnimationT = Omit<BaseAnimationT, 'effects'> & {
	effects: StateAnimationEffectT[];
};

export type StateAnimationEffectT = Omit<BaseAnimationEffectT, 'name'> & {
	data: BaseEffectT;
};

export class StateAnimationEffect implements StateAnimationEffectT {
	type: 'static' | 'dynamic' = 'static';
	repeat: number = 1;
	data: BaseEffectT;

	constructor(effect: BaseEffectT) {
		this.data = effect;
	}
}

export enum DndElements {
	animationList = 'animationList',
	animationListItem = 'animationListItem',
	effectList = 'effectList',
	effectListItem = 'effectListItem',
	newEffect = 'newEffect',
	newAnimation = 'newAnimation',
}
