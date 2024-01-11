export type AnimationCreatorT = {
	selectedEffects: string[];
	selectedAnimations: string[];
	animations: AnimationT[];
};

export type AnimationT = {
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	effects: AnimationEffectT[];
};

export type AnimationEffectT = {
	type: 'static' | 'dynamic';
	name: string;
	repeat: number;
};

export enum DndElements {
	animationList = 'animationList',
	animationListItem = 'animationListItem',
	effectList = 'effectList',
	effectListItem = 'effectListItem',
	newEffect = 'newEffect',
	newAnimation = 'newAnimation',
}
