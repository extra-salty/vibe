import { AnimationT } from '@/state/features/animation/animation.types';
import AnimationListItem from '../AnimationListItem/AnimationListItem';
import styles from './AnimationList.module.scss';

const AnimationList = ({ animations }: { animations: AnimationT[] }) => {
	return (
		<ul className={styles.list}>
			{animations.map((animation) => (
				<AnimationListItem key={animation.name} animation={animation} />
			))}
		</ul>
	);
};

export default AnimationList;
