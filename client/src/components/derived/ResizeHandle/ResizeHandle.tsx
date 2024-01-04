import { PanelResizeHandle } from 'react-resizable-panels';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import styles from './ResizeHandle.module.scss';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';

type ResizeHandleProps = {
	id?: string;
	className?: string;
	align?: 'horizontal' | 'vertical';
};

const ResizeHandle = ({ id, align, className }: ResizeHandleProps) => {
	return (
		<PanelResizeHandle className={appendClasses([styles.ResizeHandleOuter, className])} id={id}>
			<UIIcon name={Icons.resize} isRotated={align === 'vertical'} />
		</PanelResizeHandle>
	);
};

export default ResizeHandle;
