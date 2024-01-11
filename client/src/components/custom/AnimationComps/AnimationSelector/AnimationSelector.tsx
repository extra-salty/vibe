'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectAnimation } from '@/state/features/animation/animationSlice';
import { DndContext, DragEndEvent, DragStartEvent, rectIntersection } from '@dnd-kit/core';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { AnimationT } from '@/state/features/animation/animation.types';
import { AnimationServiceInstance } from '@/app/api/animation/_service';
import AnimationTableDragOverlay from './AnimationTableDragOverlay/AnimationTableDragOverlay';
import AnimationCreator from './AnimationCreator/AnimationCreator';
import AnimationTable from './AnimationTableComps/AnimationTable/AnimationTable';

const AnimationSelector = ({
	animations,
	effects,
}: {
	animations: AnimationT[];
	effects: BaseEffectT[];
}) => {
	const animationDropZoneId: string = 'animationDropZone';

	const dispatch = useDispatch();
	const [activeAnimation, setActiveAnimation] = useState<string | null>(null);

	const handleDragStart = (event: DragStartEvent) => setActiveAnimation(String(event.active.id));

	const handleDragEnd = async ({ active, over }: DragEndEvent) => {
		console.log('🚀 ~ handleDragEnd ~ over:', over?.id);
		console.log('🚀 ~ handleDragEnd ~ active:', active.id);
		if (over?.id === animationDropZoneId) {
			const animation = await AnimationServiceInstance.getAnimation(String(active.id));
			dispatch(selectAnimation(animation));
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
				<AnimationTableDragOverlay animation={activeAnimation} />
				<AnimationCreator animationDropZoneId={animationDropZoneId} effects={effects} />
			</DndContext>
		</div>
	);
};

export default AnimationSelector;
