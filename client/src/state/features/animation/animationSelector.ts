import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const useStaticEffectTable = () =>
	useSelector((state: RootState) => state.animationCreator.staticEffects);

export const useSelectedAnimations = () =>
	useSelector((state: RootState) => state.animationCreator.selectedAnimations);

export const useAnimations = () =>
	useSelector((state: RootState) => state.animationCreator.animations);
