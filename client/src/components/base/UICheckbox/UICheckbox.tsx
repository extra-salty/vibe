import React from 'react';
import UICheckboxType from './UICheckbox.type';
import appendClasses from '@/helpers/appendClasses/appendClasses';
import './UICheckbox.scss';

const UICheckbox = ({ value, label, hidden, classes }: UICheckboxType) => {
	const classNames = appendClasses(['ui-checkbox', classes]);

	if (hidden) return null;
	return (
		<div className={classNames}>
			<input type='checkbox' />;
		</div>
	);
};

export default UICheckbox;
