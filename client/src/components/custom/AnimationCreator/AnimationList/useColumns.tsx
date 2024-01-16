export enum AnimationListHeaderKeys {
	numbering = 'numbering',
	name = 'name',
	description = 'description',
	frames = 'frames',
	duration = 'duration',
	repeat = 'repeat',
	edit = 'edit',
}

export enum AnimationListHeaderWidths {
	numbering = 'w-4',
	name = 'w-36',
	description = 'w-36',
	frames = 'w-8',
	duration = 'w-8',
	repeat = 'w-8',
	edit = 'w-8',
}

export type HeaderT = {
	numbering: string;
	name: string;
	description: string;
	frames: React.ReactNode;
	duration: React.ReactNode;
	repeat: React.ReactNode;
	edit: string;
	drag: string;
};

export type DataT = {
	numbering: number;
	name: string;
	description: string;
	frames: number;
	duration: number;
	repeat: number;
	edit: React.ReactNode;
	drag: React.ReactNode;
};

const useColumns = (data: any) => {
	return [];
};

export default useColumns;
