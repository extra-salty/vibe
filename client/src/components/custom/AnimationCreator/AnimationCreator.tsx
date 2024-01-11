'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEffect, selectAnimation } from '@/state/features/animation/animationSlice';
import { DndContext, DragEndEvent, DragStartEvent, rectIntersection } from '@dnd-kit/core';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import {
	AnimationEffectT,
	AnimationT,
	DndElements,
} from '@/state/features/animation/animation.types';
import { AnimationServiceInstance } from '@/app/api/animation/_service';
import DragOverlaySelector from './DragOverlaySelector/DragOverlaySelector';
import AnimationTable from './AnimationTable/AnimationTable/AnimationTable';
import EffectTable from './EffectTable/EffectTable';
import AnimationList from './AnimationList/AnimationList';
import { EffectServiceInstance } from '@/app/api/effect/_service';

const AnimationCreator = ({
	animations,
	effects,
}: {
	animations: AnimationT[];
	effects: BaseEffectT[];
}) => {
	const dispatch = useDispatch();
	const [activeItem, setActiveItem] = useState<string | null>(null);

	const handleDragStart = (event: DragStartEvent) => setActiveItem(String(event.active.id));

	const handleDragEnd = async ({ active, over }: DragEndEvent) => {
		if (!over) {
			setActiveItem(null);
			return;
		}
		console.log('over: ', over);
		console.log('active: ', active);

		const activeType = active.data.current?.type;
		console.log('🚀 ~ handleDragEnd ~ activeType:', activeType);
		const overType = over.data.current?.type;
		console.log('🚀 ~ handleDragEnd ~ overtType:', overType);

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
						const effect: AnimationEffectT = {
							type: 'static',
							name: String(active.id),
							repeat: 1,
						};

						dispatch(addEffect({ effect, coordinate: { x: over.data.current?.index, y: 0 } }));
						break;
					}
				}
				break;
			}
			//
		}

		setActiveItem(null);
	};

	const handleDragCancel = () => setActiveItem(null);

	return (
		<div className={'flex justify-between bg-gray-600'}>
			<DndContext
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
				collisionDetection={rectIntersection}
			>
				<div className='flex flex-col'>
					<AnimationTable initialAnimations={animations} />
					<EffectTable initialEffects={effects} />
				</div>
				<AnimationList />

				<DragOverlaySelector activeItem={activeItem} />
			</DndContext>
		</div>
	);
};

export default AnimationCreator;

// const handleDragStart = ({ active }: DragEndEvent) => setActiveEffect(String(active.id));

// const handleDragCancel = () => setActiveEffect(null);

// const handleDragEnd = ({ active, over }: DragEndEvent) => {
//   if (!over) {
//     setActiveEffect(null);
//     return;
//   }
//   console.log(active.id);
//   console.log(over.id);

//   if (active.id !== over.id) {
//     const [animationName, startIndex] = String(active.id)
//       .split('/')
//       .map((e) => Number(e));
//     const endIndex = String(over.id)
//       .split('/')
//       .map((e) => Number(e))[1];

//     dispatch(moveAnimation({ startIndex, endIndex }));
//   }

//   setActiveEffect(null);
// };
