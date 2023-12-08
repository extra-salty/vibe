import { UIComponentType } from '../../Types';

type UIContainerType = UIComponentType & {
	key?: string;
	label?: string;
	expanded?: boolean;
	children: React.ReactNode;
};

export default UIContainerType;
