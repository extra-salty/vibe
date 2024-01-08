import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectedAnimations } from '@/state/features/animation/animationSelector';
import { moveAnimationEffect } from '@/state/features/animation/animationSlice';
import { DndContext, DragEndEvent, DragOverlay, closestCenter, useDroppable } from '@dnd-kit/core';
import AnimationDetailListItem from '../AnimationDetailListItem/AnimationDetailListItem';
import EffectList from '../../EffectComps/EffectList/EffectList';

const AnimationDetailList = ({ animationDropZoneId }: { animationDropZoneId: string }) => {
	const dispatch = useDispatch();
	const selectedAnimations = useSelectedAnimations();
	const [activeEffect, setActiveEffect] = useState<string | null>(null);
	const { setNodeRef } = useDroppable({
		id: animationDropZoneId,
	});

	const handleDragStart = ({ active }: DragEndEvent) => setActiveEffect(String(active.id));

	const handleDragCancel = () => setActiveEffect(null);

	const handleDragOver = ({ active, over }: DragEndEvent) => {};

	const handleDragEnd = useCallback(
		({ active, over }: DragEndEvent) => {
			console.log('🚀 ~ file: AnimationDetailList.tsx:80 ~ AnimationDetailList ~ over:', over);

			if (!over) {
				setActiveEffect(null);
				return;
			}

			if (active.id !== over?.id) {
				const [startX, startY] = String(active.id)
					.split('/')
					.map((coordinate) => Number(coordinate));
				const [endX, endY] = String(over.id)
					.split('/')
					.map((coordinate) => Number(coordinate));

				dispatch(
					moveAnimationEffect({
						startCoordinate: { x: startX, y: startY },
						endCoordinate: { x: endX, y: endY },
					}),
				);
			}

			setActiveEffect(null);
		},
		[dispatch],
	);

	return (
		<ul className='flex border-white min-w-60 list-none m-0 p-0' ref={setNodeRef}>
			<DndContext
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
			>
				{selectedAnimations.map((animation, i) => (
					<AnimationDetailListItem key={animation.name} animationIndex={i} animation={animation} />
				))}
				<EffectList
					effects={[
						{
							_id: 'id',
							name: 'name',
							dateCreated: new Date(),
							dateModified: new Date(),
							frames: [],
							description: 'desc',
						},
					]}
				/>
				<DragOverlay>{activeEffect ? <div>{activeEffect}</div> : null}</DragOverlay>
			</DndContext>
		</ul>
	);
};

export default AnimationDetailList;
