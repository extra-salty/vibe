import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, memo, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { FrameStateT } from '@/types/effect.types';
import Frame from '../../../FrameComps/Frame/Frame';
import FrameActions from '../../../FrameComps/FrameActions/FrameActions';
import DurationSlider from '@/components/custom/FrameComps/DurationSlider/DurationSlider';
import DurationInput from '@/components/custom/FrameComps/DurationInput/DurationInput';
import styles from './FrameGridItem.module.scss';
import { IconButton } from '@mui/material';
import { DragHandleOutlined } from '@mui/icons-material';
import FrameActionButtons from '@/components/custom/FrameComps/FrameActions/FrameActionButtons/FrameActionButtons';

const FrameGridItem = ({
	id,
	frameIndex,
	frame,
}: {
	id: string;
	frameIndex: number;
	frame: FrameStateT;
}) => {
	const { setNodeRef, attributes, listeners, isDragging, transform, transition } = useSortable({
		id,
		animateLayoutChanges: () => false,
	});

	const [isFreezed, setIsFreezed] = useState<boolean>(false);
	const isDisabled = isFreezed || isDragging || !id;

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0 : 1,
		cursor: isDragging ? 'grabbing' : 'grab',
	};

	return (
		<div ref={setNodeRef} style={style} className={styles.item}>
			<div>
				<IconButton style={style} {...listeners} {...attributes}>
					<DragHandleOutlined />
				</IconButton>
				<div className={styles.frameActions}>
					<FrameActionButtons frameIndex={frameIndex} frame={frame} isDisabled={isDisabled} />
				</div>
			</div>
			<div className={styles.rightColumn}>
				<Frame frameIndex={frameIndex} frameData={frame.data} isDisabled={isDisabled} />
				<div className={styles.duration}>
					{/* <DurationInput frameIndex={frameIndex} duration={frame.duration} /> */}
					<DurationSlider frameIndex={frameIndex} duration={frame.duration} />
				</div>
			</div>
		</div>
	);
};

export default memo(FrameGridItem);
