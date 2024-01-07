import { AnimationT } from '@/state/features/animation/animation.types';
import { useDraggable } from '@dnd-kit/core';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { CSS } from '@dnd-kit/utilities';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import styles from './AnimationListItem.module.scss';

const AnimationListItem = ({ animation }: { animation: AnimationT }) => {
	const { attributes, listeners, transform, setNodeRef } = useDraggable({
		id: animation.name,
	});

	const style = {
		// transform: CSS.Translate.toString(transform),
	};

	return (
		<li ref={setNodeRef} className={styles.item} style={style}>
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
