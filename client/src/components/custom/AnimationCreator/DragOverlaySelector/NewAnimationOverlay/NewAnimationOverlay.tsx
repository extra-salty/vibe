import { AnimationBaseT } from '@/types/animation.types';
import AnimationLabel from '../../AnimationList/AnimationListItem/AnimationLabel/AnimationLabel';

const NewAnimationOverlay = ({ animation }: { animation: AnimationBaseT }) => {
	return <AnimationLabel animation={animation} />;
};

export default NewAnimationOverlay;
