import { ComponentType } from '../../Components.type';

export enum Icons {
	expandMore = 'expand-more',
	palette = 'palette',
}

type IconType = ComponentType & {
	name: Icons;
	width?: number;
	height?: number;
	onClick?: () => void;
};

export default IconType;
