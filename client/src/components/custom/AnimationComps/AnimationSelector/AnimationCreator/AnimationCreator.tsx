'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DndContext, DragEndEvent, closestCenter, useDroppable } from '@dnd-kit/core';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import AnimationList from './AnimationDetailList/AnimationList';
import AnimationListDragOverlay from './AnimationListDragOverlay/AnimationListDragOverlay';
import { moveAnimation } from '@/state/features/animation/animationSlice';
import EffectTable from '@/components/custom/EffectComps/EffectTableComps/EffectTable/EffectTable';

const AnimationCreator = ({
	animationDropZoneId,
	effects,
}: {
	animationDropZoneId: string;
	effects: BaseEffectT[];
}) => {
	const dispatch = useDispatch();
	const [activeAnimation, setActiveEffect] = useState<string | null>(null);

	const handleDragStart = ({ active }: DragEndEvent) => setActiveEffect(String(active.id));

	const handleDragCancel = () => setActiveEffect(null);

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		if (!over) {
			setActiveEffect(null);
			return;
		}
		console.log(active.id);
		console.log(over.id);

		if (active.id !== over.id) {
			const [animationName, startIndex] = String(active.id)
				.split('/')
				.map((e) => Number(e));
			const endIndex = String(over.id)
				.split('/')
				.map((e) => Number(e))[1];

			dispatch(moveAnimation({ startIndex, endIndex }));
		}

		setActiveEffect(null);
	};

	const { setNodeRef } = useDroppable({
		id: animationDropZoneId,
	});

	return (
		<div className='flex border-white min-w-60' ref={setNodeRef}>
			<DndContext
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
			>
				<AnimationList animationDropZoneId={animationDropZoneId} />
				<EffectTable initialEffects={effects} />
				<AnimationListDragOverlay animation={activeAnimation} />
			</DndContext>
		</div>
	);
};

export default AnimationCreator;
