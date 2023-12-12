import UIComponentProps from '@/components/Types';
import { Icons } from '../UIIcon/UIIcon.type';

type UIInputType = UIComponentProps & {
	value?: string;
	readonly?: boolean;
	disabled?: boolean;
	placeholder?: string;
	label?: string;
	minLength?: number;
	maxLength?: number;
	icon?: Icons;
	iconPosition?: 'start' | 'end';
	onChange: (value: string) => void;
};

export default UIInputType;
