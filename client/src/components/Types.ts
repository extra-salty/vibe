import { classCollection } from '@/helpers/appendClasses/appendClasses';
import { CSSProperties } from 'react';

export type UIComponentProps = {
	hidden?: boolean;
	styles?: CSSProperties;
	classes?: classCollection;
};

export default UIComponentProps;
