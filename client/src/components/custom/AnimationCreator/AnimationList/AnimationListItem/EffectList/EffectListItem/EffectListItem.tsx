import { useSortable } from '@dnd-kit/sortable';
import { DndElements } from '@/state/features/animation/animation.types';
import { CSS } from '@dnd-kit/utilities';
import { memo } from 'react';
import { UITableHeaderProps } from '@/components/base/UITable/UITable.types';
import { EffectListDataT } from '../useEffectListData';

const EffectListItem = ({
	index,
	effect,
	header,
}: {
	index: number;
	header: UITableHeaderProps<EffectListDataT>[];
	effect: EffectListDataT;
}) => {
	const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
		id: index,
		data: { type: DndElements.effectListItem, index: index },
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<li ref={setNodeRef} style={style} className='flex gap-2'>
			{header.map((column, j) => {
				return <div key={`cell-${j}`}>{effect[column.key]}</div>;
			})}
		</li>
	);
};

export default memo(EffectListItem);
