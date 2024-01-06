import { AnimationT } from '@/state/features/animation/animation.types';
import AnimationListItem from '../AnimationListItem/AnimationListItem';
import styles from './AnimationList.module.scss';

type AnimationListProps = {
	animations: AnimationT[];
};

const AnimationList = ({ animations }: AnimationListProps) => {
	return (
		<ul className={styles.list}>
			{animations.map((animation) => (
				<AnimationListItem key={animation.id} animation={animation} />
			))}
		</ul>
	);
};

export default AnimationList;
