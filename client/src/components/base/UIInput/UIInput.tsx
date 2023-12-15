import { ChangeEvent, memo } from 'react';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import UIInputProps from './UIInput.type';
import './UIInput.scss';

const UIInput = ({
	type = 'text',
	value,
	label,
	readonly,
	disabled,
	placeholder = '',
	minLength,
	maxLength,
	onChange,
	classes,
	hidden,
}: UIInputProps) => {
	const classNames = appendClasses(['uiInput', classes]);

	const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
		onChange?.(target.value);
	};

	if (hidden) return null;
	return (
		<input
			className={classNames}
			type={type}
			value={value}
			placeholder={placeholder}
			disabled={disabled}
			readOnly={readonly}
			minLength={minLength}
			maxLength={maxLength}
			onChange={onChangeHandler}
		/>
	);
};

export default memo(UIInput);
