import { BaseEffectT } from '../effect/effectSlice.types';

export type AnimationCreatorT = {
	selectedEffects: string[];
	selectedAnimations: string[];
	animations: StateAnimationT[];
};

export type StateAnimationT = {
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	effects: StateAnimationEffectT[];
};

export type StateAnimationEffectT = {
	type: 'static' | 'dynamic';
	name: string;
	repeat: number;
	effect: BaseEffectT[];
};

export enum DndElements {
	animationList = 'animationList',
	animationListItem = 'animationListItem',
	effectList = 'effectList',
	effectListItem = 'effectListItem',
	newEffect = 'newEffect',
	newAnimation = 'newAnimation',
}
