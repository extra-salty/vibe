import { useState, useCallback } from 'react';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import {
	DndContext,
	closestCenter,
	MouseSensor,
	DragOverlay,
	useSensor,
	useSensors,
	DragStartEvent,
	DragEndEvent,
	UniqueIdentifier,
} from '@dnd-kit/core';
import { useFrames } from '@/state/features/effect/effectSelector';
import FrameGridItem from '../FrameGridItem/FrameGridItem';
import style from './FrameGrid.module.scss';

const FrameGrid = () => {
	const frames = useFrames();
	const [items, setItems] = useState<number[]>(frames.map((_, i) => i));
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
	// const sensors = useSensors(useSensor(MouseSensor));

	const handleDragStart = useCallback((event: DragStartEvent) => setActiveId(event.active.id), []);

	const handleDragCancel = useCallback(() => setActiveId(null), []);

	const handleDragEnd = useCallback((event: DragEndEvent) => {
		const { active, over } = event;

		if (active.id !== over?.id) {
			setItems((items) => {
				const oldIndex = items.indexOf(Number(active.id));
				const newIndex = items.indexOf(Number(over?.id));
				return arrayMove(items, oldIndex, newIndex);
			});
		}

		setActiveId(null);
	}, []);

	return (
		<DndContext
			// sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}
		>
			<SortableContext items={items} strategy={rectSortingStrategy}>
				<div className={style.frameGrid}>
					{items.map((id) => (
						<FrameGridItem key={id} frameIndex={id} frame={frames[id]} />
					))}
				</div>
			</SortableContext>
			<DragOverlay>
				{activeId ? (
					<div
						style={{
							width: '100px',
							height: '100px',
							backgroundColor: 'red',
						}}
					></div>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};

export default FrameGrid;
