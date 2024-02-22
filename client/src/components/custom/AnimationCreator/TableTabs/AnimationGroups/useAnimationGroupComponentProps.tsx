import { useDispatch } from 'react-redux';
import { useAnimations } from '@/state/features/animationGroups/animationSelector';
import { animationsActions } from '@/state/features/animationGroups/animationSlice';
import { AnimationT } from '@/types/animation.types';
import { MRT_TableOptions } from 'material-react-table';

const useAnimationGroupsComponentProps = (): Partial<MRT_TableOptions<AnimationT>> => {
	const dispatch = useDispatch();
	const animations = useAnimations();

	const stateProps: Partial<MRT_TableOptions<AnimationT>>[] = [{}];

	return stateProps.reduce((stateProps, props) => ({ ...stateProps, ...props }), {});
};

export default useAnimationGroupsComponentProps;
