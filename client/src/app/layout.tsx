import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Paper } from '@mui/material';
import Script from 'next/script';
import Header from '@/components/Header/Header';
import Providers from '@/state/Providers/Providers';
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
	return (
		<html lang='en'>
			<head>
				<Script
					src='https://accounts.google.com/gsi/client'
					async
					defer
					strategy='beforeInteractive'
				/>
			</head>
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
};

export default RootLayout;
