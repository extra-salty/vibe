import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		mode: 'dark',
		// primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0', contrastText: '#fff' },
		// secondary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0', contrastText: '#fff' },
	},
	spacing: 4,
	components: {
		// MuiButton: {
		// 	styleOverrides: {
		// 		// Name of the slot
		// 		root: {
		// 			// Some CSS
		// 			fontSize: '1rem',
		// 		},
		// 	},
		// },
	},
});

export default theme;
