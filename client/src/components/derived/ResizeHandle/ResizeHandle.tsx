import { PanelResizeHandle } from 'react-resizable-panels';
import { DragHandle } from '@mui/icons-material';
import styles from './ResizeHandle.module.scss';

const ResizeHandle = () => {
	return (
		<PanelResizeHandle className={styles.resizeHandle}>
			<DragHandle fontSize='small' />
		</PanelResizeHandle>
	);
};

export default ResizeHandle;
