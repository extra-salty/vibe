import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export const useThemeMode = () => useSelector((state: RootState) => state.app.themeMode);
