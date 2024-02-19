import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

export const useStaticEffects = () =>
	useSelector((state: RootState) => state.staticEffects);
