import { UIComponentProps } from '../../Types';

type UIIconProps = UIComponentProps & {
	name: Icons;
	enlarge?: boolean;
	width?: number;
	height?: number;
	onClick?: () => void;
};

export default UIIconProps;

// Material Symbols
export enum Icons {
	add = 'add',
	brightness = 'brightness',
	close = 'close',
	delete = 'delete',
	duplicate = 'duplicate',
	expandMore = 'expand_more',
	gradient = 'gradient',
	lock = 'lock',
	next = 'next',
	palette = 'palette',
	pause = 'pause',
	play = 'play',
	remove = 'remove',
	restart = 'restart',
	save = 'save',
	stop = 'stop',
	timelapse = 'timelapse',
	triangle = 'triangle',
	unlock = 'unlock',
	unlockRight = 'unlock_right',
}
