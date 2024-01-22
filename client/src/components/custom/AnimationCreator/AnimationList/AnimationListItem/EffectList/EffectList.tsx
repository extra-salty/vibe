import { useDroppable } from '@dnd-kit/core';
import { memo } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AnimationEffectStateT } from '@/types/animation.types';
import { DndElements } from '@/types/misc.types';
import EffectListItem from './EffectListItem/EffectListItem';
import styles from './EffectList.module.scss';

const EffectList = ({
	effects,
	animationIndex,
	animationName,
}: {
	effects: AnimationEffectStateT[];
	animationIndex: number;
	animationName: string;
}) => {
	const items = effects.map((effect, i) => `${effect.data.name}/${animationIndex}/${i}`);

	const { setNodeRef } = useDroppable({
		id: animationName,
		data: { type: DndElements.effectList, index: animationIndex },
	});

	return (
		<ul ref={setNodeRef} className={styles.list}>
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
