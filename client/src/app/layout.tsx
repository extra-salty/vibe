import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/custom/PageComps/Header/Header';
import StateProvider from '@/state/StateProvider';
import './_layout.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Vibe',
	description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Header />
				{/* <Connected /> */}
				<main className='page-content'>
					<StateProvider>{children}</StateProvider>
				</main>
			</body>
		</html>
	);
}
