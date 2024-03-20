'use client';
import { ThemeModeT } from '@/state/features/app/appSlice.types';
import { StyledEngineProvider, ThemeProvider as MUIThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import useTheme from './useTheme';

const ThemeProvider = ({
	themeMode,
	children,
}: {
	themeMode: ThemeModeT;
	children: React.ReactNode;
}) => {
	const theme = useTheme(themeMode);

	return (
		<MUIThemeProvider theme={theme}>
			{/* <CssBaseline /> */}
			<StyledEngineProvider injectFirst>
				<AppRouterCacheProvider>{children}</AppRouterCacheProvider>
			</StyledEngineProvider>
		</MUIThemeProvider>
	);
};

export default ThemeProvider;
