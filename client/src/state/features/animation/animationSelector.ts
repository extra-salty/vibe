import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

// Animation Table
export const useAnimationTable = () =>
	useSelector((state: RootState) => state.animationCreator.animationTable);

export const useAnimationTableSelection = () =>
	useSelector((state: RootState) => state.animationCreator.animationTable.selection);

// Static Effect Table
export const useStaticEffectTable = () =>
	useSelector((state: RootState) => state.animationCreator.staticEffectTable);

export const useStaticEffectTableSelection = () =>
	useSelector((state: RootState) => state.animationCreator.staticEffectTable.selection);

// Animation List
export const usePlaylist = () =>
	useSelector((state: RootState) => state.animationCreator.playlist);

export const useAnimation = (index: number) =>
	useSelector((state: RootState) => state.animationCreator.playlist.data[index]);
