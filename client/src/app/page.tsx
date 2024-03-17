'use client';
import { Paper } from '@mui/material';
import Providers from '@/state/Providers/Providers';
import Animations from '@/components/Animations/Animations';
import Header from '@/components/Header/Header';

const Home = () => {
	return (
		<Providers>
			<Header />
			<main>
				<Paper sx={{ height: '100%' }}>
					<Animations staticAnimations={[]} animations={[]} />
				</Paper>
			</main>
		</Providers>
	);
};

export default Home;
