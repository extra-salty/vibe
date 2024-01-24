import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useFrameWidth, useFrames } from '@/state/features/effect/effectSelector';
import { setFrameWidth } from '@/state/features/effect/effectSlice';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { FrameStateT } from '@/types/effect.types';
import { Slider, Stack } from '@mui/material';
import FrameGridItem from './FrameGridItem/FrameGridItem';
import FrameDragOverlay from './FrameDragOverlay/FrameDragOverlay';
import styles from './FrameGrid.module.scss';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';

const FrameGrid = ({ framesAsd }: { framesAsd?: FrameStateT[] }) => {
	const dispatch = useDispatch();
	const frameWidth = useFrameWidth();
	const frames = useFrames();

	const items = frames.map((_, i) => i);
	const [activeEvent, setActiveEvent] = useState<DragStartEvent | null>(null);

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
		}

		setActiveEvent(null);
	};

	const handleSizeChange = (_: Event, value: number | number[]) => {
		dispatch(setFrameWidth(Array.isArray(value) ? 0 : value));
	};

	return (
		<div>
			<div className={styles.slider}>
				<UIIcon name={Icons.stack} width={12} height={12} />
				<Slider aria-label='Volume' value={frameWidth} onChange={handleSizeChange} />
				<UIIcon name={Icons.stack} width={18} height={18} />
			</div>
			<DndContext
				collisionDetection={closestCenter}
				onDragStart={(event: DragStartEvent) => setActiveEvent(event)}
				onDragCancel={() => setActiveEvent(null)}
				onDragEnd={handleDragEnd}
			>
				<SortableContext items={items} strategy={rectSortingStrategy}>
					{/* strategy={rectSwappingStrategy} */}
					<div className={styles.gridWrapper}>
						<div className={styles.grid}>
							{items.map((id) => (
								<FrameGridItem key={id} frameIndex={id} frame={frames[id]} />
							))}
						</div>
					</div>
				</SortableContext>
				<FrameDragOverlay activeEvent={activeEvent} />
			</DndContext>
		</div>
	);
};

export default FrameGrid;
