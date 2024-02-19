import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const useAnimations = () => useSelector((state: RootState) => state.animations);
