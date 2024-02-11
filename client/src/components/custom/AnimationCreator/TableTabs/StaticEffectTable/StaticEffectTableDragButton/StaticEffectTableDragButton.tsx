import { useDraggable } from '@dnd-kit/core';
import { DndElements } from '@/types/misc.types';
import { DragHandle } from '@mui/icons-material';

const StaticEffectTableDragButton = ({ effectName }: { effectName: string }) => {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: effectName,
		data: { type: DndElements.newEffect },
	});

	return (
		<button ref={setNodeRef} {...attributes} {...listeners} className='bg-transparent'>
			<DragHandle />
		</button>
	);
};

export default StaticEffectTableDragButton;
