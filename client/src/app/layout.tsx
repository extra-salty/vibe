import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import UILink from '@/components/base/UILink/UILink';
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
				<main>
					<header>
						<div>
							<UILink href='/'>Animations</UILink>
							<UILink href='/'>Effect</UILink>
						</div>
						<Image src={'/vibe.svg'} alt='vibe-logo' width={200} height={80} />
					</header>
					{children}
				</main>
			</body>
		</html>
	);
}
