import { useDroppable } from '@dnd-kit/core';
import { memo } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndElements, StateAnimationEffectT } from '@/state/features/animation/animation.types';
import EffectListItem from './EffectListItem/EffectListItem';

const EffectList = ({
	effects,
	animationIndex,
	animationName,
}: {
	effects: StateAnimationEffectT[];
	animationIndex: number;
	animationName: string;
}) => {
	const items = effects.map((effect, i) => `${effect.data.name}/${animationIndex}/${i}`);

	const { setNodeRef } = useDroppable({
		id: animationName,
		data: { type: DndElements.effectList, index: animationIndex },
	});

	return (
		<ul ref={setNodeRef} className='m-0 p-0 list-none'>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{effects.map((effect, i) => {
					return (
						<EffectListItem key={i} index={i} animationIndex={animationIndex} effect={effect} />
					);
				})}
			</SortableContext>
		</ul>
	);
};
export default memo(EffectList);
