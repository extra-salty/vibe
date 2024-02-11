import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		mode: 'dark',
		text: { primary: 'rgba(255,255,255, 0.85)' },
		// primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0', contrastText: '#fff' },
		// secondary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0', contrastText: '#fff' },
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
