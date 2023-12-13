import UIComponentProps from '@/components/Types';
import { MouseEvent } from 'react';
import { Icons } from '../UIIcon/UIIcon.type';

type UIButtonProps = UIComponentProps & {
	text?: string;
	activeText?: string;
	icon?: Icons;
	activeIcon?: Icons;
	iconPosition?: 'start' | 'end';
	delay?: number;
	disabled?: boolean;
	hasBorder?: boolean;
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
	onPress?: (e: MouseEvent<HTMLButtonElement>) => void;
	onHover?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default UIButtonProps;
