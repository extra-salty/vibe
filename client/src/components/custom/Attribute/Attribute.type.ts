export type AttributeType = {
	label: Attributes;
	value: number;
	max: number;
	unit: string;
	icon: any;
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
