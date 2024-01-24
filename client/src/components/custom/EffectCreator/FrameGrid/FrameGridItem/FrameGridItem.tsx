import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, memo, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { FrameStateT } from '@/types/effect.types';
import Frame from '../../../FrameComps/Frame/Frame';
import FrameActions from '../../../FrameComps/FrameActions/FrameActions';
import styles from './FrameGridItem.module.scss';

const FrameGridItem = ({ frameIndex, frame }: { frame: FrameStateT; frameIndex: number }) => {
	const { isDragging, setNodeRef, transform, transition } = useSortable({
		id: frameIndex,
	});

	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	const style: CSSProperties = {
		transformOrigin: '50% 50%',
		// cursor: isDragging ? 'grabbing' : 'grab',
		// transition: transition || undefined,

		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? '100' : 'auto',
		opacity: isDragging ? 0.3 : 1,
	};

	return (
		<div ref={setNodeRef} style={style} className={styles.item}>
			<FrameActions
				frame={frame}
				frameIndex={frameIndex}
				isDisabled={isDisabled}
				setIsDisabled={setIsDisabled}
			/>
			<Frame frameIndex={frameIndex} frameData={frame.data} isDisabled={isDisabled} />
		</div>
	);
};

export default memo(FrameGridItem);
