'use client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UserProvider from './UserProvider/UserProvider';
import StateProvider from './StateProvider/StateProvider';
import ThemeProviderWrapper from './ThemeProvider/ThemeProviderWrapper';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<UserProvider>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<StateProvider>
					<ThemeProviderWrapper>{children}</ThemeProviderWrapper>
				</StateProvider>
			</LocalizationProvider>
		</UserProvider>
	);
};

export default Providers;
