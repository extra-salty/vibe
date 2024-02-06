'use client';
import { PersistGate } from 'redux-persist/integration/react';
// import { persistor, store } from '@/state/store';
import { Provider as StateProvider } from 'react-redux';
import { store } from './store';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import theme from '@/styles/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<StateProvider store={store}>
			{/* <PersistGate loading={null} persistor={persistor}> */}
			<ThemeProvider theme={theme}>
				<StyledEngineProvider injectFirst>
					<AppRouterCacheProvider>
						<LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
					</AppRouterCacheProvider>
				</StyledEngineProvider>
			</ThemeProvider>
			{/* </PersistGate> */}
		</StateProvider>
	);
};

export default Providers;
