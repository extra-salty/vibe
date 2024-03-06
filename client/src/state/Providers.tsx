'use client';
import { Provider as StateProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/state/store';
import { SessionProvider } from 'next-auth/react';
import AppThemeProvider from '@/components/Header/Themes/AppThemeProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Session } from 'next-auth';

const Providers = ({
	children,
	session,
}: {
	children: React.ReactNode;
	session: Session | null;
}) => {
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
				<SessionProvider session={session}>
					<AppThemeProvider>
						<StyledEngineProvider injectFirst>
							<AppRouterCacheProvider>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									{children}
								</LocalizationProvider>
							</AppRouterCacheProvider>
						</StyledEngineProvider>
					</AppThemeProvider>
				</SessionProvider>
			</PersistGate>
		</StateProvider>
	);
};

export default Providers;
