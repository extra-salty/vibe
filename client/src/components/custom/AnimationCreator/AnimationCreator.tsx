'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { DragStartEvent } from '@dnd-kit/core';
import { AnimationT } from '@/types/animation.types';
import { StaticAnimationTableT } from '@/types/effect.types';
import { animationsActions } from '@/state/features/animations/animationSlice';
import { staticEffectsActions } from '@/state/features/staticEffects/staticEffectsSlice';
import { Panel, PanelGroup } from 'react-resizable-panels';
import ResizeHandle from '@/components/derived/ResizeHandle/ResizeHandle';
import TableTabs from './TableTabs/TableTabs';
import Playlist from './Playlist/Playlist';
import FramePlayer from '../FrameComps/FramePlayer/FramePlayer';
import styles from './AnimationCreator.module.scss';

const AnimationCreator = ({
	animations,
	effects,
}: {
	animations: AnimationT[];
	effects: StaticAnimationTableT[];
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [activeDragEvent, setActiveDragEvent] = useState<DragStartEvent | null>(null);

	dispatch(staticEffectsActions.setData(effects));
	dispatch(animationsActions.setData(animations));

	return (
		<PanelGroup direction='horizontal' className={styles.animationCreator}>
			<Panel defaultSize={40} minSize={20} className={styles.row}>
				<TableTabs />
			</Panel>
			<ResizeHandle />
			<Panel defaultSize={40} minSize={20} className={styles.row}>
				{/* <Playlist /> */}
			</Panel>
			<ResizeHandle />
			<Panel defaultSize={20} minSize={10} className={styles.row}>
				{/* <FramePlayer /> */}
			</Panel>
		</PanelGroup>
	);
};

export default AnimationCreator;

{
	/* <DndContext
onDragCancel={() => setActiveDragEvent(null)}
onDragStart={(event: DragStartEvent) => setActiveDragEvent(event)}
// onDragEnd={(event: DragEndEvent) =>
// 	handleDragEnd({ event, dispatch, setActiveDragEvent })
// }
// onDragOver={(event: DragOverEvent) =>
// 	handleDragOver({ event, dispatch, setActiveDragEvent })
// }
collisionDetection={rectIntersection}
<DragOverlaySelector dragEvent={activeDragEvent} />
			</DndContext>
> */
}
