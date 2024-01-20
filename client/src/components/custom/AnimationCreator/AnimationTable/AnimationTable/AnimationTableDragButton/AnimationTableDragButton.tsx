import { useDraggable } from '@dnd-kit/core';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { DndElements } from '@/types/misc.types';
import UIIcon from '@/components/base/UIIcon/UIIcon';

const AnimationTableDragButton = ({ animationName }: { animationName: string }) => {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: `${animationName}`,
		data: { type: DndElements.newAnimation },
	});

	return (
		<button ref={setNodeRef} {...attributes} {...listeners} className='bg-transparent'>
			<UIIcon name={Icons.drag} />
		</button>
	);
};

export default AnimationTableDragButton;
