import { useDraggable } from '@dnd-kit/core';
import { DndElements } from '@/state/features/animation/animation.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIIcon from '@/components/base/UIIcon/UIIcon';

const EffectTableDragButton = ({ effectName }: { effectName: string }) => {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: effectName,
		data: { type: DndElements.newEffect },
	});

	return (
		<button ref={setNodeRef} {...attributes} {...listeners} className='bg-transparent'>
			<UIIcon name={Icons.drag} />
		</button>
	);
};

export default EffectTableDragButton;
