'use client';
import UserProvider from '@/state/Providers/UserProvider/UserProvider';
import DataProvider from '@/state/Providers/DataProvider/DataProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import StateProvider from '@/state/Providers/StateProvider/StateProvider';
import ThemeProviderWrapper from '@/state/Providers/ThemeProvider/ThemeProviderWrapper';
import Header from '@/components/Header/Header';
import Animations from '@/components/Animations/Animations';
import { Paper } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './_page.scss';

const Home = () => {
	return (
		<UserProvider>
			<DataProvider>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<StateProvider>
						<ThemeProviderWrapper>
							<Header />
							<main>
								<Paper
									// elevation={0}
									sx={{ height: '100%', width: '100%', borderRadius: '0' }}
								>
									<Animations staticAnimations={[]} animations={[]} />
								</Paper>
							</main>
						</ThemeProviderWrapper>
					</StateProvider>
				</LocalizationProvider>
			</DataProvider>
		</UserProvider>
	);
};

export default Home;
