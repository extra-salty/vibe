import { UIComponentType } from '../../Types';

type UIControlType = UIComponentType & {
	value: number;
	min?: number;
	max?: number;
	unit?: string;
	hasIncrements?: boolean;
	onChange: (value: number) => void;
};

export default UIControlType;
