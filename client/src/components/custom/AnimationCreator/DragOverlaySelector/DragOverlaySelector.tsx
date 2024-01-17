import { DndElements } from '@/state/features/animation/animation.types';
import { DragOverlay, DragStartEvent, Modifiers } from '@dnd-kit/core';
import { DropAnimationOptions } from '@dnd-kit/core/dist/components/DragOverlay/hooks/useDropAnimation';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';

const DragOverlaySelector = ({ dragEvent }: { dragEvent: DragStartEvent | null }) => {
	const dropAnimationOptions: DropAnimationOptions = {
		duration: 500,
	};

	let dragElement: React.ReactNode = null;
	let modifier: Modifiers = [];

	switch (dragEvent?.active.data.current?.type) {
		case DndElements.animationListItem: {
			modifier = [restrictToParentElement, restrictToVerticalAxis];
			dragElement = <div>{dragEvent.active.id}</div>;
		}
		case DndElements.newAnimation:
		case DndElements.newEffect: {
			dragElement = <div>{dragEvent.active.id}</div>;
			break;
		}
		case DndElements.effectListItem: {
			dragElement = <div>{dragEvent.active.id}</div>;
			modifier = [restrictToVerticalAxis];
			break;
		}
	}

	return (
		<DragOverlay dropAnimation={dropAnimationOptions} modifiers={modifier}>
			{dragEvent ? dragElement : null}
		</DragOverlay>
	);
};

export default DragOverlaySelector;
