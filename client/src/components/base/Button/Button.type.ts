import ComponentType from '@/components/Components.type';
import { ColorType } from '@/state/features/color/colorSlice';

type ButtonType = ComponentType & {
	text?: string;
	color?: ColorType;
	delay?: number;
	onClick: () => void;
	onPress: () => void;
};

export default ButtonType;
