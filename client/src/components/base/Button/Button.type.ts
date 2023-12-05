import ComponentType from '@/components/Types';
import { ColorType } from '@/state/features/attribute/attributeSlice.type';

type ButtonType = ComponentType & {
	text?: string;
	color?: ColorType;
	delay?: number;
	onClick: () => void;
	onPress: () => void;
	onHover?: () => void;
};

export default ButtonType;
