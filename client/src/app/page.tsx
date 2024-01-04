'use client';
import UIContainer from '@/components/derived/UIContainer/UIContainer';
import UIContainerProps from '@/components/derived/UIContainer/UIContainer.type';
import Attribute from '@/components/custom/Attribute/Attribute';
import EffectTable from '@/components/custom/EffectTable/EffectTable';
import './_page.scss';

enum Modules {
	attributes = 'Attributes',
	effect = 'Effect',
	animation = 'Animation',
}

const Home = () => {
	const modules: UIContainerProps[] = [
		{
			label: Modules.attributes,
			children: <Attribute />,
		},
		{
			label: Modules.animation,
			children: <EffectTable />,
		},
	];

	return (
		<div className='column'>
			{modules.map((props, i) => {
				return <UIContainer key={`${i}`} {...props} />;
			})}
		</div>
	);
};

export default Home;
