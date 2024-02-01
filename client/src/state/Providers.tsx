'use client';
import { Provider as StateProvider } from 'react-redux';
import { store } from '@/state/store';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import theme from '@/styles/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<StateProvider store={store}>
			{/* <StyledEngineProvider>
      </StyledEngineProvider> */}
			<ThemeProvider theme={theme}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
			</ThemeProvider>
		</StateProvider>
	);
};

export default Providers;
