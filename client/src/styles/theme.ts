import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		mode: 'dark',
		text: { primary: 'rgba(255,255,255, 0.85)' },
	},
	spacing: 4,
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

export default theme;
