'use client';
import UIContainer from '@/components/derived/UIContainer/UIContainer';
import UIContainerType from '@/components/derived/UIContainer/UIContainer.type';
import Attribute from '@/components/custom/Attribute/Attribute';
import EffectTable from '@/components/custom/EffectTable/EffectTable';
import './page.scss';

enum Modules {
	attributes = 'Attributes',
	effect = 'Effect',
	animation = 'Animation',
}

const Home = () => {
	const modules: UIContainerType[] = [
		{
			label: Modules.attributes,
			children: <Attribute />,
			// hidden: true,
		},
		{
			label: Modules.animation,
			children: <EffectTable />,
			// hidden: true,
		},
	];

	return (
		<div className='effect'>
			<div className='column'>
				{modules.map((props, i) => {
					return <UIContainer key={`${i}`} {...props} />;
				})}
			</div>
		</div>
	);
};

export default Home;
