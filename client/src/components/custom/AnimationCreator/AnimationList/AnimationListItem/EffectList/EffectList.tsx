import { useDroppable } from '@dnd-kit/core';
import { memo } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AnimationEffectT, DndElements } from '@/state/features/animation/animation.types';
import EffectListItem from './EffectListItem/EffectListItem';

const EffectList = ({
	effects,
	animationIndex,
	animationName,
}: {
	effects: AnimationEffectT[];
	animationIndex: number;
	animationName: string;
}) => {
	const items = effects.map((effect) => effect.name);

	const { setNodeRef } = useDroppable({
		id: animationName,
		data: { type: DndElements.effectList, index: animationIndex },
	});

	return (
		<ul className='p-0 m-0' ref={setNodeRef}>
			<SortableContext id={animationName} items={items} strategy={verticalListSortingStrategy}>
				{items.map((item, i) => (
					<EffectListItem key={item} index={item} effect={effects[i]} />
				))}
			</SortableContext>
		</ul>
	);
};
export default memo(EffectList);
