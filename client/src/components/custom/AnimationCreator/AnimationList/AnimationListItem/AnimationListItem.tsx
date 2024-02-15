import { useAnimation } from '@/state/features/animation/animationSelector';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, memo } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { DndElements } from '@/types/misc.types';
import { TreeItem } from '@mui/x-tree-view';
import EffectList from './EffectList/EffectList';
import AnimationLabel from './AnimationLabel/AnimationLabel';
import styles from './AnimationListItem.module.scss';

export const AnimationListItem = ({ index }: { index: number }) => {
	const animation = useAnimation(index);

	const id = `${animation.name}/${index}`;

	const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
		useSortable({
			id,
			data: { type: DndElements.animationListItem },
			animateLayoutChanges: () => false,
		});

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0 : 1,
		cursor: isDragging ? 'grabbing' : 'grab',
	};

	const { effects, ...baseAnimation } = animation;

	return (
		<TreeItem
			ref={setNodeRef}
			nodeId={id}
			sx={style}
			label={
				<AnimationLabel
					index={index}
					animation={baseAnimation}
					attributes={attributes}
					listeners={listeners}
				/>
			}
		>
			<EffectList
				effects={animation.effects}
				animationIndex={index}
				animationName={animation.name}
			/>
		</TreeItem>
	);
};

export default memo(AnimationListItem);
