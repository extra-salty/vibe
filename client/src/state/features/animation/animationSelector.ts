import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

// Animation Table
export const useAnimationTable = () =>
	useSelector((state: RootState) => state.animationCreator.animationTable);

export const useAnimationTableSelection = () =>
	useSelector((state: RootState) => state.animationCreator.animationTable.selection);

// Effect Table
export const useStaticEffectTable = () =>
	useSelector((state: RootState) => state.animationCreator.staticEffectTable);

export const useStaticEffectTableSelection = () =>
	useSelector((state: RootState) => state.animationCreator.staticEffectTable.selection);

// Animation List
export const useAnimations = () =>
	useSelector((state: RootState) => state.animationCreator.animationPlaylist);
