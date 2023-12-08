import UIComponentType from '@/components/Types';
import { Icons } from '../UIIcon/UIIcon.type';

type UIButtonType = UIComponentType & {
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

export default UIButtonType;
