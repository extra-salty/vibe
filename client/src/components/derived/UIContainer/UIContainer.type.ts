import { UIComponentProps } from '../../Types';

type UIContainerType = UIComponentProps & {
	label?: string;
	expanded?: boolean;
	children: React.ReactNode;
};

export default UIContainerType;
