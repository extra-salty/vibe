import { useCallback } from 'react';
import { Icons } from '@/components/base/Icon/Icon.type';
import Icon from '../Icon/Icon';
import ContainerType from './Container.type';
import './Container.scss';

const Container = ({ label, isOpen = true, children, hidden }: ContainerType) => {
	const handleLabelClick = useCallback(() => {}, []);

	if (hidden) return;
	return (
		<div className='container element'>
			<div className='header'>
				<div className='label' onClick={handleLabelClick}>
					{label}
				</div>
				<Icon name={Icons.expandMore} />
			</div>
			<div className='content'>{children}</div>
		</div>
	);
};

export default Container;
