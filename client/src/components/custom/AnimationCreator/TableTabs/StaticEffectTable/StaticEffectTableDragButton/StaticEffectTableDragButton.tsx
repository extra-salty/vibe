import { useDraggable } from '@dnd-kit/core';
import { DndElements } from '@/types/misc.types';
import { DragHandle } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const StaticEffectTableDragButton = ({ effectName }: { effectName: string }) => {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: effectName,
		data: { type: DndElements.newEffect },
	});

	return (
		<IconButton ref={setNodeRef} {...attributes} {...listeners}>
			<DragHandle />
		</IconButton>
	);
};

export default StaticEffectTableDragButton;
