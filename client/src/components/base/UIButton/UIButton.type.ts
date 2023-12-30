import UIComponentProps from '@/components/UIComponent.type';
import { MouseEvent } from 'react';
import { Icons } from '../UIIcon/UIIcon.types';

type UIButtonProps = UIComponentProps & {
	text?: string;
	icon?: Icons;
	iconPosition?: 'start' | 'end';
	iconSize?: number;
	delay?: number;
	disabled?: boolean;
	hasBorder?: boolean;
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
	onPress?: (e: MouseEvent<HTMLButtonElement>) => void;
	onHover?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default UIButtonProps;
