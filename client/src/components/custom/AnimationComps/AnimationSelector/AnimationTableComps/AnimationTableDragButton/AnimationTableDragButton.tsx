import { useDraggable } from '@dnd-kit/core';

const AnimationTableDragButton = ({ animationName }: { animationName: string }) => {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: animationName,
	});

	return (
		<button ref={setNodeRef} {...attributes} {...listeners}>
			{'Drag'}
		</button>
	);
};

export default AnimationTableDragButton;
