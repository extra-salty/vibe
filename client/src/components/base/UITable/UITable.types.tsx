import { UIComponentProps } from '@/components/UIComponent.type';
import { UISelectOptionProps } from '../UISelect/UISelect.type';
import UIButtonProps from '../UIButton/UIButton.type';

export type UITableProps<T> = UIComponentProps & {
	data: T[];
	header: UITableHeaderProps<T>[];
	actions?: UIButtonProps[];
	options: UITableOptionsProps;
};

export type UITableHeaderProps<T> = {
	id: Extract<keyof T, string>;
	header: React.ReactNode;
	classes?: string;
	isSortable?: boolean;
};

export type UITableOptionsProps = {
	sortOptions?: UISelectOptionProps[];
	filterOptions?: UISelectOptionProps[];
	selectedOptions?: UITableOptionsValueT;
	setSelectedOptions: React.Dispatch<React.SetStateAction<UITableOptionsValueT>>;
};

export type UITableOptionsValueT = {
	sortOptionValue: string;
	sortDirection: SortDirection;
	filterOptionValue: string;
	filterValue: string;
};

export enum SortDirection {
	asc = 'asc',
	des = 'des',
}
