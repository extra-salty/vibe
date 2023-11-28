import { ComponentType } from '../../Types';

type SliderType = ComponentType & {
	value: number;
	min?: number | string;
	max?: number | string;
	background?: string;
	delay?: number;
	onChange: (value: number) => void;
};

export default SliderType;
