import ComponentType from '@/components/Types';

type UITableType<T, K extends keyof T> = ComponentType & {
	data: T[];
	columns: TableColumnType<T, K>[];
};

export default UITableType;

export type TableColumnType<T, K extends keyof T> = {
	key: K;
	header: string;
	classes?: string;
};
