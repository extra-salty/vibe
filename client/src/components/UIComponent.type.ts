import { classCollection } from '@/misc/hooks/appendClasses/appendClasses';
import { CSSProperties } from 'react';

export type UIComponentProps = {
	hidden?: boolean;
	styles?: CSSProperties;
	classes?: classCollection;
};

export default UIComponentProps;
