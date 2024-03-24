import { ThemeModeT } from '@/state/features/app/appSlice.types';
import { createTheme } from '@mui/material';

const useTheme = (themeMode: ThemeModeT) => {
	return createTheme({
		palette: {
			mode: themeMode,
			// background: {default: '',}
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
			// MuiLink: {
			// 	defaultProps: {
			// 		component: Link,
			// 	},
			// },
			// MuiButtonBase: {
			// 	defaultProps: {
			// 		LinkComponent: Link,
			// 	},
			// },
		},
	});
};

export default useTheme;
