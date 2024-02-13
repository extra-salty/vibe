import {
	addEffect,
	moveAnimation,
	moveEffect,
} from '@/state/features/animation/animationSlice';
import { AppDispatch } from '@/state/store';
import { AnimationServiceInstance } from '@/app/api/animation/_service';
import { AnimationEffectState } from '@/types/animation.types';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import { DndElements } from '@/types/misc.types';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { getAnimation } from '@/state/features/animation/animationApi';

const handleDragEnd = async ({
	event,
	dispatch,
	setActiveDragEvent,
}: {
	event: DragEndEvent;
	dispatch: AppDispatch;
	setActiveDragEvent: React.Dispatch<React.SetStateAction<DragStartEvent | null>>;
}) => {
	const { active, over } = event;

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
					dispatch(
						getAnimation({
							id: String(active.id),
							index: over.data.current?.sortable?.index,
						}),
					);
					break;
				}
			}
			break;
		}
		//
		// case DndElements.newEffect: {
		// 	const effect = await EffectsServiceInstance.getEffect(String(active.id));
		// 	console.log('🚀 ~ effect:', effect);
		// 	const animationEffect = new AnimationEffectState(effect);

		// 	switch (overType) {
		// 		case DndElements.animationListItem: {
		// 			dispatch(
		// 				addEffect({
		// 					animationEffect,
		// 					coordinate: { x: over.data.current?.sortable.index, y: 0 },
		// 				}),
		// 			);
		// 			break;
		// 		}
		// 		case DndElements.effectListItem: {
		// 			dispatch(
		// 				addEffect({
		// 					animationEffect,
		// 					coordinate: {
		// 						x: over.data.current?.animationIndex,
		// 						y: over.data.current?.sortable.index,
		// 					},
		// 				}),
		// 			);
		// 			break;
		// 		}
		// 	}
		// 	break;
		// }
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

export default handleDragEnd;
