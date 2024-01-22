import { useAnimations } from '@/state/features/animation/animationSelector';
import { useDroppable } from '@dnd-kit/core';
import { CSSProperties, memo } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { DndElements } from '@/types/misc.types';
import AnimationListItem from './AnimationListItem/AnimationListItem';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import styles from './AnimationList.module.scss';

const AnimationList = () => {
	const animations = useAnimations();
	const items = animations.map((animation, i) => `${animation.name}/${i}`);

	const { setNodeRef, isOver, active } = useDroppable({
		id: DndElements.animationList,
		data: { type: DndElements.animationList },
	});

	const style: CSSProperties = {
		backgroundColor:
			isOver && active?.data.current?.type === DndElements.newAnimation ? 'gray' : undefined,
	};

	return (
		<div className={styles.creator}>
			<div ref={setNodeRef} style={style} className={styles.wrapper}>
				{animations.length ? (
					<ul style={style} className={styles.list}>
						<SortableContext items={items} strategy={verticalListSortingStrategy}>
							{animations.map((animation, i) => (
								<AnimationListItem key={animation.name} index={i} animation={animation} />
							))}
						</SortableContext>
					</ul>
				) : (
					<div style={style} className={styles.dropZone}>
						<UIIcon name={Icons.drag} />
						<div>Drag and drop an animation from the table</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default memo(AnimationList);
