import { Icons } from '../UIIcon/UIIcon.types';
import { HTMLInputTypeAttribute } from 'react';
import UIComponentProps from '@/components/UIComponent.type';

type UIInputProps = UIComponentProps & {
	type?: HTMLInputTypeAttribute;
	value?: string;
	readonly?: boolean;
	disabled?: boolean;
	placeholder?: string;
	minLength?: number;
	maxLength?: number;
	label?: string;
	icon?: Icons;
	iconPosition?: 'start' | 'end';
	onChange?: (value: string) => void;
};

export default UIInputProps;
