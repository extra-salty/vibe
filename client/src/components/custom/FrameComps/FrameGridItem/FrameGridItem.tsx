import { useSortable } from '@dnd-kit/sortable';
import { StateFrameT } from '@/state/features/effect/effectSlice.types';
import { CSSProperties, memo, useState } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Frame from '../Frame/Frame';
import FrameActions from '../FrameActions/FrameActions';
import style from './FrameGridItem.module.scss';

type FrameGridItemProps = {
	frame: StateFrameT;
	frameIndex: number;
};

const FrameGridItem = ({ frameIndex, frame }: FrameGridItemProps) => {
	const { isDragging, setNodeRef, transform, transition } = useSortable({
		id: frameIndex,
	});

	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	const inlineStyles: CSSProperties = {
		transformOrigin: '50% 50%',
		// cursor: isDragging ? 'grabbing' : 'grab',
		// transition: transition || undefined,

		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? '100' : 'auto',
		opacity: isDragging ? 0.3 : 1,
	};

	return (
		<div ref={setNodeRef} className={style.frameItem} style={inlineStyles}>
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
