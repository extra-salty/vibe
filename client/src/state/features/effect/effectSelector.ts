import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

// Color
export const useColor = () => useSelector((state: RootState) => state.effectCreator.color);

// Frame
export const useFrames = () => useSelector((state: RootState) => state.effectCreator.effect.frames);

export const useFramesLength = () =>
	useSelector((state: RootState) => state.effectCreator.effect.frames.length);

export const useFrame = (index: number) =>
	useSelector((state: RootState) => state.effectCreator.effect.frames[index]);

export const useFrameDuration = (index: number) =>
	useSelector((state: RootState) => state.effectCreator.effect.frames[index].duration);

export const useActiveFrame = () =>
	useSelector((state: RootState) => state.effectCreator.effect.activeFrame);
