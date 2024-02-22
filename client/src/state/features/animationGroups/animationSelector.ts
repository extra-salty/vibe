import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const useAnimations = () => useSelector((state: RootState) => state.animations);

export const useAnimationsState = () =>
	useSelector((state: RootState) => state.animations.state);
