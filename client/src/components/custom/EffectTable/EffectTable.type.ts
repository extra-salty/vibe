export type EffectTableHeaderT = {
	select: boolean;
	name: string;
	description: string;
	frames: number;
	duration: number;
	dateCreated: string;
	dateModified: string;
	link: string;
};

export type EffectTableDataT = {
	select: React.ReactNode;
	name: React.ReactNode;
	description: React.ReactNode;
	frames: number;
	duration: number;
	dateCreated: string;
	dateModified: string;
	link: React.ReactNode;
};
