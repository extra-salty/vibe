export type HeaderT = {
	numbering: string;
	name: string;
	description: string;
	frames: React.ReactNode;
	duration: React.ReactNode;
	repeat: React.ReactNode;
	play: string;
	drag: string;
};

export type AnimationDataT = {
	numbering: React.ReactNode;
	name: string;
	description?: string;
	frames: number;
	duration: number;
	repeat: null;
	play: React.ReactNode;
	drag: React.ReactNode;
};

export type EffectDataT = {
	// select: boolean;
	numbering: React.ReactNode;
	name: React.ReactNode;
	description?: string;
	frames: number;
	duration: number;
	repeat: number;
	play: React.ReactNode;
	drag: React.ReactNode;
};
