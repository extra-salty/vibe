import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const useAnimationsData = () =>
	useSelector((state: RootState) => state.animations.data);

export const useAnimationsState = () =>
	useSelector((state: RootState) => state.animations.state);

export const useAnimationsRowSelection = () =>
	useSelector((state: RootState) => state.animations.state.rowSelection);
