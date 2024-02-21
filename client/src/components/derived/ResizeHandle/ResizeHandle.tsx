import { PanelResizeHandle } from 'react-resizable-panels';
import { DragHandle } from '@mui/icons-material';
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
		<PanelResizeHandle
			className={appendClasses([styles.ResizeHandleOuter, className])}
			id={id}
		>
			<DragHandle />
		</PanelResizeHandle>
	);
};

export default ResizeHandle;
