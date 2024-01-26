import { useFrame } from '@/state/features/effect/effectSelector';
import { Active, DragOverlay } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import FrameGridItem from '../FrameGridItem/FrameGridItem';

const FrameDragOverlay = ({ activeEvent }: { activeEvent: Active | null }) => {
	const frameIndex = activeEvent?.data.current?.sortable.index;
	const frame = useFrame(frameIndex);

	return (
		<DragOverlay modifiers={[restrictToParentElement]} dropAnimation={null}>
			{activeEvent ? <FrameGridItem id='' frame={frame} frameIndex={frameIndex} /> : null}
		</DragOverlay>
	);
};

export default FrameDragOverlay;
