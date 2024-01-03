'use client';
import { Modules } from '@/misc/labels/labels';
import UIContainer from '@/components/derived/UIContainer/UIContainer';
import UIContainerProps from '@/components/derived/UIContainer/UIContainer.type';
import EffectCreator from '@/components/custom/EffectCreator/EffectCreator';
import Attribute from '@/components/custom/Attribute/Attribute';
import FrameGrid from '@/components/custom/FrameComps/FrameGrid/FrameGrid';
import './_page.scss';

const Effect = () => {
	const modules: UIContainerProps[][] = [
		[
			{
				label: Modules.attributes,
				children: <Attribute />,
			},
			{
				label: Modules.effect,
				children: <EffectCreator />,
			},
		],
		[
			{
				label: 'Frame List',
				children: <FrameGrid />,
			},
		],
	];

	return (
		<div className='parent'>
			{modules.map((column, i) => {
				return (
					<div key={i} className='column'>
						{column.map((props, j) => (
							<UIContainer key={j} {...props} />
						))}
					</div>
				);
			})}
		</div>
	);
};

export default Effect;
