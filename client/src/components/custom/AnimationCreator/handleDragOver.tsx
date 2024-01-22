import { AnimationServiceInstance } from '@/app/api/animation/_service';
import { overAnimation } from '@/state/features/animation/animationSlice';
import { AppDispatch } from '@/state/store';
import { DndElements } from '@/types/misc.types';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

const handleDragOver = async ({
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
		// setActiveDragEvent(null);
		return;
	}

	const activeType = active.data.current?.type;
	const overType = over.data.current?.type;

	console.log('over: ', over);
	console.log('active: ', active);
	console.log('overtType:', overType);
	console.log('activeType:', activeType);

	switch (activeType) {
		case DndElements.newAnimation: {
			switch (overType) {
				case DndElements.animationListItem: {
					// const selectedAnimation = await AnimationServiceInstance.getAnimation(String(active.id));

					console.log(over.data.current?.sortable.index);

					// dispatch(overAnimation({ selectedAnimation, index: over.data.current?.sortable.index }));
					break;
				}
			}
			break;
		}
	}
};

export default handleDragOver;
