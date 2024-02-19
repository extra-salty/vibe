import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const usePlaylist = () =>
	useSelector((state: RootState) => state.animationCreator.playlist);
