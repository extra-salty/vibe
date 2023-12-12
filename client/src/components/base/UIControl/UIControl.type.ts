import { UIComponentProps } from '../../Types';

type UIControlType = UIComponentProps & {
	value: number;
	min?: number;
	max?: number;
	unit?: string;
	hasIncrements?: boolean;
	onChange: (value: number) => void;
};

export default UIControlType;
