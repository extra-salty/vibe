import { DndElements } from '@/types/misc.types';
import { DragOverlay, DragStartEvent, Modifiers } from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import AnimationListItem from '../AnimationList/AnimationListItem/AnimationListItem';
import NewAnimationOverlay from './NewAnimationOverlay/NewAnimationOverlay';

const DragOverlaySelector = ({ dragEvent }: { dragEvent: DragStartEvent | null }) => {
	const current = dragEvent?.active.data.current;
	let dragElement: React.ReactNode = null;
	let modifier: Modifiers = [];

	switch (current?.type) {
		case DndElements.newAnimation: {
			dragElement = <NewAnimationOverlay animation={current?.animation} />;
			break;
		}
		case DndElements.newEffect: {
			dragElement = <div>asd</div>;
			break;
		}
		case DndElements.animationListItem: {
			modifier = [restrictToParentElement, restrictToVerticalAxis];
			dragElement = <AnimationListItem index={current?.sortable.index} />;
			break;
		}
		case DndElements.effectListItem: {
			dragElement = <div>adasd</div>;
			modifier = [restrictToVerticalAxis];
			break;
		}
	}

	return (
		<DragOverlay modifiers={modifier} dropAnimation={null}>
			{dragEvent ? dragElement : null}
		</DragOverlay>
	);
};

export default DragOverlaySelector;
