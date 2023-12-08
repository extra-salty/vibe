import { classCollection } from '@/helpers/appendClasses/appendClasses';

export type UIComponentType = {
	hidden?: boolean;
	style?: React.CSSProperties;
	classes?: classCollection;
};

export default UIComponentType;
