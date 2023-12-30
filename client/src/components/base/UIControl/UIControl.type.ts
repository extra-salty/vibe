import { UIComponentProps } from '../../UIComponent.type';

type UIControlProps = UIComponentProps & {
	value: number;
	min?: number;
	max?: number;
	unit?: string;
	hasIncrements?: boolean;
	disabled?: boolean;
	onChange: (value: number) => void;
};

export default UIControlProps;
