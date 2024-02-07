import { useDraggable } from '@dnd-kit/core';
import { DndElements } from '@/types/misc.types';
import { DragHandleOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const AnimationTableDragButton = ({ animationName }: { animationName: string }) => {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: `${animationName}`,
		data: { type: DndElements.newAnimation },
	});

	return (
		// <div >
		<IconButton ref={setNodeRef} {...attributes} {...listeners}>
			<DragHandleOutlined />
		</IconButton>
		// </div>
	);
};

export default AnimationTableDragButton;
