export type AnimationCreatorT = {
	animations: AnimationT[];
};

export type AnimationT = {
	id: string;
	name: string;
	description?: string;
	segments: {
		type: 'static' | 'dynamic';
		id: string;
		repeat: number;
	}[];
};
