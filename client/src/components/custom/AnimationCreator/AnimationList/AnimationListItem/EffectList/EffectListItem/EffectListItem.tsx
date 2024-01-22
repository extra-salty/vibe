import useColumns, { EffectDataT } from '../../../useColumns';
import { useSortable } from '@dnd-kit/sortable';
import { memo } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { AnimationEffectStateT } from '@/types/animation.types';
import { DndElements } from '@/types/misc.types';
import UIButton from '@/components/base/UIButton/UIButton';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import UILink from '@/components/base/UILink/UILink';
import styles from './EffectListItem.module.scss';

const EffectListItem = ({
	index,
	animationIndex,
	effect,
}: {
	index: number;
	animationIndex: number;
	effect: AnimationEffectStateT;
}) => {
	const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
		id: `${effect.data.name}/${animationIndex}/${index}`,
		data: { type: DndElements.effectListItem, animationIndex },
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	const effectData: EffectDataT = {
		numbering: <div>{index + 1}</div>,
		name: <UILink href={`effect/${effect.data.name}`}>{effect.data.name}</UILink>,
		description: effect.data.description || '-',
		frames: effect.data.frames.length,
		duration: effect.data.frames.reduce((total, current) => total + current.duration, 0) / 1000,
		repeat: effect.repeat,
		play: <UIButton icon={Icons.play} onClick={() => {}} />,
		drag: (
			<button {...attributes} {...listeners}>
				<UIIcon name={Icons.width} isRotated height={12} width={12} />
			</button>
		),
	};
	const effectColumns = useColumns(effectData);

	return (
		<li ref={setNodeRef} style={style} className={styles.item}>
			{effectColumns.map(({ content, classes }, i) => {
				return (
					<div key={i} className={`${classes} text-left`}>
						{content}
					</div>
				);
			})}
		</li>
	);
};

export default memo(EffectListItem);
