import { DragOverlay } from '@dnd-kit/core';

const EffectDragOverlay = ({ activeEffect }: { activeEffect: string | null }) => {
	return <DragOverlay>{activeEffect ? <div>{activeEffect}</div> : null}</DragOverlay>;
};

export default EffectDragOverlay;
