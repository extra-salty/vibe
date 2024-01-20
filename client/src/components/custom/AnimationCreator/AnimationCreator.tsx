'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DndContext, DragEndEvent, DragStartEvent, rectIntersection } from '@dnd-kit/core';
import { AnimationServiceInstance } from '@/app/api/animation/_service';
import {
	addEffect,
	moveAnimation,
	moveEffect,
	selectAnimation,
} from '@/state/features/animation/animationSlice';

import { EffectServiceInstance } from '@/app/api/effect/_service';
import { AnimationBaseT, AnimationEffectState } from '@/types/animation.types';
import { EffectTableT } from '@/types/effect.types';
import { DndElements } from '@/types/misc.types';
import DragOverlaySelector from './DragOverlaySelector/DragOverlaySelector';
import AnimationTable from './AnimationTable/AnimationTable/AnimationTable';
import EffectTable from './EffectTable/EffectTable';
import AnimationList from './AnimationList/AnimationList';
import FramePlayer from '../FrameComps/FramePlayer/FramePlayer';

const AnimationCreator = ({
	animations,
	effects,
}: {
	animations: AnimationBaseT[];
	effects: EffectTableT[];
}) => {
	const dispatch = useDispatch();
	const [activeDragEvent, setActiveDragEvent] = useState<DragStartEvent | null>(null);

	const handleDragEnd = async ({ active, over }: DragEndEvent) => {
		if (!over) {
			setActiveDragEvent(null);
			return;
		}

		const activeType = active.data.current?.type;
		const overType = over.data.current?.type;

		// console.log('over: ', over);
		// console.log('active: ', active);
		// console.log('overtType:', overType);
		// console.log('activeType:', activeType);

		switch (activeType) {
			case DndElements.newAnimation: {
				switch (overType) {
					case DndElements.animationList:
					case DndElements.animationListItem: {
						const selectedAnimation = await AnimationServiceInstance.getAnimation(
							String(active.id),
						);

						dispatch(selectAnimation({ selectedAnimation, index: over.data.current?.index }));
						break;
					}
				}
				break;
			}
			//
			case DndElements.newEffect: {
				const effect = await EffectServiceInstance.getEffect(String(active.id));
				const animationEffect = new AnimationEffectState(effect);

				switch (overType) {
					case DndElements.animationListItem: {
						dispatch(
							addEffect({
								animationEffect,
								coordinate: { x: over.data.current?.sortable.index, y: 0 },
							}),
						);
						break;
					}
					case DndElements.effectListItem: {
						dispatch(
							addEffect({
								animationEffect,
								coordinate: {
									x: over.data.current?.animationIndex,
									y: over.data.current?.sortable.index,
								},
							}),
						);
						break;
					}
				}
				break;
			}
			//
			case DndElements.animationListItem: {
				dispatch(
					moveAnimation({
						startIndex: active.data.current?.sortable.index,
						endIndex: over.data.current?.sortable.index,
					}),
				);
				break;
			}
			//
			case DndElements.effectListItem: {
				dispatch(
					moveEffect({
						startCoordinate: {
							x: active.data.current?.animationIndex,
							y: active.data.current?.sortable.index,
						},
						endCoordinate: {
							x: over.data.current?.animationIndex,
							y: over.data.current?.sortable.index,
						},
					}),
				);
				break;
			}
		}

		setActiveDragEvent(null);
	};

	return (
		<div className={'flex justify-between border-r-8'}>
			<DndContext
				onDragStart={(event: DragStartEvent) => setActiveDragEvent(event)}
				onDragCancel={() => setActiveDragEvent(null)}
				onDragEnd={handleDragEnd}
				collisionDetection={rectIntersection}
			>
				<div className='flex flex-col gap-6'>
					<AnimationTable initialAnimations={animations} />
					<EffectTable initialEffects={effects} />
				</div>
				<div>
					{/* <FramePlayer /> */}
					{/* <AnimationList /> */}
				</div>
				<DragOverlaySelector dragEvent={activeDragEvent} />
			</DndContext>
		</div>
	);
};

export default AnimationCreator;
