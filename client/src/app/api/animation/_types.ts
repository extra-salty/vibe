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
