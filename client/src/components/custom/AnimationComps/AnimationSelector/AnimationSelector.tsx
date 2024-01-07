import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedAnimations } from '@/state/features/animation/animationSlice';
import { VibeServiceInstance } from '@/services/vibe/vibeService';
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	rectIntersection,
} from '@dnd-kit/core';
import { AnimationT } from '@/state/features/animation/animation.types';
import AnimationList from '../AnimationList/AnimationList';
import AnimationDropZone, { ANIMATION_DROP_ZONE_ID } from '../AnimationDropZone/AnimationDropZone';
import AnimationDragOverlay from '../AnimationDragOverlay/AnimationDragOverlay';

export const AnimationSelector = ({ animations }: { animations: AnimationT[] }) => {
	const dispatch = useDispatch();

	const [activeAnimation, setActiveAnimation] = useState<string | null>(null);

	const handleDragStart = (event: DragStartEvent) => {
		setActiveAnimation(String(event.active.id));
	};

	const handleDragEnd = async ({ active, over }: DragEndEvent) => {
		if (over?.id === ANIMATION_DROP_ZONE_ID) {
			const animation = await VibeServiceInstance.getAnimation(String(active.id));
			dispatch(setSelectedAnimations(animation));
		}
		setActiveAnimation(null);
	};

	const handleDragCancel = () => setActiveAnimation(null);

	return (
		<div className='flex'>
			<DndContext
				onDragStart={handleDragStart}
				// onDragOver={() => {}}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
				collisionDetection={rectIntersection}
			>
				<AnimationList animations={animations} />
				<AnimationDropZone />
				<DragOverlay>
					{activeAnimation ? <AnimationDragOverlay name={activeAnimation} /> : null}
				</DragOverlay>
			</DndContext>
		</div>
	);
};

export default AnimationSelector;
