import { useSortable } from '@dnd-kit/sortable';
import { memo } from 'react';
import { AnimationT } from '@/state/features/animation/animation.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { CSS } from '@dnd-kit/utilities';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import EffectList from './EffectList/EffectList';

export const AnimationListItem = ({
	index,
	animation,
}: {
	index: number;
	animation: AnimationT;
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: `${animation.name}/${index}`,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<li className='p-0 m-0 border-solid bg-blue-300' style={style} ref={setNodeRef}>
			<div className='flex align-center'>
				<button className='bg-transparent' {...attributes} {...listeners}>
					<UIIcon name={Icons.width} />
				</button>
				<div>{animation.name}</div>
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
