'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { AnimationT } from '@/state/features/animation/animation.types';
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	rectIntersection,
} from '@dnd-kit/core';
import EffectDragOverlay from '../../EffectComps/EffectDragOverlay/EffectDragOverlay';
import EffectList from '../../EffectComps/EffectList/EffectList';
import AnimationSelector from '../AnimationSelector/AnimationSelector';
import styles from './AnimationCreator.module.scss';

const AnimationCreator = ({
	effects,
	animations,
}: {
	effects: BaseEffectT[];
	animations: AnimationT[];
}) => {
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
		<div className={styles.effectList}>
			<DndContext
				onDragStart={handleDragStart}
				onDragCancel={handleDragCancel}
				onDragEnd={handleDragEnd}
				collisionDetection={rectIntersection}
			>
				<div className={styles.columns}>
					<AnimationSelector animations={animations} />
					<EffectList effects={effects} />
				</div>

				<DragOverlay>
					{activeEffect ? <EffectDragOverlay effectName={activeEffect} /> : null}
				</DragOverlay>
			</DndContext>
		</div>
	);
};

export default AnimationCreator;
