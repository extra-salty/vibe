import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const useSelectedColor = () =>
	useSelector((state: RootState) => state.color.selectedColor);
