import { useDraggable } from '@dnd-kit/core';
import { DndElements } from '@/types/misc.types';
import { DragHandle } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const AnimationTableDragButton = ({ id }: { id: string }) => {
	const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
		id,
		data: { type: DndElements.newAnimation },
	});

	return (
		<IconButton
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			sx={{ cursor: isDragging ? 'grab' : 'grabbing' }}
		>
			<DragHandle />
		</IconButton>
	);
};

export default AnimationTableDragButton;
