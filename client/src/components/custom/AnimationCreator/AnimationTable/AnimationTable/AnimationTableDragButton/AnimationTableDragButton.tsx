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
		<div ref={setNodeRef} {...attributes} {...listeners}>
			<IconButton>
				<DragHandleOutlined />
			</IconButton>
		</div>
		// <button ref={setNodeRef} {...attributes} {...listeners} className='bg-transparent'>
		// </button>
	);
};

export default AnimationTableDragButton;
