import { memo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { AnimationT } from '@/state/features/animation/animation.types';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import AnimationEffectListItem from '../AnimationEffectListItem/AnimationEffectListItem';

export const AnimationDetailListItem = ({
	animationIndex,
	animation,
}: {
	animationIndex: number;
	animation: AnimationT;
}) => {
	const items = animation.effects.map((_, effectIndex) => `${animationIndex}/${effectIndex}`);
	const dropZoneId = `${animation.name}_DropZone`;

	const { setNodeRef } = useDroppable({
		id: dropZoneId,
	});

	return (
		<li className='border-solid'>
			{animation.name}
			<SortableContext id={dropZoneId} items={items} strategy={verticalListSortingStrategy}>
				<ul ref={setNodeRef}>
					{items.map((item, i) => (
						<AnimationEffectListItem key={item} index={item} effect={animation.effects[i]} />
					))}
				</ul>
			</SortableContext>
		</li>
	);
};

export default memo(AnimationDetailListItem);
