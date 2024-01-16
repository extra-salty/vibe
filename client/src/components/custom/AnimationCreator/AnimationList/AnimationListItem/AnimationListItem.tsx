import useAnimationHeader from './useAnimationHeader';
import { useSortable } from '@dnd-kit/sortable';
import { memo } from 'react';
import { DndElements } from '@/state/features/animation/animation.types';
import { CSS } from '@dnd-kit/utilities';
import { BaseAnimationT } from '@/app/api/animation/_types';
import EffectList from './EffectList/EffectList';

export const AnimationListItem = ({
	index,
	animation,
}: {
	index: number;
	animation: BaseAnimationT;
}) => {
	const animationHeader = useAnimationHeader({ animation, index });

	const { setNodeRef, attributes, listeners, transform, transition, isDragging, isOver } =
		useSortable({
			id: `${animation.name}/${index}`,
			data: { type: DndElements.animationListItem, index: index },
		});

	const style = {
		opacity: isDragging ? 0.5 : undefined,
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<li ref={setNodeRef} style={style} className='flex flex-col p-0 m-0 border-solid'>
			<div className='flex'>
				{animationHeader.map(({ key, header, classes }) => (
					<div key={key} className={`${classes}`}>
						{header}
					</div>
				))}
			</div>
			{/* <EffectList
				effects={animation.effects}
				animationIndex={index}
				animationName={animation.name}
				header={animationHeader}
			/> */}
		</li>
	);
};

export default memo(AnimationListItem);

// const handleAnimationSave = async () => {
// 	console.log('🚀 ~ handleAnimationSave ~ animation:', animation);
// 	await AnimationServiceInstance.updateAnimation(animation);
// };

// const handleAnimationRemove = async () => {};
