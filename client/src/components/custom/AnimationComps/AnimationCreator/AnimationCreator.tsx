'use client';
import { useState } from 'react';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { AnimationT } from '@/state/features/animation/animation.types';
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	UniqueIdentifier,
	rectIntersection,
} from '@dnd-kit/core';
import EffectDragOverlay from '../../EffectComps/EffectDragOverlay/EffectDragOverlay';
import EffectList from '../../EffectComps/EffectList/EffectList';
import AnimationList from '../AnimationList/AnimationList';
import styles from './AnimationCreator.module.scss';
import AnimationSelector from '../AnimationSelector/AnimationSelector';

type AnimationCreatorProps = {
	effects: BaseEffectT[];
	animations: AnimationT[];
};

const AnimationCreator = ({ effects, animations }: AnimationCreatorProps) => {
	const [activeItem, setActiveId] = useState<string | null>(null);

	const handleDragStart = (event: DragStartEvent) => setActiveId(String(event.active.id));

	const handleDragCancel = () => setActiveId(null);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (active.id !== over?.id) {
			// setItems((items) => {
			// 	const oldIndex = items.indexOf(Number(active.id));
			// 	const newIndex = items.indexOf(Number(over?.id));
			// 	return arrayMove(items, oldIndex, newIndex);
			// });
		}
		setActiveId(null);
	};

	return (
		<div className={styles.effectList}>
			{/* <DndContext
				onDragStart={handleDragStart}
				// onDragOver={() => {}}
				onDragCancel={handleDragCancel}
				onDragEnd={handleDragEnd}
				collisionDetection={rectIntersection}
			> */}
			<div className={styles.columns}>
				<EffectList effects={effects} />
				<AnimationSelector animations={animations} />
			</div>

			{/* <DragOverlay>
					{activeItem ? <EffectDragOverlay effectName={activeItem} /> : null}
				</DragOverlay>
			</DndContext> */}
		</div>
	);
};

export default AnimationCreator;
