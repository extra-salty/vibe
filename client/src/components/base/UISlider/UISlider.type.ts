import { UIComponentType } from '../../Types';

type UISliderType = UIComponentType & {
	value: number;
	min?: number | string;
	max?: number | string;
	background?: string;
	delay?: number;
	onChange: (value: number) => void;
};

export default UISliderType;
