'use client';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/state/store';
import { Provider as StateProvider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import AppThemeProvider from '@/components/custom/PageComps/Header/Themes/AppThemeProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
	// export const useAppStore: () => AppStore = useStore
	// const storeRef = useRef<AppStore>()
	// if (!storeRef.current) {
	//   // Create the store instance the first time this renders
	//   storeRef.current = makeStore()
	// storeRef.current.dispatch(initializeCount(count))
	// }

	return (
		<StateProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AppThemeProvider>
					<StyledEngineProvider injectFirst>
						<AppRouterCacheProvider>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								{children}
							</LocalizationProvider>
						</AppRouterCacheProvider>
					</StyledEngineProvider>
				</AppThemeProvider>
			</PersistGate>
		</StateProvider>
	);
};

export default Providers;
