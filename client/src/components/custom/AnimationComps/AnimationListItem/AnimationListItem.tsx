import { AnimationT } from '@/state/features/animation/animation.types';
import { useDraggable } from '@dnd-kit/core';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import styles from './AnimationListItem.module.scss';

type AnimationListItemProps = {
	animation: AnimationT;
};

const AnimationListItem = ({ animation }: AnimationListItemProps) => {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: animation.id,
	});

	return (
		<li ref={setNodeRef} className={styles.item}>
			<div className={styles.content}>
				<div>{animation.name}</div>
			</div>
			<button {...attributes} {...listeners}>
				<UIIcon name={Icons.drag} width={20} height={20} />
			</button>
		</li>
	);
};

export default AnimationListItem;
