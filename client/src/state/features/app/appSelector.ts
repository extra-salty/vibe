import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const useSelectedStaticEffectIds = () =>
	useSelector((state: RootState) => state.app.selectedStaticEffects);

export const useIsModalOpen = () => useSelector((state: RootState) => state.app.isModalOpen);
