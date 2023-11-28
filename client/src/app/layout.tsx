import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/derived/Header/Header';
import StateProvider from '@/state/StateProvider';
import './globals.scss';

const OpenSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Vibe',
	description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={OpenSans.className}>
				<Header />
				<main className='page-content'>
					<StateProvider>{children}</StateProvider>
				</main>
			</body>
		</html>
	);
}
