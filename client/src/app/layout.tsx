import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import ThemeProvider from '@/state/Providers/ThemeProvider/ThemeProvider';
import './_global.scss';

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
			<body className={roboto.className}>
				<ThemeProvider themeMode='dark'>{children}</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
