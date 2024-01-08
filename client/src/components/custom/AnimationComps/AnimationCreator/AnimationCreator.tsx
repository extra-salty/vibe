'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedAnimations } from '@/state/features/animation/animationSlice';
import { AnimationT } from '@/state/features/animation/animation.types';
import { VibeServiceInstance } from '@/services/vibe/vibeService';
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	rectIntersection,
} from '@dnd-kit/core';
import AnimationList from '../AnimationList/AnimationList';
import AnimationDragOverlay from '../AnimationDragOverlay/AnimationDragOverlay';
import AnimationDetailList from '../AnimationDetailList/AnimationDetailList';

const AnimationCreator = ({ animations }: { animations: AnimationT[] }) => {
	const animationDropZoneId = 'animationDropZone';

	const dispatch = useDispatch();
	const [activeAnimation, setActiveAnimation] = useState<string | null>(null);

	const handleDragStart = (event: DragStartEvent) => setActiveAnimation(String(event.active.id));

	const handleDragEnd = async ({ active, over }: DragEndEvent) => {
		if (over?.id === animationDropZoneId) {
			const animation = await VibeServiceInstance.getAnimation(String(active.id));
			dispatch(setSelectedAnimations(animation));
		}
		setActiveAnimation(null);
	};

	const handleDragCancel = () => setActiveAnimation(null);

	return (
		<div className={'flex bg-gray-600'}>
			<DndContext
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
				collisionDetection={rectIntersection}
			>
				<AnimationList animations={animations} />
				<AnimationDetailList animationDropZoneId={animationDropZoneId} />
				<DragOverlay>
					{activeAnimation ? <AnimationDragOverlay name={activeAnimation} /> : null}
				</DragOverlay>
			</DndContext>
		</div>
	);
};

export default AnimationCreator;
