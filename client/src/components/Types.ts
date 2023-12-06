import { classCollection } from '@/helpers/appendClasses/appendClasses';

export type ComponentType = {
	hidden?: boolean;
	style?: React.CSSProperties;
	classes?: classCollection;
};

export default ComponentType;
