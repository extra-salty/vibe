import { useDraggable } from '@dnd-kit/core';

const EffectTableDragButton = ({ effectName }: { effectName: string }) => {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: `effect/${effectName}`,
	});

	return (
		<button ref={setNodeRef} {...attributes} {...listeners}>
			{'Drag'}
		</button>
	);
};

export default EffectTableDragButton;
