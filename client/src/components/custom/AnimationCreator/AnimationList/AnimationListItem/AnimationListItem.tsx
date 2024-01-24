import { AnimationDataT } from '../useColumns';
import { useSortable } from '@dnd-kit/sortable';
import { memo, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { AnimationStateT } from '@/types/animation.types';
import { DndElements } from '@/types/misc.types';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import EffectList from './EffectList/EffectList';
import styles from './AnimationListItem.module.scss';

export const AnimationListItem = ({
	index,
	animation,
}: {
	index: number;
	animation: AnimationStateT;
}) => {
	const [isEffectsVisible, setIsEffectsHidden] = useState<boolean>(false);
	const { setNodeRef, attributes, listeners, transform, transition, isDragging, isOver } =
		useSortable({
			id: `${animation.name}/${index}`,
			data: { type: DndElements.animationListItem },
		});

	const style = {
		opacity: isDragging ? 0.5 : undefined,
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const animationData: AnimationDataT = {
		numbering: animation.effects.length ? (
			<div className={styles.expand} onClick={() => setIsEffectsHidden((s) => !s)}>
				<div>{index + 1}</div>
				<UIIcon name={Icons.expandMore} width={12} height={12} isFlipped={isEffectsVisible} />
			</div>
		) : (
			index + 1
		),
		name: animation.name,
		description: animation.description,
		frames: animation.effects.reduce((frames, effect) => frames + effect.data.frames.length, 0),
		duration: animation.effects.reduce(
			(duration, effect) => duration + effect.data.frames.length,
			0,
		),
		repeat: null,
		play: '',
		drag: (
			<button className='bg-transparent' {...attributes} {...listeners}>
				<UIIcon name={Icons.width} isRotated height={20} width={20} />
			</button>
		),
	};
	const animationColumns = useColumns(animationData);

	return (
		<li ref={setNodeRef} style={style} className={styles.item}>
			<div className={styles.animation}>
				{animationColumns.map(({ content, classes }, i) => (
					<div key={i} className={`${classes}`}>
						{content}
					</div>
				))}
			</div>
			{isEffectsVisible && (
				<EffectList
					effects={animation.effects}
					animationIndex={index}
					animationName={animation.name}
				/>
			)}
		</li>
	);
};

export default memo(AnimationListItem);
