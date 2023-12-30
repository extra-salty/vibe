import { UIComponentProps } from '../../UIComponent.type';

type UIIconProps = UIComponentProps & {
	name: Icons;
	enlarge?: boolean;
	width?: number;
	height?: number;
	onClick?: () => void;
};

export default UIIconProps;

export enum Icons {
	add = 'add',
	brightness = 'brightness',
	close = 'close',
	delete = 'delete',
	duplicate = 'duplicate',
	edit = 'edit',
	expandMore = 'expand_more',
	gradient = 'gradient',
	lock = 'lock',
	next = 'next',
	palette = 'palette',
	pause = 'pause',
	play = 'play',
	redo = 'redo',
	remove = 'remove',
	restart = 'restart',
	save = 'save',
	stack = 'stack',
	stop = 'stop',
	timelapse = 'timelapse',
	triangle = 'triangle',
	undo = 'undo',
	unlock = 'unlock',
	unlockRight = 'unlock_right',
}
