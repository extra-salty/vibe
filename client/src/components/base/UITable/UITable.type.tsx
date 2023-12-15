import ComponentType from '@/components/UIComponent.type';

type UITableType<T, K extends keyof T> = ComponentType & {
	data: T[];
	header: UITableColumnType<T, K>[];
};

export default UITableType;

export type UITableColumnType<T, K extends keyof T> = {
	key: K;
	text: string;
	classes?: string;
};
