'use client';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEffect, moveEffect } from '@/state/features/animation/animationSlice';
import { DndContext, DragEndEvent, closestCenter, useDroppable } from '@dnd-kit/core';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import EffectDragOverlay from '../../EffectComps/EffectDragOverlay/EffectDragOverlay';
import AnimationDetailList from '../AnimationDetailList/AnimationDetailList';
import EffectTable from '../../EffectComps/EffectTableComps/EffectTable/EffectTable';

const AnimationCreator = ({
	animationDropZoneId,
	effects,
}: {
	animationDropZoneId: string;
	effects: BaseEffectT[];
}) => {
	const dispatch = useDispatch();
	const [activeEffect, setActiveEffect] = useState<string | null>(null);

	const handleDragStart = ({ active }: DragEndEvent) => setActiveEffect(String(active.id));

	const handleDragCancel = () => setActiveEffect(null);

	const handleDragOver = ({ active, over }: DragEndEvent) => {};

	const handleDragEnd = useCallback(
		({ active, over }: DragEndEvent) => {
			// console.log('active', active.id);
			// console.log('over', over?.id);

			if (!over) {
				setActiveEffect(null);
				return;
			}

			if (active.id !== over?.id) {
				const [startX, startY] = String(active.id).split('/');
				const [endX, endY] = String(over.id)
					.split('/')
					.map((coordinate) => Number(coordinate));

				if (startX === 'effect') {
					dispatch(
						addEffect({
							effectName: startY,
							endCoordinate: { x: endX, y: endY },
						}),
					);
				} else {
					dispatch(
						moveEffect({
							startCoordinate: { x: Number(startX), y: Number(startY) },
							endCoordinate: { x: endX, y: endY },
						}),
					);
				}
			}

			setActiveEffect(null);
		},
		[dispatch],
	);

	const { setNodeRef } = useDroppable({
		id: 'animationDropZone',
	});

	return (
		<div className='flex border-white min-w-60 ' ref={setNodeRef}>
			<DndContext
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
			>
				<AnimationDetailList />
				<EffectTable initialEffects={effects} />
				<EffectDragOverlay activeEffect={activeEffect} />
			</DndContext>
		</div>
	);
};

export default AnimationCreator;
