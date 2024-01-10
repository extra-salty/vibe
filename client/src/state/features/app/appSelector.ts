import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const useIsModalOpen = () => useSelector((state: RootState) => state.app.isModalOpen);
