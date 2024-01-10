'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedAnimationsDetails } from '@/state/features/animation/animationSlice';
import { DndContext, DragEndEvent, DragStartEvent, rectIntersection } from '@dnd-kit/core';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { AnimationT } from '@/state/features/animation/animation.types';
import { AnimationServiceInstance } from '@/app/api/animation/_service';
import AnimationDragOverlay from '../AnimationDragOverlay/AnimationDragOverlay';
import AnimationCreator from '../AnimationCreator/AnimationCreator';
import AnimationTable from '../AnimationTableComps/AnimationTable/AnimationTable';

const AnimationSelector = ({
	animations,
	effects,
}: {
	animations: AnimationT[];
	effects: BaseEffectT[];
}) => {
	const animationDropZoneId = 'animationDropZone';

	const dispatch = useDispatch();
	const [activeAnimation, setActiveAnimation] = useState<string | null>(null);

	const handleDragStart = (event: DragStartEvent) => setActiveAnimation(String(event.active.id));

	const handleDragEnd = async ({ active, over }: DragEndEvent) => {
		console.log('🚀 ~ handleDragEnd ~ over:', over);

		if (over?.id === animationDropZoneId) {
			const animation = await AnimationServiceInstance.getAnimation(String(active.id));
			dispatch(setSelectedAnimationsDetails(animation));
		}
		setActiveAnimation(null);
	};

	const handleDragCancel = () => setActiveAnimation(null);

	return (
		<div className={'flex justify-between bg-gray-600'}>
			<DndContext
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
				collisionDetection={rectIntersection}
			>
				<AnimationTable initialAnimations={animations} />
				<AnimationCreator animationDropZoneId={animationDropZoneId} effects={effects} />
				<AnimationDragOverlay activeAnimation={activeAnimation} />
			</DndContext>
		</div>
	);
};

export default AnimationSelector;
