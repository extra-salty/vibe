'use client';
import Container from '@/ui/components/Container/Container';
import Sliders from '@/ui/components/Sliders/Sliders';
import { useState } from 'react';

export default function Home() {
	// { [key: string]: boolean }
	const [isOpen, setIsOpen] = useState<any>({ hsl: true, effects: true });

	const l = {
		hsl: 'Hue, Saturation, Lightness',
		eff: 'Effects',
	};

	return (
		<div>
			<Container
				label={l.hsl}
				isOpen={isOpen.hsl}
			>
				<Sliders />
			</Container>
			<Container
				label={l.eff}
				isOpen
				hidden
			/>
		</div>
	);
}
