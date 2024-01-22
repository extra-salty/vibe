import { PanelResizeHandle } from 'react-resizable-panels';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import styles from './ResizeHandle.module.scss';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';

const ResizeHandle = ({
	id,
	align,
	className,
}: {
	id?: string;
	className?: string;
	align?: 'horizontal' | 'vertical';
}) => {
	return (
		<PanelResizeHandle className={appendClasses([styles.ResizeHandleOuter, className])} id={id}>
			<UIIcon name={Icons.resize} isRotated={align === 'vertical'} />
		</PanelResizeHandle>
	);
};

export default ResizeHandle;
