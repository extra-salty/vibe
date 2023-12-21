'use client';
import { Modules } from '@/misc/labels/labels';
import UIContainer from '@/components/derived/UIContainer/UIContainer';
import UIContainerType from '@/components/derived/UIContainer/UIContainer.type';
import EffectCreator from '@/components/custom/EffectCreator/EffectCreator';
import Attribute from '@/components/custom/Attribute/Attribute';
import FrameList from '@/components/custom/FrameComps/FrameList/FrameList';
import './_page.scss';

const Effect = () => {
	const moduleFirstColumn: UIContainerType[] = [
		{
			label: Modules.attributes,
			children: <Attribute />,
		},
		{
			label: Modules.effect,
			children: <EffectCreator />,
			// hidden: true,
		},
	];

	const moduleSecondColumn: UIContainerType[] = [
		{
			label: 'Frame List',
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
};

export default Effect;
