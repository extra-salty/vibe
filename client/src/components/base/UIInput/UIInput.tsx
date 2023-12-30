import { ChangeEvent, memo } from 'react';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import UIInputProps from './UIInput.type';
import './UIInput.scss';

const UIInput = ({
	type = 'text',
	value,
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

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	if (hidden) return null;
	return (
		<div className={classNames}>
			<label></label>
			<input
				type={type}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				readOnly={readonly}
				minLength={minLength}
				maxLength={maxLength}
				onChange={onChangeHandler}
			/>
		</div>
	);
};

export default memo(UIInput);
