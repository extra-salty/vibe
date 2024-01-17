import useColumns, { AnimationDataT } from '../useColumns';
import { useSortable } from '@dnd-kit/sortable';
import { memo } from 'react';
import { DndElements, StateAnimationT } from '@/state/features/animation/animation.types';
import { CSS } from '@dnd-kit/utilities';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import EffectList from './EffectList/EffectList';

export const AnimationListItem = ({
	index,
	animation,
}: {
	index: number;
	animation: StateAnimationT;
}) => {
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
		numbering: index + 1,
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
		<li ref={setNodeRef} style={style} className='flex flex-col p-0 m-0 border border-solid'>
			<div className='flex items-center'>
				{animationColumns.map(({ content, classes }, i) => (
					<div key={i} className={`${classes}`}>
						{content}
					</div>
				))}
			</div>
			<EffectList
				effects={animation.effects}
				animationIndex={index}
				animationName={animation.name}
			/>
		</li>
	);
};

export default memo(AnimationListItem);
