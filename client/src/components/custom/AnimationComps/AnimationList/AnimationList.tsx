import { AnimationT } from '@/state/features/animation/animation.types';
import AnimationListItem from '../AnimationListItem/AnimationListItem';

const AnimationList = ({ animations }: { animations: AnimationT[] }) => {
	return (
		<ul className={'m-0 p-0 list-none'}>
			{animations.map((animation) => (
				<AnimationListItem key={animation.name} animation={animation} />
			))}
		</ul>
	);
};

export default AnimationList;
