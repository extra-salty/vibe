import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Paper } from '@mui/material';
import Header from '@/components/custom/PageComps/Header/Header';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={roboto.className}>
				<Providers>
					<Header />
					<main>
						<Paper sx={{ height: '100%' }}>{children}</Paper>
					</main>
				</Providers>
			</body>
		</html>
	);
}
