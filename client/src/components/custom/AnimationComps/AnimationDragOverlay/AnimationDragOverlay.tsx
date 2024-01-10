import { DragOverlay } from '@dnd-kit/core';

const AnimationDragOverlay = ({ activeAnimation }: { activeAnimation: string | null }) => {
	return <DragOverlay>{activeAnimation ? <div>activeAnimation</div> : null}</DragOverlay>;
};

export default AnimationDragOverlay;
