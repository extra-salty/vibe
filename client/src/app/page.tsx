'use client';
import { useCallback, useMemo } from 'react';
import Container from '@/components/base/Container/Container';
import ContainerType from '@/components/base/Container/Container.type';
import Effect from '@/components/derived/Effect/Effect';
import Attribute from '@/components/derived/Attribute/Attribute';
import './page.scss';

enum Modules {
	attributes = 'Attributes',
	effect = 'Effect',
	animation = 'Animation',
}

export default function Home() {
	const modules = useMemo((): ContainerType[] => {
		return [
			{
				label: Modules.attributes,
				children: <Attribute />,
			},
			{
				label: Modules.effect,
				children: <Effect />,
			},
			{
				label: Modules.animation,
				children: <></>,
			},
		];
	}, []);

	const renderModule = useCallback(({ label, children }: ContainerType) => {
		return (
			<Container key={label} label={label}>
				{children}
			</Container>
		);
	}, []);

	return (
		<>
			<div className='modules'>{modules.map(renderModule)}</div>
		</>
	);
}
