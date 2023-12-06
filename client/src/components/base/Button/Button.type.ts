import ComponentType from '@/components/Types';
import { Icons } from '../Icon/Icon.type';

type ButtonType = ComponentType & {
	text?: string;
	activeText?: string;
	icon?: Icons;
	activeIcon?: Icons;
	iconPosition?: 'start' | 'end';
	delay?: number;
	disabled?: boolean;
	onClick: () => void;
	onPress: () => void;
	onHover?: () => void;
};

export default ButtonType;
