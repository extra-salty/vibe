'use client';
import { Provider as StateProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/state/store';
import AppThemeProvider from '@/components/Header/Themes/AppThemeProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UserProvider from './UserProvider/UserProvider';
import { getApp } from 'realm-web';

const Providers = ({ children }: { children: React.ReactNode }) => {
	// export const useAppStore: () => AppStore = useStore
	// const storeRef = useRef<AppStore>()
	// if (!storeRef.current) {
	//   // Create the store instance the first time this renders
	//   storeRef.current = makeStore()
	// storeRef.current.dispatch(initializeCount(count))
	// }
	const app = getApp(process.env.NEXT_PUBLIC_APP_ID);

	return (
		<UserProvider app={app}>
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
		</UserProvider>
	);
};

export default Providers;
