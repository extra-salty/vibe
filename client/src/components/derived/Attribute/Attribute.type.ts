import { Icons } from '@/components/base/Icon/Icon.type';

export type AttributeType = {
	key: Attributes;
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
