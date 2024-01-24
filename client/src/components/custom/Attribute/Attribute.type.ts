import UIComponentProps from '@/components/UIComponent.type';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';

export type AttributeType = UIComponentProps & {
	label: Attributes;
	value: number;
	max: number;
	unit: string;
	icon: Icons;
	background?: string;
	onChange: (value: number) => void;
};

export enum Attributes {
	hue = 'hue',
	saturation = 'saturation',
	lightness = 'lightness',
}

export enum Units {
	degree = '°',
	percentage = '%',
	second = 's',
}
