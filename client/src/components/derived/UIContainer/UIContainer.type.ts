import { UIComponentProps } from '../../UIComponent.type';

type UIContainerType = UIComponentProps & {
	label?: string;
	expanded?: boolean;
	children: React.ReactNode;
};

export default UIContainerType;
