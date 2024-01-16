import React from 'react';
import UIButtonProps from '../../UIButton/UIButton.type';
import UIButton from '../../UIButton/UIButton';

function UITableActions({ actions }: { actions: UIButtonProps[] }) {
	return (
		<div className='flex'>
			{actions.map((props, i) => (
				<UIButton key={i} {...props} />
			))}
		</div>
	);
}

export default UITableActions;
