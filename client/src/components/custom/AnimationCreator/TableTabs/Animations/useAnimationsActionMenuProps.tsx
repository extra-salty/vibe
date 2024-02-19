import { useDispatch } from 'react-redux';
import { useAnimations } from '@/state/features/animations/animationSelector';
import { animationsActions } from '@/state/features/animations/animationSlice';
import { AnimationBaseT } from '@/types/animation.types';
import { MRT_TableOptions } from 'material-react-table';

const useAnimationsActionMenuProps = (): Partial<MRT_TableOptions<AnimationBaseT>> => {
	const dispatch = useDispatch();
	const animations = useAnimations();

	const stateProps: Partial<MRT_TableOptions<AnimationBaseT>>[] = [{}];

	return stateProps.reduce((stateProps, props) => ({ ...stateProps, ...props }), {});
};

export default useAnimationsActionMenuProps;
