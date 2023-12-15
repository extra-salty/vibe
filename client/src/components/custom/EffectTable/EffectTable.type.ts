export type EffectTableHeaderT = {
	select: boolean;
	name: string;
	description: string;
	dateCreated: string;
	dateModified: string;
	// goTo: string;
};

export type EffectTableDataT = {
	select: React.ReactNode;
	name: React.ReactNode;
	description: React.ReactNode;
	dateCreated: string;
	dateModified: string;
	// goTo: React.ReactNode;
};
