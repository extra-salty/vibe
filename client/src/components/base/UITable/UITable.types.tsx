import { UIComponentProps } from '@/components/UIComponent.type';
import { UITableOptionsProps } from './UITableOptions/UITableOptions';
import UIButtonProps from '../UIButton/UIButton.type';

export type UITableProps<T> = UIComponentProps & {
	data: T[];
	header: UITableHeaderProps<T>[];
	actions?: UIButtonProps[];
	options?: UITableOptionsProps;
};

export type UITableHeaderProps<T> = {
	key: keyof T;
	header: React.ReactNode;
	classes?: string;
};
