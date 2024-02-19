'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
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
import { AnimationBaseT } from '@/types/animation.types';
import { EffectTableT } from '@/types/effect.types';
import { animationsActions } from '@/state/features/animations/animationSlice';
import { staticEffectsActions } from '@/state/features/staticEffects/staticEffectsSlice';
import Playlist from './Playlist/Playlist';
import styles from './AnimationCreator.module.scss';

const AnimationCreator = ({
	animations,
	effects,
}: {
	animations: AnimationBaseT[];
	effects: EffectTableT[];
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [activeDragEvent, setActiveDragEvent] = useState<DragStartEvent | null>(null);

	dispatch(staticEffectsActions.setStaticEffectsData(effects));
	dispatch(animationsActions.setAnimationsData(animations));

	return (
		<div className={styles.animationCreator}>
			<DndContext
				onDragCancel={() => setActiveDragEvent(null)}
				onDragStart={(event: DragStartEvent) => setActiveDragEvent(event)}
				onDragEnd={(event: DragEndEvent) =>
					handleDragEnd({ event, dispatch, setActiveDragEvent })
				}
				onDragOver={(event: DragOverEvent) =>
					handleDragOver({ event, dispatch, setActiveDragEvent })
				}
				collisionDetection={rectIntersection}
			>
				<TableTabs />
				{/* <Playlist /> */}
				{/* <div className={styles.column}><FramePlayer /></div> */}
				<DragOverlaySelector dragEvent={activeDragEvent} />
			</DndContext>
		</div>
	);
};

export default AnimationCreator;
