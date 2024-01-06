import { DndContext } from '@dnd-kit/core';
import { AnimationT } from '@/state/features/animation/animation.types';
import AnimationList from '../AnimationList/AnimationList';
import AnimationDropZone from '../AnimationDropZone/AnimationDropZone';
import styles from './AnimationSelector.module.scss';

type AnimationListProps = {
	animations: AnimationT[];
};

const AnimationSelector = ({ animations }: AnimationListProps) => {
	return (
		<div>
			<DndContext>
				<AnimationDropZone />
				<AnimationList animations={animations} />
			</DndContext>
		</div>
	);
};

export default AnimationSelector;
