import { useDraggable } from '@dnd-kit/core';
import { DndElements } from '@/types/misc.types';
import { DragHandle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { GridRowModel } from '@mui/x-data-grid';

const AnimationTableDragButton = ({ animation }: { animation: GridRowModel }) => {
	const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
		id: animation._id,
		data: { type: DndElements.newAnimation, animation },
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
