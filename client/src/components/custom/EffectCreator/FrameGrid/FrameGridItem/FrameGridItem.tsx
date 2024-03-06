import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, memo, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { IconButton, Paper } from '@mui/material';
import { DragHandleOutlined } from '@mui/icons-material';
import FrameMenu from '@/components/custom/EffectCreator/FrameGrid/FrameGridItem/FrameMenu/FrameMenu';
import FrameDuration from './FrameDuration/FrameDuration';
import Frame from '../../../FrameComps/Frame/Frame';
import FrameCellHistory from './FrameCellHistory/FrameCellHistory';
import styles from './FrameGridItem.module.scss';
import { FrameStateT } from '@/types/animation.types';

const FrameGridItem = ({
	id,
	frameIndex,
	framesLength,
	frame,
}: {
	id: string;
	frameIndex: number;
	framesLength: number;
	frame: FrameStateT;
}) => {
	const { setNodeRef, attributes, listeners, isDragging, transform, transition } =
		useSortable({
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
		// <Paper>
		<div ref={setNodeRef} style={style} className={styles.item}>
			<div className={styles.row}>
				<IconButton style={style} {...listeners} {...attributes}>
					<DragHandleOutlined />
				</IconButton>
				<div>{`${frameIndex + 1}/${framesLength}`}</div>
				<FrameMenu frameIndex={frameIndex} isDisabled={isDisabled} />
				<FrameDuration frameIndex={frameIndex} duration={frame.duration} />
				<FrameCellHistory frameIndex={frameIndex} frame={frame} isDisabled={isDisabled} />
			</div>
			<Frame frameIndex={frameIndex} frameData={frame.data} isDisabled={isDisabled} />
		</div>
		// </Paper>
	);
};

export default memo(FrameGridItem);
