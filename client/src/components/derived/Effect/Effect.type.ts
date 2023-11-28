import { Icons } from '@/components/base/Icon/Icon.type';

export type ActionType = {
	name: Actions;
	icon: Icons;
	onClick: () => void;
};

export enum Actions {
	add = 'Add',
	delete = 'Delete',
	lock = 'Lock',
	next = 'Next',
	pause = 'Pause',
	play = 'Play',
	prev = 'Previous',
	redo = 'Redo',
	remove = 'Remove',
	reset = 'Reset',
	save = 'Save',
	undo = 'Undo',
}
