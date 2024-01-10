import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const useSelectedEffects = () =>
	useSelector((state: RootState) => state.animationCreator.selectedEffects);

export const useSelectedAnimations = () =>
	useSelector((state: RootState) => state.animationCreator.selectedAnimations);
