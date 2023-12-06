import { ComponentType } from '../../Types';

// Material Symbols
export enum Icons {
	add = 'add',
	brightness = 'brightness_6',
	delete = 'delete',
	expandMore = 'expand_more',
	gradient = 'gradient',
	unlock = 'lock_open',
	lock = 'lock',
	next = 'navigate_next',
	palette = 'palette',
	pause = 'pause',
	play = 'play_arrow',
	remove = 'remove',
	restart = 'restart_alt',
	save = 'save',
	stop = 'stop',
	timelapse = 'timelapse',
	triangle = 'triangle',
}

type IconType = ComponentType & {
	name: Icons;
	width?: number;
	height?: number;
	onClick?: () => void;
};

export default IconType;
