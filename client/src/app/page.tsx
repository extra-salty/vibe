'use client';
import { useCallback, useMemo, useState } from 'react';
import Container from '@/components/base/Container/Container';
import ContainerType from '@/components/base/Container/Container.type';
import Effect from '@/components/derived/Effect/Effect';
import Attribute from '@/components/derived/Attribute/Attribute';
import './page.scss';

enum Modules {
	attributes = 'atrributes',
	effect = 'effect',
	animation = 'animation',
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
				children: <Attribute />,
				isOpen: true,
			},
			{
				key: Modules.effect,
				label: l.eff,
				children: <Effect />,
				isOpen: true,
			},
			{
				key: Modules.animation,
				label: l.eff,
				children: <></>,
				isOpen: true,
			},
		];
	}, [l.eff, l.hsl]);

	const renderModule = useCallback(({ key, label, children }: ContainerType) => {
		return (
			<Container key={key} label={label}>
				{children}
			</Container>
		);
	}, []);

	return <div className='modules'>{modules.map(renderModule)}</div>;
}
