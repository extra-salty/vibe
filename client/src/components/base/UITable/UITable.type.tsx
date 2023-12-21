import { UIComponentProps } from '@/components/UIComponent.type';

type UITableProps<T, K extends keyof T> = UIComponentProps & {
	data: T[];
	header: UITableHeaderType<T, K>[];
	// isLoading: boolean;
	// error: React.ReactNode;
};

export default UITableProps;

export type UITableHeaderType<T, K extends keyof T> = {
	key: K;
	header: string | React.ReactNode;
	classes?: string;
};
