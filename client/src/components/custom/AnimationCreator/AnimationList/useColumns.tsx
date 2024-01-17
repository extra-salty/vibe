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
	numbering: number;
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

const useColumns = (columns: HeaderT | AnimationDataT | EffectDataT) => {
	const commonClass = `p-1`;

	return [
		{
			classes: `${commonClass} w-8`,
			content: columns.numbering,
		},
		{
			classes: `${commonClass} w-36`,
			content: columns.name,
		},
		{
			classes: `${commonClass} w-36`,
			content: columns.description,
		},
		{
			classes: `${commonClass} w-8`,
			content: columns.frames,
		},
		{
			classes: `${commonClass} w-8`,
			content: columns.duration,
		},
		{
			classes: `${commonClass} w-8`,
			content: columns.repeat,
		},
		{
			classes: `${commonClass} w-8`,
			content: columns.play,
		},
		{
			classes: `${commonClass} w-8`,
			content: columns.drag,
		},
	];
};

export default useColumns;
