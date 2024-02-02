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
import AnimationList from './AnimationList/AnimationList';
import FramePlayer from '../FrameComps/FramePlayer/FramePlayer';
import RemoveDropZone from './RemoveDropZone/RemoveDropZone';
import TableTabs from './TableTabs/TableTabs';
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
				<TableTabs animations={animations} effects={effects} />
				<div className={styles.column}>{/* <FramePlayer /> */}</div>
				<DragOverlaySelector dragEvent={activeDragEvent} />
			</DndContext>
		</div>
	);
};

export default AnimationCreator;

// interface TabPanelProps {
// 	children?: React.ReactNode;
// 	index: number;
// 	value: number;
// }

// const [value, setValue] = useState<number>(0);

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// function CustomTabPanel({ children, value, index }: TabPanelProps) {
//   return (
//     <div
//       role='tabpanel'
//       style={{
//         // zIndex: `${index + 1}`,
//         height: '500px',
//       }}
//       // display: value != index ? 'none' : 'block'
//       hidden={value != index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//     >
//       {children}
//     </div>
//   );
// }

{
	/* <div>
<Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
  <Tab label='Animations' {...a11yProps(0)} />
  <Tab label='Static Effects' {...a11yProps(1)} />
</Tabs>
<CustomTabPanel value={value} index={0}>
  <AnimationTable initialAnimations={animations} />
</CustomTabPanel>
<CustomTabPanel value={value} index={1}>
  <EffectTable initialEffects={effects} />
</CustomTabPanel>
</div> */
}
