import { ChangeEvent, useCallback } from 'react';
import appendClasses from '@/helpers/appendClasses/appendClasses';
import UIInputType from './UIInput.type';
import './UIInput.scss';

const UIInput = ({
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
}: UIInputType) => {
	const classNames = appendClasses(['uiInput', classes]);

	const onChangeHandler = useCallback(
		({ target }: ChangeEvent<HTMLInputElement>) => {
			onChange?.(target.value);
		},
		[onChange],
	);

	if (hidden) return null;
	return (
		<div className={classNames}>
			{label && <label>{label}:</label>}
			<input
				type='text'
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

export default UIInput;
