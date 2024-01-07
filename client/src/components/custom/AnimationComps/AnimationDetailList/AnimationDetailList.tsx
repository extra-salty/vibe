import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnimationT } from '@/state/features/animation/animation.types';
import { moveAnimationEffect } from '@/state/features/animation/animationSlice';
import { DndContext, DragEndEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import AnimationDetailListItem from '../AnimationDetailListItem/AnimationDetailListItem';

const AnimationDetailList = ({ animations }: { animations: AnimationT[] }) => {
	const dispatch = useDispatch();
	const [activeEffect, setActiveEffect] = useState<string | null>(null);

	const handleDragStart = ({ active }: DragEndEvent) => setActiveEffect(String(active.id));

	const handleDragCancel = () => setActiveEffect(null);

	const handleDragOver = ({ active, over }: DragEndEvent) => {};

	const handleDragEnd = useCallback(
		({ active, over }: DragEndEvent) => {
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
		<ul className='flex'>
			<DndContext
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
			>
				{animations.map((animation, i) => (
					<AnimationDetailListItem key={animation.name} animationIndex={i} animation={animation} />
				))}
				<DragOverlay>{activeEffect ? <div>{activeEffect}</div> : null}</DragOverlay>
			</DndContext>
		</ul>
	);
};

export default AnimationDetailList;
