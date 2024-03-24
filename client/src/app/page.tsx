'use client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UserProvider from '@/state/Providers/UserProvider/UserProvider';
import StateProvider from '@/state/Providers/StateProvider/StateProvider';
import ThemeProviderWrapper from '@/state/Providers/ThemeProvider/ThemeProviderWrapper';
import Animations from '@/components/Animations/Animations';
import Header from '@/components/Header/Header';
import { Paper } from '@mui/material';

const Home = () => {
	return (
		<UserProvider>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<StateProvider>
					<ThemeProviderWrapper>
						<Header />
						<main>
							<Paper sx={{ height: '100%', width: '100%' }}>
								<Animations staticAnimations={[]} animations={[]} />
							</Paper>
						</main>
					</ThemeProviderWrapper>
				</StateProvider>
			</LocalizationProvider>
		</UserProvider>
	);
};

export default Home;
