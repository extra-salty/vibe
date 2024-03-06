import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Paper } from '@mui/material';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth/Auth';
import Header from '@/components/Header/Header';
import Providers from '@/state/Providers';
import './_layout.scss';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Vibe',
	description: '',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	// const session = await getServerSession(authOptions);

	return (
		<html lang='en'>
			<body className={roboto.className}>
				<Providers session={null}>
					<div>asd</div>
					{/* <Header />
					<main>
						<Paper sx={{ height: '100%' }}>{children}</Paper>
					</main> */}
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
