import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const useSelectedEffects = () =>
	useSelector((state: RootState) => state.animationCreator.selectedEffects);

export const useSelectedAnimations = () =>
	useSelector((state: RootState) => state.animationCreator.selectedAnimations);

export const useAnimations = () =>
	useSelector((state: RootState) => state.animationCreator.animations);

// export const useAnimation = (index: number) =>
// 	useSelector((state: RootState) => state.animationCreator.animations[index]);
