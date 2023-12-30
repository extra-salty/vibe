export type EffectTableHeaderT = {
	numbering: string;
	select: boolean;
	name: string;
	description: string;
	frames: number;
	duration: number;
	dateCreated: string;
	dateModified: string;
	edit: string;
};

export type EffectTableDataT = {
	numbering: number;
	select: React.ReactNode;
	name: React.ReactNode;
	description: React.ReactNode;
	frames: number;
	duration: number;
	dateCreated: string;
	dateModified: string;
	edit: React.ReactNode;
};
