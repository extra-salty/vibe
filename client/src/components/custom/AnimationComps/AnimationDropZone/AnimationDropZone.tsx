import { useSelectedAnimations } from '@/state/features/animation/animationSelector';
import { useDroppable } from '@dnd-kit/core';
import AnimationDetailList from '../AnimationDetailList/AnimationDetailList';

export const ANIMATION_DROP_ZONE_ID = 'animationDropZone';

const AnimationDropZone = () => {
	const { setNodeRef } = useDroppable({
		id: ANIMATION_DROP_ZONE_ID,
	});

	const selectedAnimations = useSelectedAnimations();

	return (
		<div className='flex  border-solid border border-white' ref={setNodeRef}>
			<AnimationDetailList animations={selectedAnimations} />
		</div>
	);
};

export default AnimationDropZone;
