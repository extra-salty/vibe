import useEffectListData, { EffectListDataT } from './useEffectListData';
import { useDroppable } from '@dnd-kit/core';
import { memo } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndElements } from '@/state/features/animation/animation.types';
import { UITableHeaderProps } from '@/components/base/UITable/UITable.types';
import { BaseAnimationEffectT } from '@/app/api/animation/_types';
import EffectListItem from './EffectListItem/EffectListItem';

const EffectList = ({
	effects,
	animationIndex,
	animationName,
	header,
}: {
	effects: BaseAnimationEffectT[];
	animationIndex: number;
	animationName: string;
	header: UITableHeaderProps<EffectListDataT>[];
}) => {
	const items = effects.map((effect) => effect.name);

	const effectsData = useEffectListData(effects);

	const { setNodeRef } = useDroppable({
		id: animationName,
		data: { type: DndElements.effectList, index: animationIndex },
	});

	return (
		<ul ref={setNodeRef} className='m-0 p-0 list-none'>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{effects.map((effect: any, i) => {
					return <EffectListItem key={i} index={i} effect={effect} header={header} />;
				})}
			</SortableContext>
		</ul>
	);
};
export default memo(EffectList);
