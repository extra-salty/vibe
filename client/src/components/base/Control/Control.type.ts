import { ComponentType } from '../../Types';

type ControlType = ComponentType & {
	value: number;
	min?: number | string;
	max?: number | string;
	unit?: string;
	hasIncrements?: boolean;
	onChange: (value: number) => void;
};

export default ControlType;
