import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Header from '@/components/custom/PageComps/Header/Header';
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
				<Header />
				<main>
					<AppRouterCacheProvider>{children}</AppRouterCacheProvider>
					{/* options={{ enableCssLayer: true } */}
				</main>
			</body>
		</html>
	);
}
