import { UIComponentProps } from '../../UIComponent.type';

type UIIconProps = UIComponentProps & {
	name: Icons;
	width?: number;
	height?: number;
	isRotated?: boolean;
	onClick?: () => void;
};

export default UIIconProps;

export enum Icons {
	add = 'add',
	brightness = 'brightness',
	close = 'close',
	delete = 'delete',
	duplicate = 'duplicate',
	drag = 'drag',
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
	resize = 'resize',
	save = 'save',
	stack = 'stack',
	stop = 'stop',
	timelapse = 'timelapse',
	triangle = 'triangle',
	undo = 'undo',
	unlock = 'unlock',
	unlockRight = 'unlock_right',
	width = 'width',
}
