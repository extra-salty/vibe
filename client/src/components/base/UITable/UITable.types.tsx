import { UIComponentProps } from '@/components/UIComponent.type';
import { UITableOptionsProps } from '../UITableOptions/UITableOptions';

export type UITableProps<T> = UIComponentProps & {
	data: T[];
	header: UITableHeaderProps<T>[];
	options?: UITableOptionsProps;
};

export type UITableHeaderProps<T> = {
	key: keyof T;
	header: React.ReactNode;
	classes?: string;
};
