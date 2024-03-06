import { useThemeMode } from '@/state/features/app/appSelector';
import { ThemeProvider, createTheme } from '@mui/material';

const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const themeMode = useThemeMode();

	const theme = createTheme({
		palette: {
			mode: themeMode,
		},
		// transitions: {
		// 	create: () => 'none',
		// },
		spacing: 4,
		typography: {
			button: {
				textTransform: 'none',
			},
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						padding: '6px 8px',
					},
					startIcon: {
						marginInline: '4px',
					},
				},
			},
		},
	});

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
