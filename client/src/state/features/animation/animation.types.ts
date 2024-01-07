export type AnimationCreatorT = {
	selectedAnimations: AnimationT[];
};

export type AnimationT = {
	name: string;
	description?: string;
	effects: AnimationEffectT[];
};

export type AnimationEffectT = {
	type: 'static' | 'dynamic';
	name: string;
	repeat: number;
};
