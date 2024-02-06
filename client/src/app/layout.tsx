import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Header from '@/components/custom/PageComps/Header/Header';
import './_layout.scss';
import Providers from '@/state/Providers';

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
					<Providers>{children}</Providers>
				</main>
			</body>
		</html>
	);
}
