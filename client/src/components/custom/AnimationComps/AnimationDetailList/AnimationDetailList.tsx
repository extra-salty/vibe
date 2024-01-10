import { useSelectedAnimations } from '@/state/features/animation/animationSelector';
import AnimationDetailListItem from '../AnimationDetailListItem/AnimationDetailListItem';

const AnimationDetailList = () => {
	const selectedAnimations = useSelectedAnimations();

	return (
		<div className='min-w-48'>
			<ul className='w-full flex list-none m-0 p-0'>
				{selectedAnimations.map((animation, i) => (
					<AnimationDetailListItem key={animation.name} animationIndex={i} animation={animation} />
				))}
			</ul>
		</div>
	);
};

export default AnimationDetailList;
