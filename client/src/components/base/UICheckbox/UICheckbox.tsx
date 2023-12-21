import UICheckboxType from './UICheckbox.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import './UICheckbox.scss';

const UICheckbox = ({
	value,
	isDisabled,
	isChecked,
	onChange,
	classes,
	hidden,
}: UICheckboxType) => {
	const classNames = appendClasses(['uiCheckbox', classes]);

	if (hidden) return null;
	return (
		<input
			type='checkbox'
			className={classNames}
			checked={isChecked}
			value={value}
			disabled={isDisabled}
			onChange={({ target }) => onChange?.(target.checked)}
		/>
	);
};

export default UICheckbox;