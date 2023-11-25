import React, { useCallback } from 'react';
import { ComponentType } from '../Types';
import Icon, { Icons } from '../Icon/Icon';
import './Container.scss';

type ContainerType = ComponentType & {
	label?: string;
	isOpen?: boolean;
	children?: React.ReactNode;
};

const Container = ({ label, isOpen = true, children, hidden }: ContainerType) => {
	const handleLabelClick = useCallback(() => {}, []);

	// const classes = 'container element';

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
