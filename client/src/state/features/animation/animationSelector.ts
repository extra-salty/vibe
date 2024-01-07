import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const useSelectedAnimations = () =>
	useSelector((state: RootState) => state.animationCreator.selectedAnimations);
