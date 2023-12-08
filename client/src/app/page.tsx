'use client';
import { useCallback, useMemo } from 'react';
import UIContainer from '@/components/derived/UIContainer/UIContainer';
import UIContainerType from '@/components/derived/UIContainer/UIContainer.type';
import Effect from '@/components/custom/Effect/Effect';
import Attribute from '@/components/custom/Attribute/Attribute';
import Animations from '@/components/custom/Animations/Animations';
import './page.scss';

enum Modules {
	attributes = 'Attributes',
	effect = 'Effect',
	animation = 'Animation',
}

export default function Home() {
	const modules = useMemo((): UIContainerType[] => {
		return [
			{
				label: Modules.attributes,
				children: <Attribute />,
			},
			{
				label: Modules.effect,
				children: <Effect />,
				hidden: true,
			},
			{
				label: Modules.animation,
				children: <Animations />,
			},
		];
	}, []);

	const renderModule = useCallback((props: UIContainerType, i: number) => {
		return (
			<UIContainer key={`${i}`} {...props}>
				{props.children}
			</UIContainer>
		);
	}, []);

	return (
		<>
			<div className='modules'>{modules.map(renderModule)}</div>
		</>
	);
}
