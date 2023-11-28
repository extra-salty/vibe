import { ColorType } from '../attribute/attributeSlice.type';

export type EffectType = {
	name: string;
	current: ColorType[][];
	history?: {
		values: ColorType[][];
		repeat: number;
		delay: number;
	}[];
};

export type Coordinate = {
	x: number;
	y: number;
};

export enum Effects {
	welcome = 'welcome',
}

export type setLedColorActionType = {
	coordinate: Coordinate;
	selectedColor: ColorType;
};
