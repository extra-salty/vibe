import UIIcon from '@/components/base/UIIcon/UIIcon';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { DndElements } from '@/types/misc.types';
import { useDroppable } from '@dnd-kit/core';

const RemoveDropZone = () => {
	const { setNodeRef, isOver, active } = useDroppable({
		id: DndElements.removeDropZone,
		data: { type: DndElements.removeDropZone },
	});

	return (
		<div ref={setNodeRef}>
			<UIIcon name={Icons.delete} />
		</div>
	);
};

export default RemoveDropZone;
