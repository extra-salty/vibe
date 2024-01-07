import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { useDraggable } from '@dnd-kit/core';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import styles from './EffectListItem.module.scss';

const EffectListItem = ({ effect }: { effect: BaseEffectT }) => {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: effect.name,
	});

	return (
		<li ref={setNodeRef} className={styles.effectListItem}>
			<div className={styles.content}>
				<div>{effect.name}</div>
			</div>
			<button {...attributes} {...listeners}>
				<UIIcon name={Icons.drag} width={20} height={20} />
			</button>
		</li>
	);
};

export default EffectListItem;
