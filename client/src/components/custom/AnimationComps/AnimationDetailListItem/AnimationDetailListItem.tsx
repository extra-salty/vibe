import { useDroppable } from '@dnd-kit/core';
import { memo } from 'react';
import { AnimationT } from '@/state/features/animation/animation.types';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import AnimationEffectListItem from '../AnimationEffectListItem/AnimationEffectListItem';

export const AnimationDetailListItem = ({
	animationIndex,
	animationDetails,
}: {
	animationIndex: number;
	animationDetails: AnimationT;
}) => {
	const items = animationDetails.effects.map(
		(_, effectIndex) => `${animationIndex}/${effectIndex}`,
	);
	const dropZoneId = `${animationDetails.name}_DropZone`;

	const { setNodeRef } = useDroppable({
		id: dropZoneId,
	});

	return (
		<li className='p-0 m-0 border-solid bg-blue-300'>
			{animationDetails.name}
			<SortableContext id={dropZoneId} items={items} strategy={verticalListSortingStrategy}>
				<ul className='p-0 m-0' ref={setNodeRef}>
					{items.map((item, i) => (
						<AnimationEffectListItem key={item} index={item} effect={animationDetails.effects[i]} />
					))}
				</ul>
			</SortableContext>
		</li>
	);
};

export default memo(AnimationDetailListItem);
