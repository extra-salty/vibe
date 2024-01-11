import { useSortable } from '@dnd-kit/sortable';
import { AnimationEffectT, DndElements } from '@/state/features/animation/animation.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { CSS } from '@dnd-kit/utilities';
import { memo } from 'react';
import UIIcon from '@/components/base/UIIcon/UIIcon';

const EffectListItem = ({ index, effect }: { index: string; effect: AnimationEffectT }) => {
	const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
		id: index,
		data: { type: DndElements.effectListItem, index: index },
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		border: '1px dashed red',
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<li className='flex' ref={setNodeRef} style={style}>
			<div>{effect.name}</div>
			<button {...attributes} {...listeners}>
				<UIIcon name={Icons.drag} />
			</button>
		</li>
	);
};

export default memo(EffectListItem);
