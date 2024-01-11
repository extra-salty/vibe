import { DragOverlay } from '@dnd-kit/core';

const DragOverlaySelector = ({ activeItem }: { activeItem: string | null }) => {
	return <DragOverlay>{activeItem ? <div>{activeItem}</div> : null}</DragOverlay>;
};

export default DragOverlaySelector;
