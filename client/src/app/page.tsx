'use client';
import { useCallback, useMemo, useState } from 'react';
import Container from '@/components/base/Container/Container';
import ContainerType from '@/components/base/Container/Container.type';
import Sliders from '@/components/derived/Sliders/Sliders';
import LEDMatrix from '@/components/derived/LEDMatrix/LEDMatrix';

enum Modules {
	attributes = 'atrributes',
	effects = 'effects',
	ledMatrix = 'ledMatrix',
}

export default function Home() {
	// { [key: string]: boolean }
	const [isOpen, setIsOpen] = useState<any>({ hsl: true, effects: true });

	const l = {
		hsl: 'Hue, Saturation, Lightness',
		eff: 'Effects',
	};

	const modules = useMemo((): ContainerType[] => {
		return [
			{
				key: Modules.attributes,
				label: l.hsl,
				children: <Sliders />,
				isOpen: true,
			},
			{
				key: Modules.effects,
				label: l.eff,
				children: <></>,
				isOpen: true,
			},
			{
				key: Modules.ledMatrix,
				children: <LEDMatrix />,
				isOpen: true,
			},
		];
	}, [l.eff, l.hsl]);

	const renderModule = useCallback(({ key, label, children }: ContainerType) => {
		return (
			<Container
				key={key}
				label={label}
			>
				{children}
			</Container>
		);
	}, []);

	return <div className='modules'>{modules.map(renderModule)}</div>;
}
