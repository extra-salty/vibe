import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import EffectListItem from '../EffectListItem/EffectListItem';
import styles from './EffectList.module.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	rectIntersection,
} from '@dnd-kit/core';
import EffectDragOverlay from '../EffectDragOverlay/EffectDragOverlay';

const EffectList = ({ effects }: { effects: BaseEffectT[] }) => {
	const dispatch = useDispatch();
	const [activeEffect, setActiveEffect] = useState<string | null>(null);

	const handleDragStart = ({ active }: DragStartEvent) => setActiveEffect(String(active.id));

	const handleDragCancel = () => setActiveEffect(null);

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		console.log(over);
		console.log(active);
		if (!over) {
			setActiveEffect(null);
			return;
		}

		setActiveEffect(null);
	};

	return (
		<ul className={styles.list}>
			<DndContext
				onDragStart={handleDragStart}
				onDragCancel={handleDragCancel}
				onDragEnd={handleDragEnd}
				collisionDetection={rectIntersection}
			>
				{effects.map((effect) => (
					<EffectListItem key={effect.name} effect={effect} />
				))}
				<DragOverlay>
					{activeEffect ? <EffectDragOverlay effectName={activeEffect} /> : null}
				</DragOverlay>
			</DndContext>
		</ul>
	);
};

export default EffectList;
