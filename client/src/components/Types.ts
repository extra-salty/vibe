import { classCollection } from '@/helpers/appendClass/appendClass';

export type ComponentType = {
	hidden?: boolean;
	style?: React.CSSProperties;
	classes?: classCollection;
};

export default ComponentType;
