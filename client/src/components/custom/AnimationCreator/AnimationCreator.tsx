'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
	rectIntersection,
} from '@dnd-kit/core';
import { AnimationBaseT } from '@/types/animation.types';
import { EffectTableT } from '@/types/effect.types';
import handleDragEnd from './handleDragEnd';
import handleDragOver from './handleDragOver';
import DragOverlaySelector from './DragOverlaySelector/DragOverlaySelector';
import AnimationTable from './AnimationTable/AnimationTable/AnimationTable';
import EffectTable from './EffectTable/EffectTable';
import AnimationList from './AnimationList/AnimationList';
import FramePlayer from '../FrameComps/FramePlayer/FramePlayer';
import RemoveDropZone from './RemoveDropZone/RemoveDropZone';
import styles from './AnimationCreator.module.scss';

const AnimationCreator = ({
	animations,
	effects,
}: {
	animations: AnimationBaseT[];
	effects: EffectTableT[];
}) => {
	const dispatch = useDispatch();
	const [activeDragEvent, setActiveDragEvent] = useState<DragStartEvent | null>(null);

	return (
		<div className={styles.columns}>
			<DndContext
				onDragCancel={() => setActiveDragEvent(null)}
				onDragStart={(event: DragStartEvent) => setActiveDragEvent(event)}
				onDragEnd={(event: DragEndEvent) => handleDragEnd({ event, dispatch, setActiveDragEvent })}
				onDragOver={(event: DragOverEvent) =>
					handleDragOver({ event, dispatch, setActiveDragEvent })
				}
				collisionDetection={rectIntersection}
			>
				<div className={styles.tables}>
					{/* <AnimationTable initialAnimations={animations} /> */}
					<EffectTable initialEffects={effects} />
				</div>
				<div className={styles.column}>
					<AnimationList />
					{/* <RemoveDropZone /> */}
				</div>
				<div className={styles.column}>
					<FramePlayer />
				</div>
				<DragOverlaySelector dragEvent={activeDragEvent} />
			</DndContext>
		</div>
	);
};

export default AnimationCreator;
