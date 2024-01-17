import { useState } from 'react';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { StateFrameT } from '@/state/features/effect/effectSlice.types';
import FrameGridItem from './FrameGridItem/FrameGridItem';
import style from './FrameGrid.module.scss';
import FrameDragOverlay from './FrameDragOverlay/FrameDragOverlay';

const FrameGrid = ({ frames }: { frames: StateFrameT[] }) => {
	const items = frames.map((_, i) => i);
	const [activeEvent, setActiveEvent] = useState<DragStartEvent | null>(null);

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
		}

		setActiveEvent(null);
	};

	return (
		<div>
			<DndContext
				collisionDetection={closestCenter}
				onDragStart={(event: DragStartEvent) => setActiveEvent(event)}
				onDragCancel={() => setActiveEvent(null)}
				onDragEnd={handleDragEnd}
			>
				{/* strategy={rectSwappingStrategy} */}
				<SortableContext items={items} strategy={rectSortingStrategy}>
					<div className={style.frameGrid}>
						{items.map((id) => (
							<FrameGridItem key={id} frameIndex={id} frame={frames[id]} />
						))}
					</div>
				</SortableContext>
				<FrameDragOverlay activeEvent={activeEvent} />
			</DndContext>
		</div>
	);
};

export default FrameGrid;
