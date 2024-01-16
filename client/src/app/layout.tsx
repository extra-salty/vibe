import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/custom/PageComps/Header/Header';

import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Vibe',
	description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				{/* <Header /> */}
				<main className='p-4 bg-[#50505066] rounded-2xl'>{children}</main>
			</body>
		</html>
	);
}
