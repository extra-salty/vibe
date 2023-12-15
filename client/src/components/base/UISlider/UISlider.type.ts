import { UIComponentProps } from '../../UIComponent.type';

type UISliderType = UIComponentProps & {
	value: number;
	min?: number | string;
	max?: number | string;
	delay?: number;
	onChange: (value: number) => void;
};

export default UISliderType;
