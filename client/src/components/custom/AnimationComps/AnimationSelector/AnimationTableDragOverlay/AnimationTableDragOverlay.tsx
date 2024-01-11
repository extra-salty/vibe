import { DragOverlay } from '@dnd-kit/core';

const AnimationTableDragOverlay = ({ animation }: { animation: string | null }) => {
	return <DragOverlay>{animation ? <div>{animation}</div> : null}</DragOverlay>;
};

export default AnimationTableDragOverlay;
