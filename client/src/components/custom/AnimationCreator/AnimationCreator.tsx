'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { getAnimations, getEffects } from '@/state/features/animation/animationApi';
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
	rectIntersection,
} from '@dnd-kit/core';
import handleDragEnd from './handleDragEnd';
import handleDragOver from './handleDragOver';
import DragOverlaySelector from './DragOverlaySelector/DragOverlaySelector';
import FramePlayer from '../FrameComps/FramePlayer/FramePlayer';
import RemoveDropZone from './RemoveDropZone/RemoveDropZone';
import TableTabs from './TableTabs/TableTabs';
import AnimationPlaylist from './AnimationPlaylist/AnimationPlaylist';
import styles from './AnimationCreator.module.scss';

const AnimationCreator = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [activeDragEvent, setActiveDragEvent] = useState<DragStartEvent | null>(null);

	// dispatch(getEffects());
	// dispatch(getAnimations());

	return (
		<div className={styles.animationCreator}>
			<DndContext
				onDragCancel={() => setActiveDragEvent(null)}
				onDragStart={(event: DragStartEvent) => setActiveDragEvent(event)}
				onDragEnd={(event: DragEndEvent) => handleDragEnd({ event, dispatch, setActiveDragEvent })}
				onDragOver={(event: DragOverEvent) =>
					handleDragOver({ event, dispatch, setActiveDragEvent })
				}
				collisionDetection={rectIntersection}
			>
				<TableTabs />
				{/* <AnimationPlaylist /> */}
				{/* <div className={styles.column}><FramePlayer /></div> */}
				<DragOverlaySelector dragEvent={activeDragEvent} />
			</DndContext>
		</div>
	);
};

export default AnimationCreator;
