import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const usePlaylistData = () =>
	useSelector((state: RootState) => state.playlist.data);

export const usePlaylistState = () =>
	useSelector((state: RootState) => state.playlist.state);
