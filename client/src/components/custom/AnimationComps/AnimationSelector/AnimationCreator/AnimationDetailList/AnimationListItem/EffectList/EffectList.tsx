import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AnimationEffectT } from '@/state/features/animation/animation.types';
import { useDroppable } from '@dnd-kit/core';
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
	const items = effects.map((_, effectIndex) => `${animationIndex}/${effectIndex}`);

	const dropZoneId = `${animationName}_DropZone`;

	const { setNodeRef } = useDroppable({
		id: dropZoneId,
	});

	return (
		<ul className='p-0 m-0' ref={setNodeRef}>
			<SortableContext id={dropZoneId} items={items} strategy={verticalListSortingStrategy}>
				{items.map((item, i) => (
					<EffectListItem key={item} index={item} effect={effects[i]} />
				))}
			</SortableContext>
		</ul>
	);
};
export default EffectList;
