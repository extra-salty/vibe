export type ComponentType = {
	hidden?: boolean;
	classes?: string;
};

export default ComponentType;

export enum ColorAttributes {
	hue = 'hue',
	saturation = 'saturation',
	lightness = 'lightness',
	timing = 'timing',
}
