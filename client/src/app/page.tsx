'use client';
import UIContainer from '@/components/derived/UIContainer/UIContainer';
import UIContainerType from '@/components/derived/UIContainer/UIContainer.type';
import Attribute from '@/components/custom/Attribute/Attribute';
import EffectTable from '@/components/custom/EffectTable/EffectTable';
import './_page.scss';
import { useIsModalOpen } from '@/state/features/app/appSelector';
import { createPortal } from 'react-dom';
import Modal from '@/components/derived/UIModal/UIModal';

enum Modules {
	attributes = 'Attributes',
	effect = 'Effect',
	animation = 'Animation',
}

const Home = () => {
	const isModalOpen = useIsModalOpen();
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
		<>
			<div className='column'>
				{modules.map((props, i) => {
					return <UIContainer key={`${i}`} {...props} />;
				})}
			</div>
			{/* {isModalOpen &&
				createPortal(
					<Modal {...modalActions[0]} onModalClose={() => setIsModalOpen(false)} />,
					document.body,
				)} */}
		</>
	);
};

export default Home;
