import { UIComponentProps } from '../../UIComponent.type';

type UIContainerProps = UIComponentProps & {
	label?: string;
	expandable?: boolean;
	isExpanded?: boolean;
	children: React.ReactNode;
};

export default UIContainerProps;
