import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

export const useStaticEffectsData = () =>
	useSelector((state: RootState) => state.staticEffects.data);

export const useStaticEffectsState = () =>
	useSelector((state: RootState) => state.staticEffects.state);
