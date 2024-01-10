import { useSelectedAnimationsDetails } from '@/state/features/animation/animationSelector';
import AnimationDetailListItem from '../AnimationDetailListItem/AnimationDetailListItem';

const AnimationDetailList = () => {
	const selectedAnimationsDetails = useSelectedAnimationsDetails();

	return (
		<div className='min-w-48'>
			<ul className='h-full flex list-none m-0 p-0 '>
				{selectedAnimationsDetails.map((animationDetails, i) => (
					<AnimationDetailListItem
						key={animationDetails.name}
						animationIndex={i}
						animationDetails={animationDetails}
					/>
				))}
			</ul>
		</div>
	);
};

export default AnimationDetailList;
