import { useThemeMode } from '@/state/features/app/appSelector';
import ThemeProvider from './ThemeProvider';

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
	const themeMode = useThemeMode();

	return <ThemeProvider themeMode={themeMode}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
