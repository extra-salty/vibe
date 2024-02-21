import { AnimationT } from '@/types/animation.types';
import AnimationLabel from '../../AnimationList/AnimationListItem/AnimationLabel/AnimationLabel';

const NewAnimationOverlay = ({ animation }: { animation: AnimationT }) => {
	return <AnimationLabel animation={animation} />;
};

export default NewAnimationOverlay;
