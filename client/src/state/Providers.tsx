'use client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as StateProvider } from 'react-redux';
import { persistor, store } from '@/state/store';
import { ThemeProvider } from '@mui/material';
import theme from '@/styles/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<StateProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider theme={theme}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
				</ThemeProvider>
			</PersistGate>
		</StateProvider>
	);
};

export default Providers;
