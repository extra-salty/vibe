import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const usePlaylistData = () =>
	useSelector((state: RootState) => state.playlist.children);

export const usePlaylistState = () =>
	useSelector((state: RootState) => state.playlist.state);

export const usePlaylistRowSelection = () =>
	useSelector((state: RootState) => state.playlist.state.rowSelection);
