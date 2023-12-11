import { Icons } from '@/components/base/UIIcon/UIIcon.type';

export type AttributeType = {
	label: Attributes;
	value: number;
	max: number;
	unit: string;
	icon: Icons;
	background?: string;
	hidden?: boolean;
	class?: string;
	onChange: (value: number) => void;
};

export enum Attributes {
	hue = 'Hue',
	saturation = 'Saturation',
	lightness = 'Lightness',
	timing = 'Timing',
}

export enum Units {
	degree = '°',
	percentage = '%',
	second = 's',
}
