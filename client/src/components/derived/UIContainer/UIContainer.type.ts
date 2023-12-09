import { UIComponentType } from '../../Types';

type UIContainerType = UIComponentType & {
	label?: string;
	expanded?: boolean;
	children: React.ReactNode;
};

export default UIContainerType;
