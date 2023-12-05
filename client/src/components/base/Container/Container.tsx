import { useCallback, useState } from 'react';
import { Icons } from '@/components/base/Icon/Icon.type';
import Icon from '../Icon/Icon';
import ContainerType from './Container.type';
import appendClasses from '@/helpers/appendClass/appendClass';
import './Container.scss';

const Container = ({ label, children, hidden }: ContainerType) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(true);

	const handleExpandClick = useCallback(() => {
		setIsExpanded((s) => !s);
	}, []);

	if (hidden) return;
	return (
		<div className='container element' aria-expanded={isExpanded ? 'true' : 'false'}>
			<div className='header'>
				<div className='label'>{label}</div>
				<Icon
					name={Icons.expandMore}
					width={12}
					height={12}
					onClick={handleExpandClick}
					classes={['icon', isExpanded && 'rotated']}
				/>
			</div>
			<div className={appendClasses(['content-wrapper', isExpanded && 'expanded'])}>
				<div className='content'>{children}</div>
			</div>
		</div>
	);
};

export default Container;
