import { ComponentType } from '../../Types';

type ControlType = ComponentType & {
	value: number;
	min?: number;
	max?: number;
	unit?: string;
	hasIncrements?: boolean;
	onChange: (value: number) => void;
};

export default ControlType;
