import { generateRandomElementId } from '@/misc/helpers/helpers';
import UICheckboxProps from './UICheckbox.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import UILabel from '../UILabel/UILabel';
import './UICheckbox.scss';

const UICheckbox = ({
	value,
	isDisabled,
	isChecked,
	label,
	id,
	onChange,
	classes,
	hidden,
}: UICheckboxProps) => {
	const classNames = appendClasses(['uiCheckbox', classes]);

	const elId = id || generateRandomElementId();

	if (hidden) return null;
	return (
		<div className={classNames}>
			<input
				id={elId}
				type='checkbox'
				checked={isChecked}
				value={value}
				disabled={isDisabled}
				onChange={({ target }) => onChange?.(target.checked)}
			/>
			{label && <UILabel label={label} htmlFor={elId} />}
		</div>
	);
};

export default UICheckbox;
