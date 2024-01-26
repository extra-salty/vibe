import { useDispatch } from 'react-redux';
import { CSSProperties, useState } from 'react';
import { useFrameWidth, useFrames } from '@/state/features/effect/effectSelector';
import { moveFrame, setFrameWidth } from '@/state/features/effect/effectSlice';
import { SortableContext, rectSortingStrategy, rectSwappingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter, DragStartEvent, DragEndEvent, Active } from '@dnd-kit/core';
import { FrameStateT } from '@/types/effect.types';
import { Slider, Stack } from '@mui/material';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import FrameGridItem from './FrameGridItem/FrameGridItem';
import FrameDragOverlay from './FrameDragOverlay/FrameDragOverlay';
import styles from './FrameGrid.module.scss';
import UIIcon from '@/components/base/UIIcon/UIIcon';

const FrameGrid = ({ framesAsd }: { framesAsd?: FrameStateT[] }) => {
	const dispatch = useDispatch();
	const frameWidth = useFrameWidth();
	const frames = useFrames();
	const [activeEvent, setActiveEvent] = useState<Active | null>(null);

	const itemIds = frames.map((_, i) => `frame${i}`);

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		if (!over) {
			setActiveEvent(null);
			return;
		}

		if (active.id !== over.id) {
			dispatch(
				moveFrame({
					startIndex: active.data.current?.sortable.index,
					endIndex: over.data.current?.sortable.index,
				}),
			);
		}

		setActiveEvent(null);
	};

	const handleSizeChange = (_: Event, value: number | number[]) => {
		dispatch(setFrameWidth(Array.isArray(value) ? 0 : value));
	};

	const style: CSSProperties = {
		cursor: activeEvent ? 'grabbing' : 'auto',
	};

	return (
		<div style={style}>
			<div className={styles.slider}>
				<UIIcon name={Icons.stack} width={12} height={12} />
				<Slider aria-label='frame-size' value={frameWidth} onChange={handleSizeChange} marks />
				<UIIcon name={Icons.stack} width={18} height={18} />
			</div>
			<DndContext
				collisionDetection={closestCenter}
				onDragStart={({ active }: { active: Active }) => setActiveEvent(active)}
				onDragCancel={() => setActiveEvent(null)}
				onDragEnd={handleDragEnd}
			>
				<SortableContext items={itemIds} strategy={rectSortingStrategy}>
					<div className={styles.gridWrapper}>
						<div className={styles.grid}>
							{itemIds.map((id, i) => (
								<FrameGridItem key={i} id={id} frameIndex={i} frame={frames[i]} />
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
