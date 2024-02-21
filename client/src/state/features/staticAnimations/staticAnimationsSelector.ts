import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

export const useStaticAnimationsData = () =>
	useSelector((state: RootState) => state.staticAnimations.data);

export const useStaticAnimationsState = () =>
	useSelector((state: RootState) => state.staticAnimations.state);
