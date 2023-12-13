'use client';
import UIContainer from '@/components/derived/UIContainer/UIContainer';
import UIContainerType from '@/components/derived/UIContainer/UIContainer.type';
import EffectCreator from '@/components/custom/EffectCreator/EffectCreator';
import Attribute from '@/components/custom/Attribute/Attribute';
import Animations from '@/components/custom/Animations/Animations';
import FrameList from '@/components/custom/FrameList/FrameList';
import './page.scss';

enum Modules {
	attributes = 'Attributes',
	effect = 'Effect',
	animation = 'Animation',
}

export default function Home() {
	const moduleFirstColumn: UIContainerType[] = [
		{
			label: Modules.attributes,
			children: <Attribute />,
			// hidden: true,
		},
		{
			label: Modules.effect,
			children: <EffectCreator />,
			// hidden: true,
		},
		{
			label: Modules.animation,
			children: <Animations />,
			hidden: true,
		},
	];

	const moduleSecondColumn: UIContainerType[] = [
		{
			label: 'Preview',
			children: <FrameList />,
			// hidden: true,
		},
	];

	return (
		<div className='effect'>
			<div className='column'>
				{moduleFirstColumn.map((props, i) => {
					return <UIContainer key={`${i}`} {...props} />;
				})}
			</div>
			<div className='column'>
				{moduleSecondColumn.map((props, i) => {
					return <UIContainer key={`${i}`} {...props} />;
				})}
			</div>
		</div>
	);
}
