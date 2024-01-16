'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DndContext, DragEndEvent, DragStartEvent, rectIntersection } from '@dnd-kit/core';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { BaseAnimationT } from '@/app/api/animation/_types';
import { AnimationServiceInstance } from '@/app/api/animation/_service';
import {
	addEffect,
	moveAnimation,
	selectAnimation,
} from '@/state/features/animation/animationSlice';
import { DndElements } from '@/state/features/animation/animation.types';
import DragOverlaySelector from './DragOverlaySelector/DragOverlaySelector';
import AnimationTable from './AnimationTable/AnimationTable/AnimationTable';
import EffectTable from './EffectTable/EffectTable';
import AnimationList from './AnimationList/AnimationList';
import FramePlayer from '../FrameComps/FramePlayer/FramePlayer';

const AnimationCreator = ({
	animations,
	effects,
}: {
	animations: BaseAnimationT[];
	effects: BaseEffectT[];
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
				switch (overType) {
					case DndElements.animationListItem: {
						// const effect: AnimationEffectT = {
						// 	type: 'static',
						// 	name: String(active.id),
						// 	repeat: 1,
						// };
						// dispatch(addEffect({ effect, coordinate: { x: over.data.current?.index, y: 0 } }));
						// break;
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
					<AnimationList />
				</div>
				<DragOverlaySelector dragEvent={activeDragEvent} />
			</DndContext>
		</div>
	);
};

export default AnimationCreator;
